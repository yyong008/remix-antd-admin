import { Context, Hono } from "hono";
import prisma from "~/libs/prisma";

export const profileLinkCategoryRouter = new Hono();

// category
profileLinkCategoryRouter.get("/", async (c: Context) => {
  try {
    const userId = c.get("userId");
    const queries = c.req.queries();
    const page = Number(queries.page ?? 1);
    const pageSize = Number(queries.pageSize ?? 10);
    const categories = await prisma.linkCategory.findMany({
      where: {
        userId,
      },
      skip: pageSize * (page - 1),
      take: pageSize,
    });
    const total = await prisma.linkCategory.count({
      where: {
        userId,
      },
    });
    return c.json({
      code: 0,
      message: "success",
      data: {
        list: categories,
        total: total,
      },
    });
  } catch (error) {
    return c.json({
      code: 1,
      message: (error as Error).message,
      data: {},
    });
  }
});

profileLinkCategoryRouter.get("/user/all", async (c: Context) => {
  try {
    const userId = c.get("userId");
    const categories = await prisma.linkCategory.findMany({
      where: {
        userId,
      },
    });
    const total = await prisma.linkCategory.count({
      where: {
        userId,
      },
    });
    return c.json({
      code: 0,
      message: "success",
      data: {
        list: categories,
        total: total,
      },
    });
  } catch (error) {
    return c.json({
      code: 1,
      message: (error as Error).message,
      data: {},
    });
  }
});


profileLinkCategoryRouter.post("/", async (c: Context) => {
  try {
    const dto = await c.req.json();
    const userId = await c.get("userId");
    const result = await prisma.linkCategory.create({
      data: {
        ...dto,
        userId,
      },
    });

    return c.json({
      code: 0,
      message: "success",
      data: result,
    });
  } catch (error) {
    return c.json({
      code: 1,
      message: (error as Error).message,
      data: {},
    });
  }
});
profileLinkCategoryRouter.put("/:id", async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    const dto = await c.req.json();
    const userId = await c.get("userId");
    const result = await prisma.linkCategory.update({
      where: {
        id,
        userId,
      },
      data: {
        ...dto,
        userId,
      },
    });
    return c.json({
      data: result,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      code: 1,
      message: (error as Error).message,
      data: {},
    });
  }
});
profileLinkCategoryRouter.delete("/", async (c: Context) => {
  try {
    const {ids} = await c.req.json();
    const userId = c.get("userId");
    const result = await prisma.linkCategory.deleteMany({
      where: {
        id: {
          in: ids,
        },
        userId,
      },
    });
    return c.json({
      code: 0,
      message: "success",
      data: result,
    });
  } catch (error) {
    return c.json({
      code: 1,
      message: (error as Error).message,
      data: {},
    });
  }
});
