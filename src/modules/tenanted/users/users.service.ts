import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CONNECTION } from '@/modules/tenancy/tenancy.simbols';
import { CreateUserDto } from './dto/create-user.dto';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly usersRepository: Repository<UserEntity>;

  constructor(@Inject(CONNECTION) dataSource: DataSource) {
    this.usersRepository = dataSource.getRepository(UserEntity);
  }

  async create(createUserDto: CreateUserDto) {
    const formattedEmail = createUserDto.email.toLowerCase();
    const formattedUsername = createUserDto.username.toLowerCase();

    if (
      (await this.findOne({ where: { email: formattedEmail } })) != null ||
      (await this.findOne({ where: { username: formattedUsername } })) != null
    )
      throw new ConflictException('Email or username already exists');

    const user = this.usersRepository.create({
      ...createUserDto,
      email: formattedEmail,
      username: formattedUsername,
      password: await hash(createUserDto.password, 10),
    });

    return this.usersRepository.save(user);
  }

  async findOne(options: FindOneOptions<UserEntity>) {
    return this.usersRepository.findOne(options);
  }
}
