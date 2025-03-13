import { Context, Hono } from "hono";
import { profileAccountDAL } from "~/dals/profile/ProfileAccountDAL";
export const profileRouter = new Hono();

// account
profileRouter.get("/profile/account", async (c: Context) => {
  try {
    const userId = c.get("userId");
    const data = await profileAccountDAL.getAccountById(userId);

    return c.json({
      code: 0,
      data,
      message: "success",
    });
  } catch (error) {
    return c.json(error as Error);
  }
});

profileRouter.put("/profile/account", async (c: Context) => {
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
    return c.json(error as Error);
  }
});

profileRouter.get("/profile/link", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

// link
profileRouter.get("/profile/link", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});
profileRouter.get("/profile/link", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});
profileRouter.get("/profile/link", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});
profileRouter.get("/profile/link", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

profileRouter.get("/profile/category", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

profileRouter.get("/profile/category", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});
profileRouter.get("/profile/category", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});
profileRouter.get("/profile/category", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});
profileRouter.get("/profile/category", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});
profileRouter.get("/profile/category", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});
