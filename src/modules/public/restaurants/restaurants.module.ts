import { JwtService } from '@/modules/jwt/jwt.service';
import { MailerService } from '@/modules/mailer/mailer.service';
import { Module } from '@nestjs/common';
import { RestaurantEntity } from './entities/restaurant.entity';
import { Restaurants } from './restaurants';
import { RestaurantsController } from './restaurants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantEntity])],
  controllers: [RestaurantsController],
  providers: [Restaurants, MailerService, JwtService],
  exports: [Restaurants],
})
export class RestaurantsModule {}
