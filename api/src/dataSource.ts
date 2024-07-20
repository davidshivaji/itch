import dbConfig from "@/dbConfig";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource(dbConfig);

export const initializeDataSource = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
  }
};
