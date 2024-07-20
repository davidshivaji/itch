import v1Router from "@/routes/api/v1";
import { Router } from "express";

const apiRouter = Router();

apiRouter.use("/v1", v1Router);

export default apiRouter;
