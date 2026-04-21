import { Form } from "antd";
import type { ReactNode } from "react";

type ProFormDependencyProps = {
  name: string[];
  children: (values: Record<string, unknown>) => ReactNode;
  ignoreFormListField?: boolean;
};

export function ProFormDependency({ name, children }: ProFormDependencyProps) {
  const form = Form.useFormInstance();
  const v = name.length === 1 ? Form.useWatch(name[0], form) : Form.useWatch(name as any, form);
  const map: Record<string, unknown> =
    name.length === 1 ? { [name[0]!]: v } : ((v as Record<string, unknown>) ?? {});
  return <>{children(map)}</>;
}
