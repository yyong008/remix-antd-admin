// components:vendor
import { GithubOutlined } from "@ant-design/icons";
import { DefaultFooter } from "@ant-design/pro-components";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${"By Magnesium"}`}
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
        {
          key: "Sqlite",
          title: "Sqlite",
          href: "https://www.sqlite.org/index.html",
          blankTarget: true,
        }
      ]}
    />
  );
};

export default Footer;
