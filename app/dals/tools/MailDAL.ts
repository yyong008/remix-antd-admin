import type SMTPConnection from "nodemailer/lib/smtp-connection";
import nodemailer from "nodemailer";
import prisma from "@/libs/prisma";
import type { Prisma } from "@prisma/client";

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

export class MailTemplateDAL {
  /**
   * 发送邮件
   * @param options
   * @returns
   */
  public async sendMail(options: SendMailOptions) {
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

    return sendMailPromise;
  }
  /**
   * 获取数量
   * @param param0
   * @returns
   */
  public async getCount() {
    return await prisma.mail.count();
  }

  /**
   * 获取邮件
   * @param id
   * @returns
   */
  public async getById(id: number) {
    return await prisma.mail.findUnique({ where: { id } });
  }

  /**
   * 获取列表
   * @param param0
   * @returns
   */
  public async getList({
    where,
    skip = 0,
    take = 10,
    orderBy,
  }: {
    where: Prisma.MailWhereInput;
    skip?: number;
    take?: number;
    orderBy?: Prisma.MailOrderByWithRelationInput;
  }) {
    return await prisma.mail.findMany({
      where,
      skip,
      take,
      orderBy,
    });
  }

  /**
   * 创建邮件
   * @param data
   * @returns
   */
  public async create(data: any) {
    return await prisma.mail.create({ data });
  }

  /**
   * 更新邮件
   * @param id
   * @param data
   * @returns
   */
  public async update(id: number, data: any) {
    return await prisma.mail.update({
      where: {
        id,
      },
      data,
    });
  }

  /**
   * 更新邮件
   * @param ids
   * @returns
   */
  public async deleteByIds(ids: number[]) {
    return await prisma.mail.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}

export const mailTemplateDAL = new MailTemplateDAL();
