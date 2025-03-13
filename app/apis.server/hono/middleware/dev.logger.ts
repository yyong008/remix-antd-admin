import { Context } from "hono";
import dayjs from "dayjs";
import chalk from "chalk";
export function devLogger() {
  return async (c: Context, next: Function) => {
    if (process.env.NODE_ENV === "development") {
      console.log(chalk.green(dayjs().format("HH:mm:ss")) + chalk.blue("[dev request api url]: "), c.req.method, c.req.url);
      if (
        c.req.method === "POST" ||
        c.req.method === "PUT" ||
        c.req.method === "DELETE"
      ) {
        try {
          const contentType = c.req.header("content-type");
          console.log(chalk.green(dayjs().format("HH:mm:ss")) + chalk.blue("[dev request api content-type]: "), contentType);
          if (contentType?.startsWith("multipart/form-data")) {
            const body = await c.req.raw.clone().body;
            console.log(chalk.green(dayjs().format("HH:mm:ss")) + chalk.blue("[dev request api form-data body]: "), body);
          } else {
            const body = await c.req.raw.clone().json(); // const body = await c.req.json(); The response body is a ReadableStream that can only be consumed once
            console.log(
              chalk.green(dayjs().format("HH:mm:ss")) + chalk.blue("[dev request api json body]: "),
              JSON.stringify(body, null, 2),
            );
          }
        } catch (error) {
          console.error(chalk.green(dayjs().format("HH:mm:ss")) + chalk.red("[dev request api json body error]: "), error);
        }
      }
    }
    await next();
  };
}
