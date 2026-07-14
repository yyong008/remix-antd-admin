import {
  remarkNpm,
  remarkSteps,
  remarkImage,
  remarkCodeTab,
  remarkMdxMermaid,
} from "fumadocs-core/mdx-plugins";
import { z } from "zod";
import lastModified from "fumadocs-mdx/plugins/last-modified";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { pageSchema, metaSchema } from "fumadocs-core/source/schema";

export const docs = defineDocs({
  dir: `content/docs`,
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
    schema: pageSchema.extend({
      preview: z.string().optional(),
      index: z.boolean().default(false),
      method: z.string().optional(),
    }),
  },
  meta: {
    schema: metaSchema.extend({
      description: z.string().optional(),
    }),
  },
});

export default defineConfig({
  plugins: [lastModified()],
  mdxOptions: {
    remarkPlugins: [
      [remarkImage, { useImport: false }],
      remarkMdxMermaid,
      remarkSteps,
      remarkCodeTab,
      [remarkNpm, { persist: { id: "package-manager" } }],
    ],
    rehypePlugins: (v) => [...v],
  },
});
