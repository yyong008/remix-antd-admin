import {
	ProFormDateTimePicker,
	ProFormSelect,
	ProFormText,
	ProFormTextArea,
} from "@ant-design/pro-components";

export const ModalFormItems = ({ categoriesOptions, tagsOptions }: any) => {
	return (
		<>
			<ProFormText
				label="博客标题"
				name="title"
				rules={[
					{
						required: true,
						message: "请输入",
					},
				]}
			/>
			<ProFormText
				label="博客作者"
				name="author"
				rules={[
					{
						required: true,
						message: "请输入",
					},
				]}
			/>
			<ProFormText
				label="博客来源"
				name="source"
				rules={[
					{
						required: true,
						message: "请输入",
					},
				]}
			/>
			<ProFormDateTimePicker
				label="博客发布时间"
				name="publishedAt"
				width={"100%" as any}
				rules={[
					{
						required: true,
						message: "请输入",
					},
				]}
			/>
			<ProFormSelect
				label="分类"
				name="categoryId"
				rules={[
					{
						required: true,
						message: "请输入",
					},
				]}
				options={categoriesOptions}
			/>
			<ProFormSelect
				label="标签"
				name="tagId"
				options={tagsOptions}
				rules={[
					{
						required: true,
						message: "请输入",
					},
				]}
			/>
			<ProFormTextArea
				style={{ display: "none" }}
				label="编写博客"
				name="content"
				rules={[
					{
						required: true,
						message: "请输入",
					},
				]}
			></ProFormTextArea>
		</>
	);
};
