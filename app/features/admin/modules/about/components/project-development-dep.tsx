import { BlankLink } from "./blank-link";
import { Card, Descriptions } from "antd";

export const ProjectDevelopmentDep = () => {
  const { pkg } = __APP_INFO__;
  return (
    <Card>
      <Descriptions title="开发依赖" column={2} bordered>
        {Object.keys(pkg.devDependencies)?.map((value: string, number: number) => {
          return (
            <Descriptions.Item label={value} key={number}>
              <BlankLink url={value} text={pkg.devDependencies[value]} />
            </Descriptions.Item>
          );
        })}
      </Descriptions>
    </Card>
  );
};
