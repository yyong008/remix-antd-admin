import { z } from "zod";
import { remarkImage, remarkMdxMermaid } from "fumadocs-core/mdx-plugins";
import lastModified from "fumadocs-mdx/plugins/last-modified";
import { remarkSteps, remarkNpm } from "fumadocs-core/mdx-plugins";
import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from "fumadocs-mdx/config";


export const docs = defineDocs({
  dir: "/docs",
  docs: {
    /**
     * @see https://fumadocs.dev/docs/ui/llms
     */
    postprocess: {
      includeProcessedMarkdown: true,
    },
    schema: frontmatterSchema.extend({
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

export const legal = defineDocs({
  dir: "/legal",
  docs: {
    schema: frontmatterSchema.extend({
      title: z.string(),
      slug: z.string().optional(),
    }),
  },
});

export default defineConfig({
  plugins: [lastModified()],
  mdxOptions: {
    remarkPlugins: [
      // https://www.fumadocs.dev/docs/headless/mdx/remark-image#example-without-imports
      [remarkImage, { useImport: false }],
      remarkMdxMermaid,
      remarkSteps,
      [remarkNpm, { persist: { id: "package-manager" } }],
    ],
    rehypePlugins: (v) => [...v],
  },
});
