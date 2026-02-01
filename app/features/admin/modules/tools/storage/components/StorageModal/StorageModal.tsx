import { Alert, Button, message } from "antd";
import { ModalForm, ProTable } from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";

import { ChoiceFileButton } from "./ChoiceFileButton";
import { EditOutlined } from "@ant-design/icons";
import { createModalColumns } from "./createModalColumns";

const FileSizeLimit = 2; // MB

type StorageModalProps = {
	trigger?: React.ReactNode;
	refetch: any;
};

export function StorageModal(props: StorageModalProps) {
	const { trigger } = props;
	const [fileList, setFileList] = useState<any[]>();
	const chooseFileListRef = useRef<any[]>([]);

	const reset = () => {
		chooseFileListRef.current = [];
		setFileList([]);
	};
	useEffect(() => {
		return () => {
			reset();
		};
	}, []);

	const uploadFile = (
		file: File,
		token: string | null,
		onProgress: (loaded: number, total: number) => void,
	) => {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open("POST", "/api/upload", true);
			if (token) {
				xhr.setRequestHeader("Authorization", `Bearer ${token}`);
			}
			xhr.upload.onprogress = (event) => {
				if (event.lengthComputable) {
					onProgress(event.loaded, event.total);
				}
			};
			xhr.onload = () => {
				if (xhr.status >= 200 && xhr.status < 300) {
					resolve(xhr.responseText);
				} else {
					reject(new Error("Upload failed"));
				}
			};
			xhr.onerror = () => reject(new Error("Upload failed"));
			const formData = new FormData();
			formData.append("file", file);
			xhr.send(formData);
		});
	};

	return (
		<ModalForm
			title="文件上传"
			onFinish={async (e) => {
				const files = chooseFileListRef.current?.map((file) => file) ?? [];
				if (!files.length) return true;
				setFileList(files);
				const token = localStorage.getItem("token");

				try {
					await Promise.all(
						files.map((file, index) =>
							uploadFile(file.file, token, (loaded, total) => {
								setFileList((prev) => {
									const base = prev?.length ? [...prev] : [...files];
									base[index] = {
										...base[index],
										progress: { loaded, total },
									};
									return base;
								});
							}),
						),
					);
					message.info("upload success");
					props?.refetch();
				} catch (error) {
					message.error("upload failed");
				}
				return true;
			}}
			submitter={{
				searchConfig: {
					submitText: "开始上传",
				},
				submitButtonProps: {
					disabled: chooseFileListRef.current.length <= 0,
				},
			}}
			modalProps={{
				destroyOnClose: true,
				onCancel: () => {
					reset();
				},
			}}
			submitTimeout={2000}
			trigger={
				trigger ??
				((
					<Button type={"primary"} icon={<EditOutlined />}>
						新建
					</Button>
				) as any)
			}
		>
			<Alert
				message={`单个文件不超过${FileSizeLimit}MB，最多只能上传10个文件`}
				type="info"
				showIcon
			/>
			<ProTable
				search={false}
				dataSource={fileList}
				columns={createModalColumns({ setFileList, fileList })}
				toolBarRender={() => [
					<ChoiceFileButton
						key="choice-file"
						fileList={fileList}
						setFileList={setFileList}
					/>,
				]}
			/>
		</ModalForm>
	);
}
