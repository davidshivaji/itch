import userRoutes from "@/routes/api/v1/user";
import { Router } from "express";

const v1Router = Router();

// v1Router.use("token", tokenRoutes)
v1Router.use("user", userRoutes);

export default v1Router;
