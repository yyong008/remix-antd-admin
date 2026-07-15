import { lazy } from "react";
import type { ComponentType } from "react";
import { ClientOnly } from "~/components/common/client-only";

type EditorProps = {
  content: string;
  setContent: (v: string) => void;
  initContent: string;
  value?: string;
  onChange?: (v: string) => void;
};

const Editor: ComponentType<EditorProps> = import.meta.env.SSR
  ? () => null as any
  : lazy(() => import("./editor"));

export const RichTextEditor = (props: EditorProps) => {
  return <ClientOnly fallback={<>Loading...</>}>{() => <Editor {...props} />}</ClientOnly>;
};
