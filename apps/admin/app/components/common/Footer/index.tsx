import { GithubOutlined } from "@ant-design/icons";
import { Button, Flex, Layout, Space, theme } from "antd";

const { Footer: LayoutFooter } = Layout;

export const Footer: React.FC = () => {
  const { token } = theme.useToken();
  const currentYear = new Date().getFullYear();

  const links = [
    {
      key: "github",
      title: <GithubOutlined />,
      href: "https://github.com/yyong008/remix-antd-admin",
      blankTarget: true,
    },
    {
      key: "React Router",
      title: "React Router",
      href: "https://reactrouter.com/",
      blankTarget: true,
    },
    {
      key: "Ant Design",
      title: "Ant Design",
      href: "https://ant.design/index-cn",
      blankTarget: true,
    },
  ];

  return (
    <LayoutFooter
      data-testid="default-footer"
      style={{
        background: "transparent",
        padding: "16px 24px",
        color: token.colorTextSecondary,
      }}
    >
      <Flex justify="space-between" align="center" wrap="wrap" gap={8}>
        <span>{`${currentYear} ${"By Walle-"}`}</span>
        <Space
          size="middle"
          separator={<span style={{ color: token.colorTextQuaternary }}>|</span>}
        >
          {links.map((link) => (
            <Button
              key={link.key}
              type="link"
              href={link.href}
              target={link.blankTarget ? "_blank" : undefined}
              rel={link.blankTarget ? "noopener noreferrer" : undefined}
              style={{ padding: 0, height: "auto", color: "inherit" }}
            >
              {link.title}
            </Button>
          ))}
        </Space>
      </Flex>
    </LayoutFooter>
  );
};
