import { Button, Flex, Form, Popconfirm, Space, message } from "antd";
import { FormatTime, StatusType } from "~/components/common";
import { DeleteOutlined, ProfileOutlined } from "@ant-design/icons";
import { UpdateDictModal } from "./update-dict-modal";
import { useDeleteDict } from "~/api-client/queries/system/system-dict";
import { href, Link } from "react-router";
import { Tag } from "antd";
import { m } from "~/paraglide/messages";

function DeleteAction({ record, refetch }: any) {
  const deleteByIds = useDeleteDict();
  return (
    <Form>
      <Popconfirm
        title={m.system_dict_confirm_delete()}
        onConfirm={async () => {
          const ids = [record.id];
          const result: any = await deleteByIds.mutateAsync({ ids });
          if (result?.code !== 0) {
            message.error(result?.message ?? m.system_delete_failed());
            return;
          }
          refetch?.();
          message.success(m.system_delete_success());
        }}
      >
        <Button type="link" danger icon={<DeleteOutlined />} loading={deleteByIds.isPending} />
      </Popconfirm>
    </Form>
  );
}

function TagLink({ locale, record }: any) {
  return (
    <Link
      to={{
        pathname: href("/:locale?/admin/system/dict-item/:id", { locale, id: record.id }),
      }}
    >
      <Tag color="blue">{record.code}</Tag>
    </Link>
  );
}

export const createColumns = ({ locale, refetch }: any) => [
  {
    dataIndex: "name",
    title: m.system_dict_column_name(),
    render(_: any, record: any) {
      return (
        <Flex align="center" gap={16} style={{ fontWeight: 700 }}>
          <ProfileOutlined />
          <span>{record.name}</span>
        </Flex>
      );
    },
  },
  {
    dataIndex: "code",
    title: m.system_dict_column_code(),
    render(_: any, record: any) {
      return <TagLink locale={locale} record={record} />;
    },
  },
  {
    dataIndex: "description",
    title: m.system_dict_column_description(),
  },
  {
    dataIndex: "remark",
    title: m.system_dict_column_remark(),
  },
  {
    dataIndex: "status",
    title: m.system_dict_column_status(),
    renderText(_: any, record: any) {
      return <StatusType status={record.status} />;
    },
  },
  {
    dataIndex: "createdAt",
    title: m.system_created_at(),
    render(_: any, record: any) {
      return <FormatTime timeStr={record.createdAt} />;
    },
  },
  {
    dataIndex: "updatedAt",
    title: m.system_updated_at(),
    render(_: any, record: any) {
      return <FormatTime timeStr={record.updatedAt} />;
    },
  },
  {
    dataIndex: "op",
    title: m.system_action(),
    render(_: any, record: any) {
      return (
        <Space size="small">
          <UpdateDictModal record={record} refetch={refetch} />
          <DeleteAction refetch={refetch} record={record} />
        </Space>
      );
    },
  },
];
