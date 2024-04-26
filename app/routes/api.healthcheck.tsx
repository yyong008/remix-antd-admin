// types
import type { LoaderFunction } from "@remix-run/node";

// controllers
import { ApiHealthCheckController } from "~/server/controllers/api";

// remix-loader
export const loader: LoaderFunction = ApiHealthCheckController.loader;
