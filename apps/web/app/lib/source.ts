import { i18n } from "~/lib/i18n";
import { loader, type LoaderOutput } from "fumadocs-core/source";
import { docs } from "collections/server.ts";

export const source: LoaderOutput<any> = loader({
  source: docs.toFumadocsSource(),
  baseUrl: "/docs",
  i18n,
});
