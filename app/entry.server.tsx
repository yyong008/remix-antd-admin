import type { AppLoadContext, EntryContext } from "react-router";

import { isbot } from "isbot";
import { ServerRouter } from "react-router";
import { renderToReadableStream } from "react-dom/server";

export const streamTimeout = 5000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  _loadContext: AppLoadContext
) {
  const userAgent = request.headers.get("user-agent");
  const isBot = userAgent && isbot(userAgent);
  const isSpaMode = routerContext.isSpaMode;
  const stream = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} />,
    {
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    }
  );

  if (isBot || isSpaMode) {
    await stream.allReady;
  }

  responseHeaders.set("Content-Type", "text/html");

  return new Response(stream, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
