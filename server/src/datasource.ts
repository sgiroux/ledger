import { DataSource } from 'typeorm';
import type { DataSourceOptions } from 'typeorm';

const database = process.env.CONFIG_DIRECTORY
  ? `${process.env.CONFIG_DIRECTORY}/db/db.sqlite3`
  : 'config/db/db.sqlite3';

const devConfig: DataSourceOptions = {
  type: 'better-sqlite3',
  database: database,
  synchronize: true,
  migrationsRun: false,
  logging: false,
  entities: ['./src/**/*.entity.ts'],
  migrations: ['./dist/data/migration/*.ts'],
};

const devConfigNest: DataSourceOptions = {
  type: 'better-sqlite3',
  database: database,
  synchronize: true,
  migrationsRun: false,
  logging: false,
  entities: ['./dist/**/*.entity.js'],
  migrations: ['./dist/data/migration/*.js'],
};

const prodConfigNest: DataSourceOptions = {
  type: 'better-sqlite3',
  database: database,
  synchronize: false,
  migrationsRun: true,
  logging: false,
  entities: ['./dist/**/*.entity.js'],
  migrations: ['./dist/data/migration/**/*.js'],
};

export const getNestDataSource = () => {
  return new DataSource(
    process.env.NODE_ENV !== 'production' ? devConfigNest : prodConfigNest,
  );
};

const dataSource = new DataSource(devConfig);

export default dataSource;
