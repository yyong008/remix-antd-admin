import { ProForm, ProFormDateRangePicker } from "@ant-design/pro-components";
import { Space } from "antd";

export const TabBarExtra = () => {
  const tablist = ["今日", "本周", "本月", "本年"];
  // const [setIdx] = useState(0)
  // const token = theme.useToken();

  return (
    <Space size="large">
      <Space>
        {tablist.map((it: any, index: number) => {
          return (
            <div
              // active={index === idx}
              // color={token.colorPrimary}
              key={index}
              onClick={() => {
                // setIdx(index);
              }}
            >
              {it}
            </div>
          );
        })}
      </Space>
      <ProForm submitter={false}>
        <ProFormDateRangePicker name="dateRange" label="日期区间" noStyle />
      </ProForm>
    </Space>
  );
};
