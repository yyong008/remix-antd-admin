import { ProForm, ProFormRadio, ProFormText } from "@ant-design/pro-components";

import { CustomTree } from "./CustomTree";

export function FormItems(props: any) {
	const { menu, checkedKeys, onCheck } = props;
	return (
		<>
			<ProFormText
				name="name"
				label="角色名"
				placeholder="请输入"
				rules={[
					{
						required: true,
						message: "请输入",
					},
				]}
			/>
			<ProFormText
				name="value"
				label="角色值"
				placeholder="请输入"
				rules={[
					{
						required: true,
						message: "请输入",
					},
				]}
			/>
			<ProFormText name="description" label="描述" placeholder="请输入" />
			<ProFormText name="remark" label="备注" placeholder="请输入" />
			<ProForm.Item label="菜单权限" name="menus">
				<CustomTree menu={menu} checkedKeys={checkedKeys} onCheck={onCheck} />
			</ProForm.Item>
			<ProFormRadio.Group
				name="status"
				label="状态"
				options={[
					{
						label: "启用",
						value: 1,
					},
					{
						label: "禁用",
						value: 0,
					},
				]}
				rules={[
					{
						required: true,
						message: "请输入",
					},
				]}
			/>
		</>
	);
}
