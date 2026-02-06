import { mailCommonConfig } from "../common/mail";

const apiKey = process.env.RESEND_API_KEY || "";
const fromEmail = process.env.RESEND_FROM || "";
const fromName = process.env.RESEND_FROM_NAME || mailCommonConfig.defaultFromName;
const replyTo = process.env.RESEND_REPLY_TO || "";

export const mailServerConfig = {
	...mailCommonConfig,
	enabled: Boolean(apiKey && fromEmail),
	resend: {
		apiKey,
	},
	from: {
		name: fromName,
		email: fromEmail,
	},
	replyTo: replyTo || undefined,
};

export function requireMailConfig() {
	if (!mailServerConfig.resend.apiKey) {
		throw new Error("RESEND_API_KEY is not configured");
	}
	if (!mailServerConfig.from.email) {
		throw new Error("RESEND_FROM is not configured");
	}
}
