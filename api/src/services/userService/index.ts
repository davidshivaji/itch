import { AppDataSource } from "@/dataSource";
import { User } from "@/entities/user";
import CustomError from "@/exceptions/CustomError";

const userRepository = AppDataSource.getRepository(User);

export const getUsers = async () => {
  return await userRepository.find();
};

export const getUser = async (id: number) => {
  const user = await userRepository.findOneBy({ id });
  if (!user) {
    throw new CustomError(404, "User not found");
  }
  return user;
};

export const createUser = async (
  username: string,
  password: string,
  email: string
) => {
  const existingUser = await userRepository.findOneBy({ username });
  if (existingUser) {
    throw new CustomError(400, "Username already exists");
  }
  const user = userRepository.create({ username, password, email });
  return await userRepository.save(user);
};

export const updateUser = async (
  id: number,
  username: string,
  password: string,
  email: string
) => {
  const user = await userRepository.findOneBy({ id });
  if (!user) {
    throw new CustomError(404, "User not found");
  }
  user.username = username;
  user.password = password;
  user.email = email;
  return await userRepository.save(user);
};

export const deleteUser = async (id: number) => {
  const result = await userRepository.delete(id);
  if (result.affected === 0) {
    throw new CustomError(404, "User not found");
  }
  return { message: "User deleted successfully" };
};
