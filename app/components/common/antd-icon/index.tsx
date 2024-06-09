import * as ic from "@ant-design/icons";

import type { CSSProperties } from "react";
import type Icon from "@ant-design/icons/lib/components/Icon";

type AntdIconProps = {
  styles?: CSSProperties;
  name: string;
  className?: string;
};

export function AntdIcon({ name, styles, className }: AntdIconProps) {
  const keys = Object.keys(ic)
    .filter((icon) => /[A-Z]/.test(icon[0]))
    .filter((icon) => icon !== "IconProvider");

  if (name && keys.includes(name)) {
    const IconComponent = ic[name as keyof typeof ic] as typeof Icon;
    return <IconComponent style={styles} className={className} />;
  } else {
    return <>-</>;
  }
}
