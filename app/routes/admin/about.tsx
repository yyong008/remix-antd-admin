// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// components
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { Descriptions, Space, Tag } from "antd";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "about" }];
};

// remix:loader
export const loader: LoaderFunction = async () => {
  return json({
    dataSource: [],
  });
};

const BlankLink = ({ url = "", text }) => {
  const target = /^http(s)?:/.test(url)
    ? url
    : `https://www.npmjs.com/package/${url}`;
  return (
    <a href={target} target="_blank" rel="noreferrer">
      <Tag color="cyan">{text}</Tag>
    </a>
  );
};

const ProjectAbout = () => {
  const { pkg } = __APP_INFO__;
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };

  const getMajorVersion = (depName: DepType) => {
    return allDeps[depName].match(/\d+/)?.[0] || "";
  };

  type DepType = keyof typeof allDeps;

  const description = `
    ${pkg.name}是基于 @remix-run/react${getMajorVersion("@remix-run/react")}.x、
    Vite${getMajorVersion("vite")}.x、
    Ant-Design-Vue${getMajorVersion("antd")}.x 、
    TailwindCSS${getMajorVersion("tailwindcss")}.x 、
    prisma${getMajorVersion("prisma")}.x 、
    @prisma/client${getMajorVersion("@prisma/client")}.x 、
    TypeScript${getMajorVersion("typescript")}.x 开发，
    内置了动态路由、权限验证、菜单、数据库全栈管理工具
  `;
  return (
    <ProCard>
      <Descriptions title="关于">
        <Descriptions.Item>{description}</Descriptions.Item>
      </Descriptions>
    </ProCard>
  );
};

const ProjectInfo = () => {
  const { pkg, lastBuildTime } = __APP_INFO__;
  return (
    <ProCard>
      <Descriptions title="项目信息" column={2} bordered>
        <Descriptions.Item label="版本">
          <Tag color="processing">{pkg.version}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="最后编译时间">
          <Tag color="processing">{lastBuildTime}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="GitHub">
          <BlankLink url={pkg.repository.url} text="GitHub" />
        </Descriptions.Item>
        <Descriptions.Item label="预览地址">
          <BlankLink url={pkg.homepage} text="预览地址" />
        </Descriptions.Item>
      </Descriptions>
    </ProCard>
  );
};

const ProjectProductionDep = () => {
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

const ProjectDevelopmentDep = () => {
  const { pkg } = __APP_INFO__;
  return (
    <ProCard>
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

export default function SystemUserRoute() {
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
