import { Space } from "antd";
import { AntdIcon } from "@/components/common";

export function genMenuTreeForRole(
	items: any[],
	t: (v: string) => string,
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
					{t(item.name)}
				</Space>
			) : (
				t(item.name)
			),
			children: genMenuTreeForRole(items, t, item.id), // 递归构建子树
		}))
		.sort((a, b) => a.orderNo - b.orderNo);
}
