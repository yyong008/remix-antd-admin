import { PageContainer } from "~/components/page-container";
import { Space } from "antd";
import { AdminAboutCard, AdminProjectInfoCard, AdminDependencyCard } from "~/components/about";
import { useAboutData } from "~/hooks";

export function Route() {
  const data = useAboutData();

  return (
    <PageContainer>
      <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
        <AdminAboutCard projectName={data.projectName} description={data.description} />
        <AdminProjectInfoCard
          version={data.version}
          lastBuildTime={data.lastBuildTime}
          repoUrl={data.repoUrl}
          repoLabel={data.repoLabel}
          homepage={data.homepage}
        />
        <AdminDependencyCard
          productionDeps={data.productionDeps}
          developmentDeps={data.developmentDeps}
        />
      </Space>
    </PageContainer>
  );
}
