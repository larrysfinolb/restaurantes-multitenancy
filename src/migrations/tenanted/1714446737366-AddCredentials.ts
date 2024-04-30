import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class AddCredentials1714446737366 implements MigrationInterface {
  name = 'AddCredentials1714446737366';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const { schema } = queryRunner.connection
      .options as PostgresConnectionOptions;

    await queryRunner.query(
      `ALTER TABLE "${schema}"."users" ADD "credential_version" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "${schema}"."users" ADD "credential_last_password" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const { schema } = queryRunner.connection
      .options as PostgresConnectionOptions;

    await queryRunner.query(
      `ALTER TABLE "${schema}"."users" DROP COLUMN "credential_last_password"`,
    );
    await queryRunner.query(
      `ALTER TABLE "${schema}"."users" DROP COLUMN "credential_version"`,
    );
  }
}
