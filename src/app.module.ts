import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ormConfigObject } from './orm.config';
import { RestaurantsModule } from './modules/public/restaurants/restaurants.module';
import { TenancyMiddleware } from './modules/tenancy/tenancy.middleware';
import { TenancyModule } from './modules/tenancy/tenancy.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot(ormConfigObject),
    RestaurantsModule,
    TenancyModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenancyMiddleware).forRoutes('*');
  }
}
