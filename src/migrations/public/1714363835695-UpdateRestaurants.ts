import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRestaurants1714363835695 implements MigrationInterface {
  name = 'UpdateRestaurants1714363835695';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "restaurants" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "restaurants" ADD "country" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurants" ADD "confirmed" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurants" DROP COLUMN "confirmed"`,
    );
    await queryRunner.query(`ALTER TABLE "restaurants" DROP COLUMN "country"`);
    await queryRunner.query(
      `ALTER TABLE "restaurants" ADD "password" character varying NOT NULL`,
    );
  }
}
