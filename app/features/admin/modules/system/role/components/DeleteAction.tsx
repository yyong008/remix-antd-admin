import { Button, Form, Popconfirm, message } from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteRole } from "~/api-client/queries/system-role";

type DeleteActionProps = {
	record: any;
	title: string;
	refetch: any;
};

export function DeleteAction(props: DeleteActionProps) {
	const { record, title, refetch } = props;
	const deleteRoles = useDeleteRole();
	return (
		<Form>
			<Popconfirm
				title={title || "确定要删除吗?"}
				onConfirm={async () => {
					const ids = [record.id];

					const result: any = await deleteRoles.mutateAsync({ ids });

					if (result?.code !== 0) {
						message.error(result?.message ?? "删除失败");
						return;
					}

					refetch?.();
					message.success("删除成功");
				}}
			>
				<Button
					type="link"
					danger
					icon={<DeleteOutlined />}
					loading={deleteRoles.isPending}
				/>
			</Popconfirm>
		</Form>
	);
}
