import { BlankLink } from "./blank-link";
import { Descriptions } from "antd";
import { ProCard } from "@ant-design/pro-components";

export const ProjectDevelopmentDep = () => {
  const { pkg } = __APP_INFO__;
  return (
    <ProCard
      style={{
        backgroundColor: "rgba(0, 0, 0,0.05)",
        backdropFilter: "blur(4px)",
      }}
    >
      <Descriptions title="开发依赖" column={2} bordered>
        {Object.keys(pkg.devDependencies)?.map(
          (value: string, number: number) => {
            return (
              <Descriptions.Item label={value} key={number}>
                <BlankLink url={value} text={pkg.devDependencies[value]} />
              </Descriptions.Item>
            );
          },
        )}
      </Descriptions>
    </ProCard>
  );
};
