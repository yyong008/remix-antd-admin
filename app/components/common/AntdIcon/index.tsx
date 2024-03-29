import type { CSSProperties } from "react";

import * as _icons from "@ant-design/icons";

type AntdIconProps = {
  styles?: CSSProperties;
  name: string;
  className?: string;
};

export default function AntdIcon({ name, styles, className }: AntdIconProps) {
  const keys = Object.keys(_icons);
  let IconComponent;
  if (name && keys.includes(name)) {
    IconComponent = _icons[name];
  } else {
    return <>-</>;
  }

  return <IconComponent style={styles} className={className} />;
}
