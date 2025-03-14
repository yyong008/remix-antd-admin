import { ButtonLink } from "~/components/common/button-link";
import { DeleteAction } from "./DeleteAction";
import { Space } from "antd";

export const createColumns = ({ lang, refetch }: any) => [
  {
    dataIndex: "subject",
    title: "邮件标题",
    ellipsis: true,
  },
  {
    dataIndex: "to",
    title: "接收邮件人",
    ellipsis: true,
  },
  {
    dataIndex: "content",
    title: "邮件内容",
    ellipsis: true,
  },
  {
    dataIndex: "host",
    title: "Host",
    ellipsis: true,
  },
  {
    dataIndex: "port",
    title: "端口",
    ellipsis: true,
  },
  {
    dataIndex: "user",
    title: "用户名",
    ellipsis: true,
  },
  {
    dataIndex: "pass",
    title: "输入授权码或密码",
    ellipsis: true,
  },
  {
    dataIndex: "op",
    title: "操作",
    fixed: "right",
    ellipsis: true,
    render(_: any, record: any) {
      return (
        <Space>
          <ButtonLink
            key="create-mail"
            to={`/${lang!}/admin/tools/mail/${record.id}`}
            type={"edit"}
          />
          <DeleteAction record={record} title={"用户"} refetch={refetch} />
        </Space>
      );
    },
  },
];
