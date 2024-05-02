import { JwtService } from '@/modules/jwt/jwt.service';
import { MailerService } from '@/modules/mailer/mailer.service';
import { Module } from '@nestjs/common';
import { RestaurantEntity } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantEntity])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, MailerService, JwtService],
  exports: [RestaurantsService],
})
export class RestaurantsModule {}
