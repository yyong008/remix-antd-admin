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
          href: "",
          blankTarget: true,
        },
        {
          key: "Remix",
          title: "Remix",
          href: "",
          blankTarget: true,
        },

        {
          key: "Ant Design",
          title: "Ant Design",
          href: "",
          blankTarget: true,
        },
        {
          key: "Mongodb",
          title: "Mongodb",
          href: "",
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
