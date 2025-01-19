import { ButtonLink } from "~/components/common";
import { DeleteAction } from "../DeleteAction";
import { Link } from "react-router";
import { Space } from "antd";

export function createColumns({ refetch, lang }: any) {
  return [
    {
      dataIndex: "title",
      title: "新闻标题",
      renderText(_: any, record: any) {
        return <Link to={`/${lang}/news/${record.id}`}>{record.title}</Link>;
      },
    },
    {
      dataIndex: "content",
      title: "新闻内容",
      render(_: any, record: any) {
        return <div>{record.content?.slice(0, 20)}</div>;
      },
    },
    {
      dataIndex: "author",
      title: "作者",
    },
    {
      dataIndex: "source",
      title: "新闻来源",
    },
    {
      dataIndex: "newsId",
      title: "新闻分类",
    },
    {
      dataIndex: "viewCount",
      title: "查看次数",
    },
    {
      dataIndex: "op",
      title: "操作",
      render(_: any, record: any) {
        return (
          <Space>
            <ButtonLink
              type="edit"
              to={`/${lang}/admin/news/edit/${record.id}`}
            />
            <DeleteAction refetch={refetch} record={record} title={""} />
          </Space>
        );
      },
    },
  ];
}
