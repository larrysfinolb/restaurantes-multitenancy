import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { RestaurantEntity } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';
import { getDataSource } from '@/modules/tenancy/tenancy.utils';

@Injectable()
export class Restaurants {
  constructor(
    @InjectRepository(RestaurantEntity)
    private readonly restaurantRepository: Repository<RestaurantEntity>,
  ) {}

  async findAll() {
    return this.restaurantRepository.find();
  }

  async findOne(options: FindOneOptions<RestaurantEntity>) {
    return this.restaurantRepository.findOne(options);
  }

  async create(createRestaurantDto: CreateRestaurantDto) {
    const restaurant = this.restaurantRepository.create(createRestaurantDto);
    await this.restaurantRepository.save(restaurant);

    const schemaName = `restaurant_${restaurant.id}`;
    await this.restaurantRepository.query(
      `CREATE SCHEMA IF NOT EXISTS "${schemaName}"`,
    );

    const dataSource = await getDataSource(restaurant.id);
    await dataSource.runMigrations();
    await dataSource.destroy();

    return restaurant;
  }
}
