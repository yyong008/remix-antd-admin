import { Context, Hono } from "hono";
import { profileAccountDAL } from "~/dals/profile/ProfileAccountDAL";

export const accoutRouter = new Hono();

// account
accoutRouter.get("/", async (c: Context) => {
  try {
    const userId = c.get("userId");
    const data = await profileAccountDAL.getAccountById(userId);

    return c.json({
      code: 0,
      data,
      message: "success",
    });
  } catch (error) {
    return c.json({
      code: 1,
      message: (error as Error).message,
      data: {},
    });
  }
});

accoutRouter.put("/", async (c: Context) => {
  try {
    const userId = c.get("userId");
    const dto = await c.req.json();
    const data = await profileAccountDAL.updateAccountById(userId, dto);

    return c.json({
      code: 0,
      data,
      message: "success",
    });
  } catch (error) {
    return c.json({
      code: 1,
      message: (error as Error).message,
      data: {},
    });
  }
});
