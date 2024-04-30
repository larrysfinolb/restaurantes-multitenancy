import { DataSource } from 'typeorm';
import { join } from 'node:path';
import { ormConfigObject } from './orm.config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const tenantsOrmConfigObject: TypeOrmModuleOptions = {
  ...ormConfigObject,
  entities: [join(__dirname, './modules/tenanted/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './migrations/tenanted/*{.ts,.js}')],
};

export default new DataSource({
  ...tenantsOrmConfigObject,
  name: 'restaurant_template',
  schema: 'restaurant_template',
} as PostgresConnectionOptions);
