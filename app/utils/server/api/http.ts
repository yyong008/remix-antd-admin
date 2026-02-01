import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

export class HttpMethod {
	isGET(args: ActionFunctionArgs | LoaderFunctionArgs) {
		return args.request.method === "GET";
	}
	isPOST(args: ActionFunctionArgs | LoaderFunctionArgs) {
		return args.request.method === "POST";
	}
	isPUT(args: ActionFunctionArgs | LoaderFunctionArgs) {
		return args.request.method === "PUT";
	}
	isDELETE(args: ActionFunctionArgs | LoaderFunctionArgs) {
		return args.request.method === "DELETE";
	}
	isPATCH(args: ActionFunctionArgs | LoaderFunctionArgs) {
		return args.request.method === "PATCH";
	}
}

export const hm = new HttpMethod();
