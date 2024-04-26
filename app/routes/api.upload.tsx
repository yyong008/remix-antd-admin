// type
import type { ActionFunction } from "@remix-run/node";

// controller
import { ApiUploadController } from "~/server/controllers/api";

// remix-action
export const action: ActionFunction = ApiUploadController.action;
