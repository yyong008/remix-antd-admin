import { Context, Hono } from "hono";
import { profileAccountDAL } from "~/dals/profile/ProfileAccountDAL";
import prisma from "~/libs/prisma";

export const profileLinkRouter = new Hono();

// link
profileLinkRouter.get("/", async (c: Context) => {
  try {
    const userId = c.get("userId");
    
    let categoryId = undefined;
    if(c.req.query("categoryId")) {
      categoryId = Number(c.req.query("categoryId"));
    }
    const page = Number(c.req.query("page") ?? 1);
    const pageSize = Number(c.req.query("pageSize") ?? 10);
    const list = await prisma.link.findMany({
      where: {
        userId,
        categoryId,
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
      select: {
        id: true,
        name: true,
        url: true,
        description: true,
        category: {
          select: {
            id: true,
            name: true,
          }
        },
        userId: true,
      }
    });
    const total = await prisma.link.count({
      where: {
        userId,
        categoryId,
      },
    });

    return c.json({
      code: 0,
      data: {
        list,
        total,
      },
      message: "success",
    });
  } catch (error) {
    return c.json({
      code: 1,
      data: {
        list: [],
        total: 0,
      },
      message: "fail",
    });
  }
});

// link
profileLinkRouter.post("/", async (c: Context) => {
  try {
    // 检查是否是当前用户
    const userId = c.get("userId");
    const dto = await c.req.json();
    const categoryId = Number(dto.categoryId);
    const category = await prisma.linkCategory.findUnique({
      where: {
        userId,
        id: categoryId,
      },
    });
    if (!category) {
      return c.json({
        code: 1,
        message: "User No Category",
      });
    }
    if (category?.userId !== userId) {
      return c.json({
        code: 1,
        data: {},
        message: "fail",
      });
    } else {
      const dto = await c.req.json();
      const result = await prisma.link.create({
        data: {
          name: dto.name,
          url: dto.url,
          description: dto.description,
          categoryId,
          userId,
        },
      });
      return c.json({
        code: 0,
        message: "success",
        data: result,
      });
    }
  } catch (error) {
    return c.json({
      code: 1,
      message: (error as Error).message,
      data: {},
    });
  }
});
profileLinkRouter.put("/", async (c: Context) => {
  try {
    // 检查是否是当前用户
    const userId = c.get("userId");
    const dto = await c.req.json();
    const { id } = dto;
    const category = await prisma.link.findUnique({
      where: {
        userId,
        id
      },
    });
    if (!category) {
      return c.json({
        code: 1,
        message: "User No Category",
      });
    }
    if (category?.userId !== userId) {
      return c.json({
        code: 1,
        data: {},
        message: "fail",
      });
    } else {
      const result = await prisma.link.update({
        where: {
          id,
        },
        data: {
          name: dto.name,
          url: dto.url,
          description: dto.description,
          categoryId: dto.categoryId,
        },
      });
      return c.json({
        code: 0,
        message: "success",
        data: result,
      });
    }
  } catch (error) {
    return c.json({
      code: 1,
      message: (error as Error).message,
      data: {},
    });
  }
});

profileLinkRouter.delete("/", async (c: Context) => {
  try {
    const userId = c.get("userId");
    const {ids} = await c.req.json();
    const result = await prisma.link.deleteMany({
      where: {
        userId,
        id: {
          in: ids,
        },
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
