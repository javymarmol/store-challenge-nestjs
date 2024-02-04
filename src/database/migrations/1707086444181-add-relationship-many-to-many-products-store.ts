import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationshipManyToManyProductsStore1707086444181 implements MigrationInterface {
  name = 'AddRelationshipManyToManyProductsStore1707086444181';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products_stores" ("product_id" integer NOT NULL, "store_id" integer NOT NULL, CONSTRAINT "PK_7b1846120ab6ed53d711215e08a" PRIMARY KEY ("product_id", "store_id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_e413e2e91f1ed18a4e67198efd" ON "products_stores" ("product_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_3055a44d9f1c29ef21733e7334" ON "products_stores" ("store_id") `);
    await queryRunner.query(
      `ALTER TABLE "products_stores" ADD CONSTRAINT "FK_e413e2e91f1ed18a4e67198efd0" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "products_stores" ADD CONSTRAINT "FK_3055a44d9f1c29ef21733e73341" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products_stores" DROP CONSTRAINT "FK_3055a44d9f1c29ef21733e73341"`);
    await queryRunner.query(`ALTER TABLE "products_stores" DROP CONSTRAINT "FK_e413e2e91f1ed18a4e67198efd0"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_3055a44d9f1c29ef21733e7334"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_e413e2e91f1ed18a4e67198efd"`);
    await queryRunner.query(`DROP TABLE "products_stores"`);
  }
}
