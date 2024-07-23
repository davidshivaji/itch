import "reflect-metadata"; // leave at top of file
import { initializeDataSource } from "@/dataSource";
import { fetchParameters } from "@/fetchParameters";
import { errorHandlerMiddleware } from "@/middleware/ErrorHandlerMiddleware";
import routes from "@/routes";
import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-provider-ini";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import "module-alias/register";

// load environment variables from .env file for local development
dotenv.config();

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);

console.log("AWS_PROFILE:", process.env.AWS_PROFILE);
console.log("AWS_REGION:", process.env.AWS_REGION);

async function getConfig(): Promise<S3ClientConfig> {
  const credentials = await fromIni({ profile: "itchdev" })();
  const region = "ap-southeast-2";

  console.log("Resolved Credentials:", credentials);
  console.log("Resolved Region:", region);

  return {
    region,
    credentials,
  };
}

async function startServer() {
  try {
    console.log("calling getConfig");
    const s3ClientConfig = await getConfig();
    console.log("called getConfig", s3ClientConfig);
    const s3Client = new S3Client({
      region: s3ClientConfig.region,
      credentials: s3ClientConfig.credentials,
    });

    console.log("S3 Client Config:", s3Client.config);

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
