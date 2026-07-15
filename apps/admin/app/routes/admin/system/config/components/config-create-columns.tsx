import { FormatTime, StatusType } from "~/components/common";
import { Button, Flex, Form, Popconfirm, Space, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { UpdateConfigModal } from "./update-config-modal";
import { useDeleteConfig } from "~/api-client/queries/system/system-config";
import { m } from "~/paraglide/messages";

function DeleteAction({ record, refetch }: any) {
  const deleteByIds = useDeleteConfig();
  return (
    <Form>
      <Popconfirm
        title={m.system_config_confirm_delete()}
        onConfirm={async () => {
          const ids = [record.id];
          await deleteByIds.mutateAsync({ ids });
          refetch?.();
          message.success(m.system_delete_success());
        }}
      >
        <Button type="link" danger icon={<DeleteOutlined />} loading={deleteByIds.isPending} />
      </Popconfirm>
    </Form>
  );
}

export const createConfigTableColumns = ({ refetch }: any) => [
  {
    dataIndex: "name",
    title: m.system_config_column_name(),
    render(_: any, record: any) {
      return (
        <Flex align="center" gap={16} style={{ fontWeight: 700 }}>
          <span>{record.name}</span>
        </Flex>
      );
    },
  },
  {
    dataIndex: "key",
    title: m.system_config_column_key(),
  },
  {
    dataIndex: "value",
    title: m.system_config_column_value(),
  },
  {
    dataIndex: "type",
    title: m.system_config_column_type(),
  },
  {
    dataIndex: "description",
    title: m.system_config_column_description(),
  },
  {
    dataIndex: "remark",
    title: m.system_config_column_remark(),
  },
  {
    dataIndex: "status",
    title: m.system_config_column_status(),
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
          <UpdateConfigModal record={record} refetch={refetch} />
          <DeleteAction refetch={refetch} record={record} />
        </Space>
      );
    },
  },
];
