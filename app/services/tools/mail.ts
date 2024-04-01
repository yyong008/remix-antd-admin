import nodemailer from "nodemailer";

type SendMailOptions = {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };

  from: string; // 发送者昵称和地址
  to: string; // 接收者的邮箱地址
  subject: string; // 邮件主题
  // text?: string; //邮件的text
  // html?: string; //也可以用html发送
  content: string;
};

export function sendMail(options: SendMailOptions) {
  let transporter = nodemailer.createTransport({
    host: options.host, // 发送者的邮箱厂商，支持列表：https://nodemailer.com/smtp/well-known/
    port: options.port, // SMTP 端口
    secureConnection: false, // SSL安全链接
    secure: false,
    requireTLS: true,
    auth: {
      //发送者的账户密码
      user: options.auth.user, //账户
      pass: options.auth.pass, //smtp授权码，到邮箱设置下获取
    },
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: options.from, // 发送者昵称和地址
    to: options.to, // 接收者的邮箱地址
    subject: options.subject, // 邮件主题
    html: options.content, //也可以用html发送
  };

  //发送邮件
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
        return console.log(error);
      }

      console.log("邮件发送成功 ID：", info);
      resolve(info);
    });
  });
}
