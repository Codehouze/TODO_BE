require("dotenv").config();

import User from "./database/entity/User";
import Todo from "./database/entity/Todo";

const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;

export default {
  type: "postgres",
  host: DB_HOST,
  port: 5438,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_USERNAME,
  synchronize: true,
  entities: [User, Todo],
};
