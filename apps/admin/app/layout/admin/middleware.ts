import type { Route } from "./+types/index";

import { redirect, href } from "react-router";

const authMiddleware: Route.MiddlewareFunction = async (
  { request, params },
  next,
) => {
  const url = import.meta.env.VITE_API_URL + "/api/auth/session";
  const response = await fetch(url, {
    headers: request.headers,
  }).then((res) => res);
  const result = await response.json();
  if (!result?.data?.user?.id) {
    throw redirect(href("/:locale?/auth/login", { locale: params.locale }));
  }

  next();
};

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];