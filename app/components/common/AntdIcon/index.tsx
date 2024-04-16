import type { CSSProperties } from "react";

import * as _icons from "@ant-design/icons";
import type Icon from "@ant-design/icons/lib/components/Icon";

type AntdIconProps = {
  styles?: CSSProperties;
  name: string;
  className?: string;
};

export default function AntdIcon({ name, styles, className }: AntdIconProps) {
  const keys = Object.keys(_icons)
    .filter((icon) => /[A-Z]/.test(icon[0]))
    .filter((icon) => icon !== "IconProvider");

  if (name && keys.includes(name)) {
    const IconComponent = _icons[name as keyof typeof _icons] as typeof Icon;
    return <IconComponent style={styles} className={className} />;
  } else {
    return <>-</>;
  }
}
