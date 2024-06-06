import { Descriptions } from "antd";
import { ProCard } from "@ant-design/pro-components";

export const ProjectAbout = () => {
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
