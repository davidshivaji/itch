import apiRouter from "@/routes/api";
import { Request, Response, Router } from "express";

const router = Router();

router.use("/api", apiRouter);

router.get("/api/health-check", (req: Request, res: Response) => {
  res.status(200).send("Alive!");
});

export default router;
