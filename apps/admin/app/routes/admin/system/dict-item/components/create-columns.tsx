import { Button, Flex, Form, Popconfirm, Space, message } from "antd";
import { DeleteOutlined, OneToOneOutlined } from "@ant-design/icons";
import { StatusType } from "~/components/common";
import { UpdateDictItemModal } from "./update-dict-item-modal";
import { useDeleteDictItem } from "~/api-client/queries/system/system-dict-item";
import { formatDate } from "~/utils/client";
import { m } from "~/paraglide/messages";

function DeleteAction({ record, refetch }: any) {
  const deleteByIds = useDeleteDictItem();
  return (
    <Form>
      <Popconfirm
        title={m.system_dict_item_confirm_delete()}
        onConfirm={async () => {
          const ids = [record.id];
          await deleteByIds.mutateAsync({ dictionaryId: record.dictionary_id, ids });
          refetch?.();
          message.success(m.system_delete_success());
        }}
      >
        <Button type="link" danger icon={<DeleteOutlined />} loading={deleteByIds.isPending} />
      </Popconfirm>
    </Form>
  );
}

export const createColumns = ({ refetch }: any) => [
  {
    dataIndex: "key",
    title: m.system_dict_item_column_key(),
    render(_: any, record: any) {
      return (
        <Flex align="center" gap={16} style={{ fontWeight: 700 }}>
          <OneToOneOutlined />
          <span>{record.key}</span>
        </Flex>
      );
    },
  },
  {
    dataIndex: "value",
    title: m.system_dict_item_column_value(),
  },
  {
    dataIndex: "remark",
    title: m.system_dict_item_column_remark(),
  },
  {
    dataIndex: "status",
    title: m.system_dict_item_column_status(),
    renderText(_: any, record: any) {
      return <StatusType status={record.status} />;
    },
  },
  {
    dataIndex: "createdAt",
    title: m.system_created_at(),
    render(_: any, record: any) {
      return <div>{record.createdAt ? formatDate(record.createdAt) : "-"}</div>;
    },
  },
  {
    dataIndex: "updatedAt",
    title: m.system_updated_at(),
    render(_: any, record: any) {
      return <div>{record.updatedAt ? formatDate(record.updatedAt) : "-"}</div>;
    },
  },
  {
    dataIndex: "op",
    title: m.system_action(),
    render(_: any, record: any) {
      return (
        <Space>
          <UpdateDictItemModal record={record} refetch={refetch} />
          <DeleteAction refetch={refetch} record={record} />
        </Space>
      );
    },
  },
];
