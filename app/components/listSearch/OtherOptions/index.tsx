// comonents:vendor
import { ProFormGroup, ProFormSelect } from "@ant-design/pro-components";

const OtherOptions = () => {
  return (
    <ProFormGroup style={{ marginTop: "20px" }}>
      <ProFormSelect
        width="md"
        name="Owner"
        label="活跃用户"
        valueEnum={{
          lisan: "李三",
        }}
        placeholder="Please select a country"
        rules={[{ required: true, message: "Please select your country!" }]}
        fieldProps={{}}
      />
      <ProFormSelect
        width="md"
        name="好评度"
        label="好评度"
        valueEnum={{
          ad: "优秀",
        }}
        placeholder="Please select"
        rules={[{ required: true, message: "Please select!" }]}
      />
    </ProFormGroup>
  );
};

export default OtherOptions;
