import { message } from "antd";

export const unauthorizedHandler = (msg: string) => {
	message.error(msg || "Unauthorized");
};

export const dataErrorHandler = (msg: string) => {
	message.error(msg || "Data Error");
};
