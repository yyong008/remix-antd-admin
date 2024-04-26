// types
import type { LoaderFunction } from "@remix-run/node";

// controller
import { ApiSystemMonitorServeController } from "~/server/controllers/api";

// remix-loader
export const loader: LoaderFunction = ApiSystemMonitorServeController.loader;
