import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameAutoIncrementColumn1714244948627
  implements MigrationInterface
{
  name = 'RenameAutoIncrementColumn1714244948627';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurants" RENAME COLUMN "code" TO "auto_increment"`,
    );
    await queryRunner.query(
      `ALTER SEQUENCE "restaurants_code_seq" RENAME TO "restaurants_auto_increment_seq"`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurants" RENAME CONSTRAINT "UQ_7d88c646d0b073a0f291e9ab34c" TO "UQ_142d6597176fdea9c95d348e348"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurants" RENAME CONSTRAINT "UQ_142d6597176fdea9c95d348e348" TO "UQ_7d88c646d0b073a0f291e9ab34c"`,
    );
    await queryRunner.query(
      `ALTER SEQUENCE "restaurants_auto_increment_seq" RENAME TO "restaurants_code_seq"`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurants" RENAME COLUMN "auto_increment" TO "code"`,
    );
  }
}
