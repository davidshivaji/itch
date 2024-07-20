import { Request, Response, Router } from "express";

const router = Router();

router.get("/api/health-check", (req: Request, res: Response) => {
  res.status(200).send("Alive!");
});

export default router;
