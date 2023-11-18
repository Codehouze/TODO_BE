require("dotenv").config();
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

import User from "../entity/User";
import Todo from "../entity/Todo";
const DB_CONFIG: DataSourceOptions = {
  type: "postgres",
  host: DB_HOST,
  port: undefined,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  ssl: true,
  // seeds: [__dirname + "./seeds/*.seed{.ts,.js}"],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  entities: [User, Todo],
  migrations: [__dirname + "./migrations/*{.js,.ts}"],
};

export const DB = new DataSource(DB_CONFIG);

let dataSource: DataSource;
export const ConnectDb = async () => {
  dataSource = await DB.initialize();
};

export default ConnectDb;