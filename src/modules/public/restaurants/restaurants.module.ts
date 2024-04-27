import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { Restaurants } from './restaurants';
import { RestaurantEntity } from './entities/restaurant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantEntity])],
  controllers: [RestaurantsController],
  providers: [Restaurants],
  exports: [Restaurants],
})
export class RestaurantsModule {}
