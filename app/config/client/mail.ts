import { mailCommonConfig } from "../common/mail";

export const mailClientConfig = {
	...mailCommonConfig,
	defaultFromEmail: "noreply@example.com",
};
