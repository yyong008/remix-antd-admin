import { createRequestHandler } from "@remix-run/express";
import express from "express";
import figlet from "figlet";
import { installGlobals } from "@remix-run/node";

installGlobals();

const viteDevServer =
  process.env.NODE_ENV === "production"
    ? undefined
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        }),
      );

const app = express();

// handle asset requests
if (viteDevServer) {
  app.use(express.static("public"));
  app.use(viteDevServer.middlewares);
} else {
  app.use(
    "/assets",
    express.static("build/client/assets", {
      immutable: true,
      maxAge: "1y",
    }),
  );
}
app.use(express.static("build/client", { maxAge: "1h" }));

// handle SSR requests
app.all(
  "*",
  createRequestHandler({
    // @ts-ignore
    build: viteDevServer
      ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
      : // @ts-ignore
        await import("../build/server/index"),
  }),
);

// dev default 3333
let port = 3333;

if (process.env.NODE_ENV === "production") {
  port = 3000;
}

app.listen(port, () => {
  console.log(
    figlet.textSync("Remix Admin Admin", {
      font: "Ghost",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 240,
      whitespaceBreak: true,
    }),
  );
  console.log("")
  console.log(`Server on: http://localhost:${port}\n`);
});
