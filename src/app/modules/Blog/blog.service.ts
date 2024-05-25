import prisma from "../../shared/prisma";

const addBlog = async (payload: any, user: any) => {
  const data = {
    ...payload,
    userId: user.id,
  };
  const result = await prisma.blogs.create({
    data: data,
  });

  return result;
};

const getAllBlogs = async () => {
  const result = await prisma.blogs.findMany({
    select: {
      createdAt: true,
      description: true,
      id: true,
      image: true,
      title: true,
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  return result;
};

const getSingleBlog = async (id: string) => {
  const result = await prisma.blogs.findFirstOrThrow({
    where: {
      id: id,
    },
    select: {
      createdAt: true,
      description: true,
      id: true,
      image: true,
      title: true,
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  return result;
};

export const blogServices = {
  addBlog,
  getAllBlogs,
  getSingleBlog,
};
