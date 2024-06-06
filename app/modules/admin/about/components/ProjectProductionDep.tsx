import { BlankLink } from "./BlankLink";
import { Descriptions } from "antd";
import { ProCard } from "@ant-design/pro-components";

export const ProjectProductionDep = () => {
  const { pkg } = __APP_INFO__;
  return (
    <ProCard>
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
