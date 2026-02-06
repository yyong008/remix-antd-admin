import { Resend } from "resend";

import { mailServerConfig, requireMailConfig } from "~/config/server/mail";

type SendMailInput = {
	to: string | string[];
	subject: string;
	html?: string;
	text?: string;
	replyTo?: string;
	cc?: string | string[];
	bcc?: string | string[];
	from?: string;
};

function formatFrom() {
	const { name, email } = mailServerConfig.from;
	if (!email) return "";
	return name ? `${name} <${email}>` : email;
}

export async function sendMail(input: SendMailInput) {
	requireMailConfig();
	const resend = new Resend(mailServerConfig.resend.apiKey);
	const from = input.from || formatFrom();
	if (!from) {
		throw new Error("Mail sender is not configured");
	}

	return resend.emails.send({
		from,
		to: input.to,
		subject: input.subject,
		html: input.html,
		text: input.text,
		replyTo: input.replyTo ?? mailServerConfig.replyTo,
		cc: input.cc,
		bcc: input.bcc,
	});
}
