// react
import { useState } from "react";

// component
import {
  ModalForm,
  ProForm,
  ProFormGroup,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import * as _icons from "@ant-design/icons";
import { Button, Form, Tree } from "antd";

const { EditOutlined } = _icons;

type CreateRoleModalProps = {
  trigger?: React.ReactNode;
  record: any;
  menu: any[];
  fetcher: any;
};

export default function CreateRoleModal({
  trigger,
  record,
  menu,
  fetcher,
}: CreateRoleModalProps) {
  const [form] = Form.useForm();
  const [checkedKeys, setCheckedKeys] = useState([]);

  const onCheck = (checkedKeys: any, info: any) => {
    setCheckedKeys(checkedKeys);
  };

  return (
    <ModalForm
      title="创建角色"
      trigger={
        trigger ?? (
          <Button
            type={!record.id ? "primary" : "link"}
            icon={<EditOutlined />}
          >
            {!record.id ? "新建" : ""}
          </Button>
        )
      }
      form={form}
      autoFocusFirstInput
      onOpenChange={(e) => {
        if (e) {
          form.setFieldsValue({
            ...record,
            menus: record.menus?.map((mn) => mn?.menu?.name),
          });
          setCheckedKeys(record.menus?.map((mn) => mn?.menu?.name));
        }
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log(""),
      }}
      submitTimeout={2000}
      onFinish={async (vals) => {
        const values = record.id
          ? {
              ...vals,
              id: record.id,
            }
          : vals;
        fetcher.submit(values, {
          method: record.id ? "PUT" : "POST", // 修改或新建
          encType: "application/json",
        });
        return true;
      }}
    >
      <ProFormGroup>
        <ProFormText
          width="md"
          name="name"
          label="角色名"
          placeholder="请输入"
          rules={[
            {
              required: true,
              message: "请输入",
            },
          ]}
        />
        <ProFormText
          width="md"
          name="value"
          label="角色值"
          placeholder="请输入"
          rules={[
            {
              required: true,
              message: "请输入",
            },
          ]}
        />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormTextArea
          width="md"
          name="description"
          label="描述"
          placeholder="请输入"
        />
        <ProFormTextArea
          width="md"
          name="remark"
          label="备注"
          placeholder="请输入"
        />
      </ProFormGroup>
      <ProForm.Item label="菜单" name="menus">
        <CustomTree menu={menu} checkedKeys={checkedKeys} onCheck={onCheck} />
      </ProForm.Item>
      <ProFormRadio.Group
        name="status"
        label="状态"
        options={[
          {
            label: "启用",
            value: 1,
          },
          {
            label: "禁用",
            value: 0,
          },
        ]}
      />
    </ModalForm>
  );
}

type CustomTreeProps = {
  value?: any;
  onChange?: (v: any) => void;
  menu: any[];
  checkedKeys: any[];
  onCheck: (a?: any, b?: any) => void;
};

function CustomTree({
  value,
  onChange,
  menu,
  checkedKeys,
  onCheck,
}: CustomTreeProps) {
  return (
    <div className="h-[300px] overflow-y-auto">
      <Tree
        showLine
        showIcon
        checkable
        selectable
        treeData={menu}
        checkedKeys={checkedKeys}
        onCheck={(e, d) => {
          onCheck(e);
          onChange?.(d.checkedNodes);
        }}
      />
    </div>
  );
}
