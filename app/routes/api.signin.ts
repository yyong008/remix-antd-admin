// type
import type { ActionFunction } from "@remix-run/node";

// controller
import { ApiSignInController } from "~/server/controllers/api";

// remix-action
export const action: ActionFunction = ApiSignInController.action;
