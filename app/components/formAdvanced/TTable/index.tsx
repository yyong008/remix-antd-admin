import type { ProColumns } from "@ant-design/pro-components";

// components
import { ProForm, EditableProTable } from "@ant-design/pro-components";
import { Card } from "antd";
import { useState } from "react";

const columns: ProColumns[] = [
  {
    title: "成员姓名",
    dataIndex: "name",
  },
  {
    title: "工号",
    dataIndex: "num",
  },
  {
    title: "	所属部门",
    dataIndex: "part",
  },
  {
    title: "操作",
    valueType: "option",
    align: "center",
  },
];

const defaultData = [
  {
    id: 1,
    name: "John Brown",
    num: "00001",
    part: "New York No. 1 Lake Park",
    created_at: "1590486176000",
  },
  {
    id: 2,
    name: "Jim Green",
    num: "00002",
    part: "London No. 1 Lake Park",
  },
  {
    id: 3,
    name: "Joe Black",
    num: "00003",
    part: "Sidney No. 1 Lake Park",
  },
];

const TTable = function () {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item: any) => item.id)
  );
  return (
    <Card title="仓库管理">
      <ProForm.Item
        name="dataSource"
        initialValue={defaultData}
        trigger="onValuesChange"
      >
        <EditableProTable
          rowKey="id"
          toolBarRender={false}
          columns={columns}
          recordCreatorProps={{
            newRecordType: "dataSource",
            position: "bottom",
            record: (length, arr) => {
              return {
                id: length + 1,
              };
            },
          }}
          editable={{
            type: "multiple",
            editableKeys,
            onChange: setEditableRowKeys,
            actionRender: (row, _, dom) => {
              return [dom.delete, dom.cancel, dom.save];
            },
          }}
        />
      </ProForm.Item>
    </Card>
  );
};

export default TTable
