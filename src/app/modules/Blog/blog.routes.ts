import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validationRequest";
import { BlogValidation } from "./blog.validation";
import { blogController } from "./blog.controller";

const router = express.Router();

router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getSingleBlog);
router.post(
  "/add-blog",
  auth(UserRole.ADMIN),
  blogController.addBlog
);

export const BlogRoutes = router;
