// components:vendor
import { ProFormSelect } from "@ant-design/pro-components";

const Owner = () => {
  return (
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
  );
};

export default Owner;
