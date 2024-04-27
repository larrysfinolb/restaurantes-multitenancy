import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { tenantsOrmConfigObject } from 'src/tenants-orm.config';

export async function getDataSource(restaurantId: string) {
  const connectionName = `restaurant_${restaurantId}`;
  const dataSource = new DataSource({
    ...(tenantsOrmConfigObject as PostgresConnectionOptions),
    name: connectionName,
    schema: connectionName,
  });

  if (dataSource.isInitialized) return dataSource;

  await dataSource.initialize();
  return dataSource;
}
