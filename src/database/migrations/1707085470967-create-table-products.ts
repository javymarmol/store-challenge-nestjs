import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProducts1707085470967 implements MigrationInterface {
  name = 'CreateTableProducts1707085470967';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "price" numeric NOT NULL, "type" character varying(20) NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
