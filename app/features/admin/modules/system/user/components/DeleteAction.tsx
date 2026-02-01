import { Button, Popconfirm, message } from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteUser } from "~/api-client/queries/system-user";

export function DeleteAction({ record, reload }: any) {
	const deleteUserMutation = useDeleteUser();
	return (
		<Popconfirm
			key="del"
			title="Are your sure?"
			onConfirm={async () => {
				const ids = [record.id];
				const result: any = await deleteUserMutation.mutateAsync({ ids });
				if (result?.code !== 0) {
					message.error(result?.message);
					return false;
				}
				message.success(result?.message);
				reload?.();
				return true;
			}}
		>
			<Button danger type="link" icon={<DeleteOutlined />}></Button>
		</Popconfirm>
	);
}
