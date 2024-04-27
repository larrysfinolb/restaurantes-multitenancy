import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { getDataSource } from './modules/tenancy/tenancy.utils';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function runRestaurantMigrations(schemas) {
  const migrationPromises = schemas
    .filter(({ name }) => name.startsWith('restaurant_'))
    .map(async ({ name }) => {
      const restaurantId = name.replace('restaurant_', '');
      const dataSource = await getDataSource(restaurantId);
      await dataSource.runMigrations();
      await dataSource.destroy();
    });

  await Promise.all(migrationPromises);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);
  const configService = app.get(ConfigService);

  await dataSource.runMigrations();

  const schemas = await dataSource.query(
    `SELECT schema_name AS name FROM information_schema.schemata`,
  );
  await runRestaurantMigrations(schemas);

  const config = new DocumentBuilder()
    .setTitle('Restaurants')
    .setDescription('The API Restaurants')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get('port'));
}
bootstrap();
