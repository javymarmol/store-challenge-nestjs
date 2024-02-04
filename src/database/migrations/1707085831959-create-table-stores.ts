import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableStores1707085831959 implements MigrationInterface {
  name = 'CreateTableStores1707085831959';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "stores" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "city" character(3) NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_7aa6e7d71fa7acdd7ca43d7c9cb" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "stores"`);
  }
}
