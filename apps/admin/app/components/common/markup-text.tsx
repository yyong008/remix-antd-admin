import { createElement, Fragment } from "react";

type Renderers = Record<string, React.ComponentType<{ children?: React.ReactNode }>>;

function renderParts(parts: any[], renderers: Renderers, keyPrefix = ""): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let i = 0;
  while (i < parts.length) {
    const part = parts[i];
    if (part.type === "text") {
      nodes.push(part.value);
      i++;
    } else if (part.type === "markup-standalone") {
      const Comp = renderers[part.name ?? ""];
      if (Comp) {
        nodes.push(createElement(Comp, { key: `${keyPrefix}${i}` }));
      }
      i++;
    } else if (part.type === "markup-start") {
      let depth = 1;
      let j = i + 1;
      while (j < parts.length && depth > 0) {
        const p = parts[j];
        if (p.type === "markup-start" && p.name === part.name) depth++;
        else if (p.type === "markup-end" && p.name === part.name) depth--;
        j++;
      }
      const inner = parts.slice(i + 1, j - 1);
      const children = renderParts(inner, renderers, `${keyPrefix}${i}_`);
      const Comp = renderers[part.name ?? ""];
      const key = `${keyPrefix}${i}`;
      nodes.push(
        Comp
          ? createElement(Comp, { key }, ...children)
          : createElement(Fragment, { key }, ...children),
      );
      i = j;
    } else {
      i++;
    }
  }
  return nodes;
}

export function MarkupText({ parts, renderers }: { parts: any[]; renderers: Renderers }) {
  return <>{renderParts(parts, renderers)}</>;
}
