import { DataSource } from 'typeorm';
import { getDataSource } from '@/modules/tenancy/tenancy.utils';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { tenantsOrmConfigObject } from 'src/tenants-orm.config';

export async function revertMigrations() {
  try {
    const dataSource = new DataSource(
      tenantsOrmConfigObject as PostgresConnectionOptions,
    );
    if (!dataSource.isInitialized) await dataSource.initialize();

    const schemas: { schema_name: string }[] = await dataSource.query(
      `SELECT schema_name FROM information_schema.schemata WHERE schema_name LIKE 'restaurant_%'`,
    );
    await dataSource.destroy();

    await Promise.all(
      schemas.map(async ({ schema_name }) => {
        const id = schema_name.split('_')[1];
        const connection = await getDataSource(id);
        await connection.undoLastMigration();
        await connection.destroy();
      }),
    );

    console.log('All migrations reverted');
  } catch (error) {
    console.error('Error reverting migrations:', error);
  }
}

revertMigrations();
