import { Space } from "antd";
import { AntdIcon } from "@/components/common";

export function genMenuTreeForRole(
	items: any[],
	parentId?: number | null,
): any[] {
	return items
		.filter((item) => item.parent_menu_id === parentId)
		.map((item) => ({
			id: item.id,
			orderNo: item.orderNo,
			key: item.id,
			value: item.id,
			title: item.icon ? (
				<Space>
					<AntdIcon name={item.icon} />
					{item.name}
				</Space>
			) : (
				item.name
			),
			children: genMenuTreeForRole(items, item.id), // 递归构建子树
		}))
		.sort((a, b) => a.orderNo - b.orderNo);
}
