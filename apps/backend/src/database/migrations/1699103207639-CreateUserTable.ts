import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1699103207639 implements MigrationInterface {
  name = 'CreateUserTable1699103207639';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_f0eace201126c1c8be2ae32fd22" PRIMARY KEY ("ID"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
