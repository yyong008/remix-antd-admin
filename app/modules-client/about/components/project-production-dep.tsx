import { BlankLink } from "./blank-link";
import { Descriptions } from "antd";
import { ProCard } from "@ant-design/pro-components";

export const ProjectProductionDep = () => {
  const { pkg } = __APP_INFO__;
  return (
    <ProCard
      style={{
        backgroundColor: "rgba(0, 0, 0,0.05)",
        backdropFilter: "blur(4px)",
      }}
    >
      <Descriptions title="生产依赖" column={2} bordered>
        {Object.keys(pkg.dependencies)?.map((value: string, number: number) => {
          return (
            <Descriptions.Item label={value} key={number}>
              <BlankLink url={value} text={pkg.dependencies[value]} />
            </Descriptions.Item>
          );
        })}
      </Descriptions>
    </ProCard>
  );
};
