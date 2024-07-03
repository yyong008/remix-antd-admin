import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from "@remix-run/node";
import { ERRIR_PRESENTATION_MODE } from "@/constants/error";

type TT = ActionFunctionArgs | LoaderFunctionArgs;

export async function handlerPresentationMode(args: TT) {
  const method: string = args.request.method;
  if (method.toUpperCase() !== "GET" && process.env.PRESENTATION_MODE === "1") {
    throw new Error(ERRIR_PRESENTATION_MODE);
  }
}
