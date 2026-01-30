import type { MDXComponents } from "mdx/types";

import { Mermaid } from "./mermaid";
import { icons } from "lucide-react";
import { AiAgent } from "./vibe-code/ai-agent";
import { AiEditors } from "./vibe-code/ai-editors";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Banner } from "fumadocs-ui/components/banner";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { Callout } from "fumadocs-ui/components/callout";
import { Card, Cards } from "fumadocs-ui/components/card";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { GithubInfo } from "fumadocs-ui/components/github-info";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...(icons as Record<string, React.ComponentType>),
    ...components,
    ...defaultMdxComponents,
    Accordion,
    Accordions,
    Banner,
    Callout,
    Card,
    Cards,
    File,
    Files,
    Folder,
    GithubInfo,
    InlineTOC,
    Step,
    Steps,
    Tab,
    Tabs,
    TypeTable,
    AiAgent,
    AiEditors,
    Mermaid,
    img: (props) => <ImageZoom {...(props as any)} />,
  };
}
