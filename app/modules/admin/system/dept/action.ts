import * as ds from "~/server/decorators";
import type * as rrn from "@remix-run/node";

interface SystemConfigActionInterface {
  action(actionArgs: rrn.ActionFunctionArgs): any;
  POST(actionArgs: rrn.ActionFunctionArgs): any;
  PUT(actionArgs: rrn.ActionFunctionArgs): any;
  DELETE(actionArgs: rrn.ActionFunctionArgs): any;
}

type TM = keyof Omit<SystemConfigActionInterface, "action">;

class Action {
  async action(actionArgs: rrn.ActionFunctionArgs) {
    return this?.[actionArgs.request.method as TM]?.(actionArgs);
  }

  @ds.checkLogin()
  async POST({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  async PUT({ request, params }: rrn.ActionFunctionArgs) {}

  @ds.checkLogin()
  async DELETE({ request, params }: rrn.ActionFunctionArgs) {}
}

export const action = new Action().action;
