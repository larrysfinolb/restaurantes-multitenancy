import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ormConfigObject } from './orm.config';
import { RestaurantsModule } from './modules/public/restaurants/restaurants.module';
import { TenancyMiddleware } from './modules/tenancy/tenancy.middleware';
import { TenancyModule } from './modules/tenancy/tenancy.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/tenanted/users/users.module';
import { JwtModule } from './modules/jwt/jwt.module';
import { MailerModule } from './modules/mailer/mailer.module';
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
    UsersModule,
    JwtModule,
    MailerModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenancyMiddleware).forRoutes('*');
  }
}
