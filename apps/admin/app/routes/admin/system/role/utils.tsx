import { Space } from "antd";
import { AntdIcon } from "~/components/common";
import { resolveMenuLabel } from "~/utils/client/menu-label";

export function genMenuTreeForRole(items: any[], parentId?: number | null): any[] {
  return items
    .filter((item) => item.parent_menu_id === parentId)
    .map((item) => {
      const label = resolveMenuLabel(item.name);
      return {
        id: item.id,
        orderNo: item.orderNo,
        key: item.id,
        value: item.id,
        title: item.icon ? (
          <Space>
            <AntdIcon name={item.icon} />
            {label}
          </Space>
        ) : (
          label
        ),
        children: genMenuTreeForRole(items, item.id),
      };
    })
    .sort((a, b) => a.orderNo - b.orderNo);
}
