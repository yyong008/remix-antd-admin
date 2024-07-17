import type SMTPConnection from "nodemailer/lib/smtp-connection";
import { SortOrder } from "~/types";
import { from } from "rxjs";
import nodemailer from "nodemailer";
import prisma from "@/libs/prisma";

type EmailTemplateOptions = {
  page: number;
  pageSize: number;
  name?: string;
};

type SendMailOptions = {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };

  to: string; // 接收者的邮箱地址
  subject: string; // 邮件主题
  // text?: string; //邮件的text
  // html?: string; //也可以用html发送
  content: string;
};

export function sendMail$(options: SendMailOptions) {
  let transporter = nodemailer.createTransport({
    host: options.host, // 发送者的邮箱厂商，支持列表：https://nodemailer.com/smtp/well-known/
    port: options.port, // SMTP 端口
    secureConnection: false, // SSL安全链接
    secure: true,
    requireTLS: true,
    auth: {
      //发送者的账户密码
      user: options.auth.user, //账户
      pass: options.auth.pass, //smtp授权码，到邮箱设置下获取
    },
  } as SMTPConnection.Options);

  let mailOptions = {
    from: `<${options.auth.user}>`, // 发送者昵称和地址
    to: options.to, // 接收者的邮箱地址
    subject: options.subject, // 邮件主题
    html: options.content, //也可以用html发送
  };

  //发送邮件
  const sendMailPromise = new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
        return console.log(error);
      }

      resolve(info);
    });
  });

  return from(sendMailPromise);
}

export function readMailTemplateCount$() {
  return from(prisma.mail.count());
}

export function readMailTemplateById$(id: number) {
  return from(prisma.mail.findUnique({ where: { id } }));
}

export function readMailTemplateList$(options: EmailTemplateOptions) {
  return from(
    prisma.mail.findMany({
      skip: (options.page - 1) * options.pageSize,
      take: options.pageSize,
      orderBy: {
        id: SortOrder.DESCENDING,
      },
    }),
  );
}

export function createMailTemplate$(data: any) {
  return from(
    prisma.mail.create({
      data,
    }),
  );
}

export function updateMailTemplate$(data: any) {
  return from(
    prisma.mail.update({
      where: {
        id: data.id,
      },
      data,
    }),
  );
}

export function deleteMailTemplateByIds$(ids: number[]) {
  return from(
    prisma.mail.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    }),
  );
}
