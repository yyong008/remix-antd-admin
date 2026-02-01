import { Progress } from "antd";

export function createModalColumns({ setFileList, fileList, index }: any) {
	return [
		{
			dataIndex: "url",
			title: "地址",
			ellipsis: true,
		},
		{
			dataIndex: "name",
			title: "文件名",
			width: 260,
			render(_: any, record: any) {
				const percent = (record.progress.loaded / record.progress.total) * 100;
				return (
					<div>
						<div>{record.name}</div>
						<Progress percent={percent}></Progress>
					</div>
				);
			},
		},
		{
			dataIndex: "size",
			title: "文件大小",
		},
		{
			dataIndex: "state",
			title: "状态",
		},
		{
			title: "操作",
			render(_: any, record: any) {
				return (
					<div
						onClick={() => {
							setFileList(fileList?.filter((_: any, i: number) => i !== index));
						}}
					>
						删除
					</div>
				);
			},
		},
	];
}
