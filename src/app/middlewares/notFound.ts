import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND!.",
    error: {
      path: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString(),
      message: "Not Found - The server can not find the requested resource.",
    },
  });
};

export default notFound;
