import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "@/controllers/userController";
import { TryCatchMiddleware } from "@/middleware/TryCatchMiddleware";
import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/", TryCatchMiddleware(getUsers));
userRoutes.get("/:id", TryCatchMiddleware(getUser));
userRoutes.post("/", TryCatchMiddleware(createUser));
userRoutes.put("/:id", TryCatchMiddleware(updateUser));
userRoutes.delete("/:id", TryCatchMiddleware(deleteUser));

export default userRoutes;
