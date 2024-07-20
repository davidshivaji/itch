import { initializeDataSource } from "@/dataSource";
import { fetchParameters } from "@/fetchParameters";
import { errorHandlerMiddleware } from "@/middleware/ErrorHandlerMiddleware";
import routes from "@/routes";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import "module-alias/register";

// load environment variables from .env file for local development
dotenv.config();

async function startServer() {
  try {
    await fetchParameters();

    await initializeDataSource();

    const app: Express = express();
    const CORS_WHITELIST = process.env.CORS_WHITELIST || "";

    app.use(
      cors({
        origin: CORS_WHITELIST.split(" "),
        credentials: true,
      })
    );

    app.use(
      express.urlencoded({
        extended: true,
        limit: "20mb",
      })
    );
    app.use(
      express.json({
        limit: "20mb",
      })
    );

    app.use(routes);
    app.use(errorHandlerMiddleware);

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    });
  } catch (error: any) {
    console.error("Error starting the server:", error);
  }
}

startServer();
