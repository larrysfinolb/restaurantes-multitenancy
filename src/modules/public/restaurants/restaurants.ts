import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { RestaurantEntity } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { getDataSource } from '@/modules/tenancy/tenancy.utils';
import { MailerService } from '@/modules/mailer/mailer.service';
import { UserEntity } from '@/modules/tenanted/users/entities/user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class Restaurants {
  constructor(
    @InjectRepository(RestaurantEntity)
    private readonly restaurantRepository: Repository<RestaurantEntity>,
    private readonly mailerService: MailerService,
  ) {}

  async findAll() {
    return this.restaurantRepository.find();
  }

  async findOne(options: FindOneOptions<RestaurantEntity>) {
    return this.restaurantRepository.findOne(options);
  }

  async create(createRestaurantDto: CreateRestaurantDto) {
    const formattedSubdomain = createRestaurantDto.subdomain.toLowerCase();
    const formattedEmail = createRestaurantDto.email.toLowerCase();

    if (
      (await this.findOne({ where: { subdomain: formattedSubdomain } })) !=
        null ||
      (await this.findOne({ where: { email: formattedEmail } })) != null
    )
      throw new ConflictException('Subdomain or email already exists');

    const restaurant = this.restaurantRepository.create({
      ...createRestaurantDto,
      name: createRestaurantDto.restaurant,
      subdomain: formattedSubdomain,
      email: formattedEmail,
    });
    await this.restaurantRepository.save(restaurant);

    const schemaName = `restaurant_${restaurant.id}`;
    await this.restaurantRepository.query(
      `CREATE SCHEMA IF NOT EXISTS "${schemaName}"`,
    );

    const dataSource = await getDataSource(restaurant.id);
    await dataSource.runMigrations();

    // Mas adelante se encuentra una explicación de por qué no se puede usar el create de UsersService
    await this.createUser(createRestaurantDto, dataSource);

    await this.mailerService.sendWelcomeEmail({
      email: createRestaurantDto.email,
      name: createRestaurantDto.username,
      subdomain: createRestaurantDto.subdomain,
      restaurant: createRestaurantDto.restaurant,
    });

    await dataSource.destroy();

    return restaurant;
  }

  // Lo ideal seria encontrar la manera de usar el create de UsersService en este punto,
  // ya que el problema es que tiene que ser llamado desde una petición HTTP para que pueda
  // enviar el Origin y asi pasar por el Middleware de Tenancy que se encarga de cambiar
  // la conexión hacia el esquema correspondiente.
  // NO SOY EXPERTO EN MULTI-TENANCY, POR ESA RAZÓN NO SE COMO HACERLO
  // EN UN FUTURO PODRÍA BUSCARSE UNA SOLUCIÓN
  private async createUser(
    createUserDto: CreateRestaurantDto,
    dataSource: DataSource,
  ) {
    const usersRepository = dataSource.getRepository(UserEntity);

    const formattedEmail = createUserDto.email.toLowerCase();
    const formattedUsername = createUserDto.username.toLowerCase();

    if (
      (await usersRepository.findOne({ where: { email: formattedEmail } })) !=
        null ||
      (await usersRepository.findOne({
        where: { username: formattedUsername },
      })) != null
    )
      throw new ConflictException('Email or username already exists');

    const user = usersRepository.create({
      ...createUserDto,
      email: formattedEmail,
      username: formattedUsername,
      password: await hash(createUserDto.password, 10),
    });

    return usersRepository.save(user);
  }
}
