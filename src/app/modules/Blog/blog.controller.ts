import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { blogServices } from "./blog.service";
import httpStatus from "http-status";

const addBlog = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await blogServices.addBlog(req.body, user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog added successfully",
      data: result,
    });
  }
);
const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.getAllBlogs();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Blogs get successfully",
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await blogServices.getSingleBlog(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog get successfully",
    data: result,
  });
});

export const blogController = {
  addBlog,
  getAllBlogs,
  getSingleBlog,
};
