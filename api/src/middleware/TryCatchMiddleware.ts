import { NextFunction, Request, Response } from "express";

type MiddlewareFunction<T = Record<string, string>> = (
  req: Request<T>,
  res: Response,
  next: NextFunction
) => Promise<void>;

export function TryCatchMiddleware<T = Record<string, string>>(
  middlewareFn: MiddlewareFunction<T>
): MiddlewareFunction<T> {
  return async (
    req: Request<T>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await middlewareFn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
