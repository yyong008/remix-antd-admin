import * as ic from "@ant-design/icons";

import { DefaultFooter } from "@ant-design/pro-components";

const { GithubOutlined } = ic;

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      data-testid="default-footer"
      copyright={`${currentYear} ${"By Yong-"}`}
      links={[
        {
          key: "github",
          title: <GithubOutlined />,
          href: "https://github.com/yyong008/remix-antd-admin",
          blankTarget: true,
        },
        {
          key: "Remix",
          title: "Remix",
          href: "https://remix.run/",
          blankTarget: true,
        },

        {
          key: "Ant Design",
          title: "Ant Design",
          href: "https://ant.design/index-cn",
          blankTarget: true,
        },
      ]}
    />
  );
};
