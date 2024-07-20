import CustomError from "@/exceptions/CustomError";
import { ErrorResponse } from "@/types/ErrorResponse";
import { NextFunction, Request, Response } from "express";

export const errorHandlerMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let response: ErrorResponse;

  if (error instanceof CustomError) {
    response = {
      status: "error",
      statusCode: error.statusCode,
      message: error.message,
      errors: error.errors,
    };
  } else if (error instanceof Error) {
    response = {
      status: "error",
      statusCode: 500,
      message: "Internal Server Error",
      errors: [error.message],
    };
  } else {
    response = {
      status: "error",
      statusCode: 500,
      message: "Unknown error occurred",
    };
  }

  res.status(response.statusCode).json(response);
};
