type SendEmailInput = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

export function sendEmail(env: Env, { from, to, subject, html }: SendEmailInput) {
  return env.SEND_EMAIL.send({
    from,
    to,
    subject,
    html,
  });
}
