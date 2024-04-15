// components:vendor
import * as _icons from "@ant-design/icons";

import { DefaultFooter } from "@ant-design/pro-components";

const { GithubOutlined } = _icons;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      data-testid="default-footer"
      copyright={`${currentYear} ${"By Magnesium-"}`}
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

export default Footer;
