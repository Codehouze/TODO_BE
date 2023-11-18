import dotenv from "dotenv";
dotenv.config();

const { env } = process;
export default {
  DB_HOST: env.DB_HOST || "127.0.0.1",
  DB_PORT: Number(env.DB_PORT) || 5432,
  DB_NAME: env.DB_NAME,
  DB_USERNAME: env.DB_USERNAME,
  DB_PASSWORD: env.DB_PASSWORD,
  APP_SECRET: <string>env.APP_SECRET,
  APP_PORT:env.APP_PORT,

};
