import { DeleteAction } from "./DeleteAction";
import { href, Link } from "react-router";
import { Space } from "antd";
import { TagOutlined } from "@ant-design/icons";
import { UpdateBlogModal } from "./UpdateBlogModal";
import { useColorPrimary } from "~/hooks/useColorPrimary";

export const createColumns = ({ locale, refetch }: any) => [
	{
		dataIndex: "name",
		title: "标签名字",
		renderText(_: any, record: any) {
			return (
				<Link to={{
          pathname: href("/:locale?/admin/blog", { locale }),
          search: `tag=${record.id}`,
        }}>
					<Space>
						<TagIcons />
						<span>{record.name}</span>
					</Space>
				</Link>
			);
		},
	},
	{
		dataIndex: "description",
		title: "描述",
	},
	{
		dataIndex: "op",
		title: "操作",
		render(_: any, record: any) {
			return (
				<Space>
					<UpdateBlogModal record={record} refetch={refetch} />
					<DeleteAction refetch={refetch} record={record} title={""} />
				</Space>
			);
		},
	},
];

function TagIcons() {
	const { colorPrimary } = useColorPrimary();
	return <TagOutlined style={{ color: colorPrimary }} />;
}
