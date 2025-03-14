import { Hono } from "hono"
import { accoutRouter } from "./account"
import { profileLinkCategoryRouter } from "./link-category"
import { profileLinkRouter } from "./link"

export const profileRouter = new Hono()

profileRouter.route("/account", accoutRouter)
profileRouter.route("/link", profileLinkRouter)
profileRouter.route("/link/category", profileLinkCategoryRouter)
