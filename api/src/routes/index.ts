import { Router } from "express";
import apiRoutes from "./api";
const commonRouter = Router();

commonRouter.use("/api", apiRoutes);

commonRouter.get("/api/health-check", (req, res) => {
  res.status(200).send("Alive!");
});

export default commonRouter;
