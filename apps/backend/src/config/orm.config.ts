import { DataSource, DataSourceOptions } from 'typeorm';

export const configOrm: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [`${__dirname}/../**/*.entity.{ts,js}`],
  dropSchema: false,
  migrationsRun: false,
  migrations: [`${__dirname}/../database/migrations/*{.ts,.js}`],
};

export default new DataSource(configOrm);
