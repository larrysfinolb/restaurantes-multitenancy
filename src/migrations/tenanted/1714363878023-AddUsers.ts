import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class AddUsers1714363878023 implements MigrationInterface {
  name = 'AddUsers1714363878023';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const { schema } = queryRunner.connection
      .options as PostgresConnectionOptions;

    await queryRunner.query(
      `CREATE TABLE "${schema}"."users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "auto_increment" SERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_${schema}_b93a502e2adab819ba4493eeb11" UNIQUE ("auto_increment"), CONSTRAINT "UQ_${schema}_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_${schema}_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const { schema } = queryRunner.connection
      .options as PostgresConnectionOptions;

    await queryRunner.query(`DROP TABLE "${schema}"."users"`);
  }
}
