import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserAddSalt1699322060161 implements MigrationInterface {
  name = 'UpdateUserAddSalt1699322060161';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "salt" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "salt"`);
  }
}
