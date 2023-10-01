import React from 'react';

// components:vendor
import { ProFormSelect, ProForm } from "@ant-design/pro-components";

const Owner: React.FC = () => {
  return (
    <ProForm submitter={false}>
      <ProFormSelect
        width={200}
        name="Owner"
        label="所有者"
        mode="multiple"
        valueEnum={{
          self: "我自己",
          a: "Tom",
          b: "Jery",
          c: "Lish",
        }}
        placeholder="Please select a owner"
        rules={[{ required: true, message: "Please select your owner!" }]}
      />
    </ProForm>
  );
};

export default Owner;
