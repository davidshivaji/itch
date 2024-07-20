import * as userService from "@/services/userService";
import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await userService.getUser(parseInt(req.params.id, 10));
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  const newUser = await userService.createUser(username, password, email);
  res.status(201).json(newUser);
};

export const updateUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  const updatedUser = await userService.updateUser(
    parseInt(req.params.id, 10),
    username,
    password,
    email
  );
  res.json(updatedUser);
};

export const deleteUser = async (req: Request, res: Response) => {
  const result = await userService.deleteUser(parseInt(req.params.id, 10));
  res.json(result);
};
