import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import handleZodError from "../error/handleZodError";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message = "Something went wrong!";
  let errorDetails = error;
  if (error instanceof ZodError) {
    const formattedZodError: any = handleZodError(error);
    message = formattedZodError?.message;
    errorDetails = formattedZodError?.errorDetails;
  } else {
    message = error.message;
    errorDetails;
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: message,
    errorDetails,
    //error: error,
  });
};

export default globalErrorHandler;
