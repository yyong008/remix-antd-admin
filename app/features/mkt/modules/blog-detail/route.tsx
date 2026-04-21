import { BlogContent, BlogHeader } from "./components";
import { Layout } from "./layout";
import type { loader } from "./loader";
import { useLoaderData } from "react-router";
import { Flex, Typography } from "antd";
import { theme } from "antd";

const { Text } = Typography;

export function Route() {
  const _data = useLoaderData<typeof loader>() as { data?: any } | null;
  const blog = _data?.data;
  const { token } = theme.useToken();

  if (!blog) {
    return (
      <Layout>
        <Flex justify="center" style={{ color: token.colorTextTertiary }}>
          <Text type="secondary">暂无数据</Text>
        </Flex>
      </Layout>
    );
  }
  return (
    <Layout>
      <BlogHeader blog={blog} />
      <BlogContent content={blog.content} />
    </Layout>
  );
}
