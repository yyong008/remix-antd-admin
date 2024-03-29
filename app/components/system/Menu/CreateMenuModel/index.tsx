import {
  ModalForm,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from "@ant-design/pro-components";
import * as _icons from "@ant-design/icons";
import { Button, Form } from "antd";
import { useEffect, useState } from "react";

const { EditOutlined } = _icons;

type MenuModalProps = {
  trigger?: () => void;
  record?: any;
  fetcher?: any;
  menuNotPerm?: any[];
};

export default function MenuModal({
  trigger,
  record,
  fetcher,
  menuNotPerm,
}: MenuModalProps) {
  const [form] = Form.useForm();

  const [innerMenuNotPerm, setInnerMenuNotPerm] = useState<any>();

  useEffect(() => {
    setInnerMenuNotPerm(menuNotPerm);
  }, [menuNotPerm]);
  return (
    <ModalForm
      layout="horizontal"
      labelCol={{ span: 3 }}
      key={Date.now()}
      preserve={false}
      title={record?.id ? "修改菜单" : "创建菜单"}
      onOpenChange={(c) => {
        if (!c || !record.id) {
          return;
        }
        form.setFieldsValue({
          ...record,
          type: Number(record.type),
        });
      }}
      trigger={
        trigger ??
        ((
          <Button
            type={!record.id ? "primary" : "link"}
            icon={<EditOutlined />}
          >
            {!record.id ? "新建" : ""}
          </Button>
        ) as any)
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => form.resetFields(),
      }}
      submitTimeout={2000}
      onFinish={async (values: any) => {
        const vals = { ...values };
        if (record.id) {
          vals.id = record.id;
        }
        fetcher.submit(vals, {
          method: record.id ? "PUT" : "POST", // 修改或新建
          encType: "application/json",
        });
        form.resetFields();
        return true;
      }}
    >
      <ProFormRadio.Group
        name="type"
        label="菜单类型"
        radioType="button"
        fieldProps={{
          buttonStyle: "solid",
        }}
        width={300}
        disabled={record.id}
        initialValue={!record.id ? 1 : record.type}
        options={[
          {
            label: "目录",
            value: 1,
          },
          {
            label: "菜单",
            value: 2,
          },
          {
            label: "权限",
            value: 3,
          },
        ]}
        rules={[
          {
            required: true,
            message: "请输入用户名",
          },
        ]}
      />

      <ProFormDependency key="typeMode" name={["type"]} ignoreFormListField>
        {({ type }) => {
          if (type === 1) {
            return <TypeDir menuNotPerm={innerMenuNotPerm}></TypeDir>;
          }
          if (type === 2) {
            return <TypeMenu menuNotPerm={innerMenuNotPerm}></TypeMenu>;
          }
          if (type === 3) {
            return (
              <TypePermission menuNotPerm={innerMenuNotPerm}></TypePermission>
            );
          }
        }}
      </ProFormDependency>
    </ModalForm>
  );
}

function TypeDir({ menuNotPerm }: any) {
  return (
    <>
      <ProFormText
        name="name"
        label="菜单名称"
        placeholder="请输入"
        rules={[
          {
            required: true,
            message: "请输入用户名",
          },
        ]}
      />
      <ProFormTreeSelect
        name="parentId"
        label="上级节点"
        placeholder="请选择上级节点"
        request={async () => {
          return menuNotPerm;
        }}
        rules={[
          {
            required: true,
            message: "请选择",
          },
        ]}
        fieldProps={{
          fieldNames: { label: "name", value: "id" },
        }}
      />
      <ProFormText
        name="path"
        label="路由地址"
        placeholder="输入路由地址"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormText
        name="icon"
        label="节点图标"
        placeholder="选择一个节点图标"
        rules={[
          {
            required: false,
            message: "请输入",
          },
        ]}
      />
      <ProFormDigit
        name="orderNo"
        label="节点排序"
        placeholder="节点排序"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormTextArea
        name="description"
        label="菜单描述"
        placeholder="不修改无需填写"
        rules={[
          {
            required: false,
            message: "请输入",
          },
        ]}
      />
      <ProFormTextArea name="remark" label="备注" />
      <ProFormRadio.Group
        name="isLink"
        label="外链"
        tooltip="是否是外部链接"
        options={[
          {
            label: "是",
            value: 1,
          },
          {
            label: "否",
            value: 0,
          },
        ]}
      />
      <ProFormRadio.Group
        name="status"
        label="状态"
        tooltip="是否在启动菜单"
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
      <ProFormRadio.Group
        name="isShow"
        label="显示"
        tooltip="是否在菜单栏显示"
        options={[
          {
            label: "是",
            value: 1,
          },
          {
            label: "否",
            value: 0,
          },
        ]}
      />
    </>
  );
}

function TypeMenu({ menuNotPerm }: any) {
  return (
    <>
      <ProFormText
        name="name"
        label="菜单名称"
        placeholder="请输入"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormTreeSelect
        name="parentId"
        label="上级节点"
        placeholder="请选择上级节点"
        request={async () => {
          return menuNotPerm;
        }}
        rules={[
          {
            required: true,
            message: "请选择",
          },
        ]}
        fieldProps={{
          fieldNames: { label: "name", value: "id" },
        }}
      />
      <ProFormText
        name="path"
        label="路由地址"
        placeholder="输入路由地址"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormText
        name="permission"
        label="权限"
        placeholder="选择权限"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormText
        name="path_file"
        label="路由文件"
        placeholder="输入路由文件"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormText
        name="icon"
        label="节点图标"
        placeholder="选择一个节点图标"
        rules={[
          {
            required: false,
            message: "请输入",
          },
        ]}
      />
      <ProFormDigit
        name="orderNo"
        label="节点排序"
        placeholder="节点排序"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormRadio.Group
        name="isLink"
        label="外链"
        tooltip="是否是外部链接"
        options={[
          {
            label: "是",
            value: 1,
          },
          {
            label: "否",
            value: 0,
          },
        ]}
      />
      <ProFormRadio.Group
        name="status"
        label="状态"
        tooltip="是否在启动菜单"
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
      <ProFormRadio.Group
        name="cache"
        label="缓存"
        tooltip="是否缓存"
        options={[
          {
            label: "是",
            value: 1,
          },
          {
            label: "否",
            value: 0,
          },
        ]}
      />
      <ProFormRadio.Group
        name="isShow"
        label="显示"
        tooltip="是否在菜单栏显示"
        options={[
          {
            label: "是",
            value: 1,
          },
          {
            label: "否",
            value: 0,
          },
        ]}
      />
    </>
  );
}

function TypePermission({ menuNotPerm }) {
  return (
    <>
      <ProFormText
        name="name"
        label="权限名称"
        placeholder="选择权限"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormTreeSelect
        name="parentId"
        label="上级节点"
        placeholder="请选择上级节点"
        request={() => {
          return menuNotPerm;
        }}
        rules={[
          {
            required: true,
            message: "请选择",
          },
        ]}
        fieldProps={{
          fieldNames: { label: "name", value: "id" },
        }}
      />
      <ProFormText
        name="permission"
        label="权限"
        placeholder="选择权限"
        rules={[
          {
            required: true,
            message: "请选择",
          },
        ]}
      />
      <ProFormDigit
        name="orderNo"
        label="节点排序"
        placeholder="节点排序"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormRadio.Group
        name="status"
        label="状态"
        tooltip="是否在启动菜单"
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
    </>
  );
}
