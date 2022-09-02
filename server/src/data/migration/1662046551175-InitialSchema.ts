import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1662046551175 implements MigrationInterface {
  name = 'InitialSchema1662046551175';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rule" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "field" varchar CHECK( "field" IN ('name','transactionId','paymentChannel') ) NOT NULL, "operation" varchar CHECK( "operation" IN ('contains','equals') ) NOT NULL, "criteria" varchar NOT NULL, "isEnabled" boolean NOT NULL, "userId" integer NOT NULL, CONSTRAINT "UQ_1f73188910dd7bff16f176864cc" UNIQUE ("name", "userId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "plaid_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "itemId" varchar NOT NULL, "updateType" varchar NOT NULL, "accessToken" varchar NOT NULL, "transactionSyncCursor" varchar, "userId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "plaid_transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "amount" integer NOT NULL, "isoCurrencyCode" text, "transactionId" varchar NOT NULL, "date" varchar NOT NULL, "datetime" text, "pending" boolean NOT NULL, "paymentChannel" varchar NOT NULL, "categoryId" text, "category" text, "merchantName" text, "plaidAccountId" integer NOT NULL, CONSTRAINT "UQ_a5afd7ed963ae0bf46ced882417" UNIQUE ("transactionId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "plaid_account" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "accountId" varchar NOT NULL, "mask" text, "name" varchar NOT NULL, "officialName" text, "subtype" text, "type" varchar NOT NULL, "plaidItemId" integer NOT NULL, CONSTRAINT "UQ_41aaf07408e0af33b338cc76765" UNIQUE ("accountId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_rule" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "field" varchar CHECK( "field" IN ('name','transactionId','paymentChannel') ) NOT NULL, "operation" varchar CHECK( "operation" IN ('contains','equals') ) NOT NULL, "criteria" varchar NOT NULL, "isEnabled" boolean NOT NULL, "userId" integer NOT NULL, CONSTRAINT "UQ_1f73188910dd7bff16f176864cc" UNIQUE ("name", "userId"), CONSTRAINT "FK_865c6ac4d72b3976004f5e19f9b" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_rule"("id", "name", "field", "operation", "criteria", "isEnabled", "userId") SELECT "id", "name", "field", "operation", "criteria", "isEnabled", "userId" FROM "rule"`,
    );
    await queryRunner.query(`DROP TABLE "rule"`);
    await queryRunner.query(`ALTER TABLE "temporary_rule" RENAME TO "rule"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_plaid_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "itemId" varchar NOT NULL, "updateType" varchar NOT NULL, "accessToken" varchar NOT NULL, "transactionSyncCursor" varchar, "userId" integer NOT NULL, CONSTRAINT "FK_627fd79db2ac5e145672b3e1449" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_plaid_item"("id", "itemId", "updateType", "accessToken", "transactionSyncCursor", "userId") SELECT "id", "itemId", "updateType", "accessToken", "transactionSyncCursor", "userId" FROM "plaid_item"`,
    );
    await queryRunner.query(`DROP TABLE "plaid_item"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_plaid_item" RENAME TO "plaid_item"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_plaid_transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "amount" integer NOT NULL, "isoCurrencyCode" text, "transactionId" varchar NOT NULL, "date" varchar NOT NULL, "datetime" text, "pending" boolean NOT NULL, "paymentChannel" varchar NOT NULL, "categoryId" text, "category" text, "merchantName" text, "plaidAccountId" integer NOT NULL, CONSTRAINT "UQ_a5afd7ed963ae0bf46ced882417" UNIQUE ("transactionId"), CONSTRAINT "FK_c66edc4fe1523b334eb5a513c11" FOREIGN KEY ("plaidAccountId") REFERENCES "plaid_account" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_plaid_transaction"("id", "name", "amount", "isoCurrencyCode", "transactionId", "date", "datetime", "pending", "paymentChannel", "categoryId", "category", "merchantName", "plaidAccountId") SELECT "id", "name", "amount", "isoCurrencyCode", "transactionId", "date", "datetime", "pending", "paymentChannel", "categoryId", "category", "merchantName", "plaidAccountId" FROM "plaid_transaction"`,
    );
    await queryRunner.query(`DROP TABLE "plaid_transaction"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_plaid_transaction" RENAME TO "plaid_transaction"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_plaid_account" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "accountId" varchar NOT NULL, "mask" text, "name" varchar NOT NULL, "officialName" text, "subtype" text, "type" varchar NOT NULL, "plaidItemId" integer NOT NULL, CONSTRAINT "UQ_41aaf07408e0af33b338cc76765" UNIQUE ("accountId"), CONSTRAINT "FK_1aa2cc89cff74b7960e3c5d8b6a" FOREIGN KEY ("plaidItemId") REFERENCES "plaid_item" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_plaid_account"("id", "accountId", "mask", "name", "officialName", "subtype", "type", "plaidItemId") SELECT "id", "accountId", "mask", "name", "officialName", "subtype", "type", "plaidItemId" FROM "plaid_account"`,
    );
    await queryRunner.query(`DROP TABLE "plaid_account"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_plaid_account" RENAME TO "plaid_account"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "plaid_account" RENAME TO "temporary_plaid_account"`,
    );
    await queryRunner.query(
      `CREATE TABLE "plaid_account" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "accountId" varchar NOT NULL, "mask" text, "name" varchar NOT NULL, "officialName" text, "subtype" text, "type" varchar NOT NULL, "plaidItemId" integer NOT NULL, CONSTRAINT "UQ_41aaf07408e0af33b338cc76765" UNIQUE ("accountId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "plaid_account"("id", "accountId", "mask", "name", "officialName", "subtype", "type", "plaidItemId") SELECT "id", "accountId", "mask", "name", "officialName", "subtype", "type", "plaidItemId" FROM "temporary_plaid_account"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_plaid_account"`);
    await queryRunner.query(
      `ALTER TABLE "plaid_transaction" RENAME TO "temporary_plaid_transaction"`,
    );
    await queryRunner.query(
      `CREATE TABLE "plaid_transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "amount" integer NOT NULL, "isoCurrencyCode" text, "transactionId" varchar NOT NULL, "date" varchar NOT NULL, "datetime" text, "pending" boolean NOT NULL, "paymentChannel" varchar NOT NULL, "categoryId" text, "category" text, "merchantName" text, "plaidAccountId" integer NOT NULL, CONSTRAINT "UQ_a5afd7ed963ae0bf46ced882417" UNIQUE ("transactionId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "plaid_transaction"("id", "name", "amount", "isoCurrencyCode", "transactionId", "date", "datetime", "pending", "paymentChannel", "categoryId", "category", "merchantName", "plaidAccountId") SELECT "id", "name", "amount", "isoCurrencyCode", "transactionId", "date", "datetime", "pending", "paymentChannel", "categoryId", "category", "merchantName", "plaidAccountId" FROM "temporary_plaid_transaction"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_plaid_transaction"`);
    await queryRunner.query(
      `ALTER TABLE "plaid_item" RENAME TO "temporary_plaid_item"`,
    );
    await queryRunner.query(
      `CREATE TABLE "plaid_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "itemId" varchar NOT NULL, "updateType" varchar NOT NULL, "accessToken" varchar NOT NULL, "transactionSyncCursor" varchar, "userId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "plaid_item"("id", "itemId", "updateType", "accessToken", "transactionSyncCursor", "userId") SELECT "id", "itemId", "updateType", "accessToken", "transactionSyncCursor", "userId" FROM "temporary_plaid_item"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_plaid_item"`);
    await queryRunner.query(`ALTER TABLE "rule" RENAME TO "temporary_rule"`);
    await queryRunner.query(
      `CREATE TABLE "rule" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "field" varchar CHECK( "field" IN ('name','transactionId','paymentChannel') ) NOT NULL, "operation" varchar CHECK( "operation" IN ('contains','equals') ) NOT NULL, "criteria" varchar NOT NULL, "isEnabled" boolean NOT NULL, "userId" integer NOT NULL, CONSTRAINT "UQ_1f73188910dd7bff16f176864cc" UNIQUE ("name", "userId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "rule"("id", "name", "field", "operation", "criteria", "isEnabled", "userId") SELECT "id", "name", "field", "operation", "criteria", "isEnabled", "userId" FROM "temporary_rule"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_rule"`);
    await queryRunner.query(`DROP TABLE "plaid_account"`);
    await queryRunner.query(`DROP TABLE "plaid_transaction"`);
    await queryRunner.query(`DROP TABLE "plaid_item"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "rule"`);
  }
}
