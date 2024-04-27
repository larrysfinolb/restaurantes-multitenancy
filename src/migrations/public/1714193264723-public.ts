import { MigrationInterface, QueryRunner } from 'typeorm';

export class Public1714193264723 implements MigrationInterface {
  name = 'Public1714193264723';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "restaurants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" SERIAL NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "subdomain" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_7d88c646d0b073a0f291e9ab34c" UNIQUE ("code"), CONSTRAINT "UQ_2be82f48bd82012eb0cc07af5d7" UNIQUE ("subdomain"), CONSTRAINT "UQ_c356f465f786a3ae9ff48ab18ef" UNIQUE ("email"), CONSTRAINT "PK_e2133a72eb1cc8f588f7b503e68" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "restaurants"`);
  }
}
