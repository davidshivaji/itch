import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const dbConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + "/entity/*.ts"],
  synchronize: true,
};

export default dbConfig;
