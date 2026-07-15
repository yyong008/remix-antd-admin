import { ButtonLink } from "~/components/common";
import { DeleteAction } from "./delete-action";
import { Space } from "antd";
import { href } from "react-router";
import { m } from "~/paraglide/messages";

export const createColumns = ({ locale, refetch }: any) => [
  {
    dataIndex: "name",
    title: m.tools_mail_list_column_name(),
    ellipsis: true,
  },
  {
    dataIndex: "subject",
    title: m.tools_mail_list_column_subject(),
    ellipsis: true,
  },
  {
    dataIndex: "to",
    title: m.tools_mail_list_column_to(),
    ellipsis: true,
  },
  {
    dataIndex: "content",
    title: m.tools_mail_list_column_content(),
    ellipsis: true,
  },
  {
    dataIndex: "op",
    title: m.tools_mail_list_column_action(),
    fixed: "right",
    ellipsis: true,
    render(_: any, record: any) {
      return (
        <Space>
          <ButtonLink
            key="create-mail"
            to={href(`/:locale?/admin/tools/mail/:id`, { locale, id: record.id })}
            type={"edit"}
          />
          <DeleteAction record={record} refetch={refetch} />
        </Space>
      );
    },
  },
];
