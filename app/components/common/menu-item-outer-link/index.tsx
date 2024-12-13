import { ExportOutlined } from "@ant-design/icons";
import { useColorPrimary } from "~/hooks/use-color-primary";

type MProps = {
  path: string;
  dom: React.ReactNode;
};

export function MenuItemOutLink(props: MProps) {
  const { path, dom } = props;
  const { colorPrimary } = useColorPrimary();
  return (
    <a
      className="flex items-center gap-1"
      href={path}
      target={"_blank"}
      rel="noreferrer"
    >
      {dom} <ExportOutlined style={{ fontSize: "10px", color: colorPrimary }} />
    </a>
  );
}
