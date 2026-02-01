import { ToolbarDeleteButtonUI } from "./ToolbarDeleteButtonUI";
import { message } from "antd";
import { useDeleteUser } from "~/api-client/queries/system-user";

type ToolbarDeleteButtonProps = {
	selectedRow: any[];
	reload: (...args: any) => any;
	setSelectedRow: any;
};

export function ToolbarDeleteButton(props: ToolbarDeleteButtonProps) {
	const { selectedRow, reload, setSelectedRow } = props;
	const deleteUserMutation = useDeleteUser();
	return (
		<ToolbarDeleteButtonUI
			selectedRow={selectedRow}
			onConfirm={async () => {
				const ids = selectedRow.map((id: any) => id);
				const result: any = await deleteUserMutation.mutateAsync({ ids });
				if (result?.code !== 0) {
					message.error(result?.message);
					return false;
				}
				message.success(result?.message);
				reload?.();
				setSelectedRow([]);
				return true;
			}}
		/>
	);
}
