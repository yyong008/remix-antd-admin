import { Context, Hono } from "hono";
import prisma from "~/libs/prisma";

export const commonRouter = new Hono();

commonRouter.get("/healthcheck", async (c: Context) => {
  try {
    await prisma.user.count();
    return c.json({
      code: 0,
      message: {
        database: "ok",
      },
      data: {},
    });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({
        code: 500,
        message: error.message,
        data: {},
      });
    }
    return c.json({
      code: 500,
      message: (error as any)?.message ?? "",
      data: {},
    });
  }
});

commonRouter.post("/upload", async () => {
  //
});
