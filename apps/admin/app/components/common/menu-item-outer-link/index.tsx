import { ExportOutlined } from "@ant-design/icons";
import { useColorPrimary } from "~/hooks/useColorPrimary";

type MProps = {
  path: string;
  dom: React.ReactNode;
};

export function MenuItemOutLink(props: MProps) {
  const { path, dom } = props;
  const { colorPrimary } = useColorPrimary();
  return (
    <a
      href={path}
      target="_blank"
      rel="noreferrer"
      style={{ display: "flex", alignItems: "center", gap: 4 }}
    >
      {dom} <ExportOutlined style={{ fontSize: "10px", color: colorPrimary }} />
    </a>
  );
}
