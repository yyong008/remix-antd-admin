import { PageContainer } from "@ant-design/pro-components";
import { ProjectAbout } from "./components/ProjectAbout";
import { ProjectDevelopmentDep } from "./components/ProjectDevelopmentDep";
import { ProjectInfo } from "./components/ProjectInfo";
import { ProjectProductionDep } from "./components/ProjectProductionDep";
import { Space } from "antd";

export function Component() {
  return (
    <PageContainer>
      <Space direction="vertical">
        <ProjectAbout />
        <ProjectInfo />
        <ProjectProductionDep />
        <ProjectDevelopmentDep />
      </Space>
    </PageContainer>
  );
}
