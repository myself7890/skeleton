import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePasswordLinkTable1699379822027
  implements MigrationInterface
{
  name = 'CreatePasswordLinkTable1699379822027';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "password_link" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "userID" uuid, CONSTRAINT "REL_4ce2c375a0c948532cb0d97854" UNIQUE ("userID"), CONSTRAINT "PK_5be22eed615f742ef4074b3f1f8" PRIMARY KEY ("ID"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "password_link" ADD CONSTRAINT "FK_4ce2c375a0c948532cb0d978543" FOREIGN KEY ("userID") REFERENCES "user"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "password_link" DROP CONSTRAINT "FK_4ce2c375a0c948532cb0d978543"`,
    );
    await queryRunner.query(`DROP TABLE "password_link"`);
  }
}
