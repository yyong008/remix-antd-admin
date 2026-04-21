import dayjs from "dayjs";
import { Flex, Typography } from "antd";

const { Text } = Typography;

type BlogHeaderProps = {
  blog: {
    title: string;
    author: string;
    source: string;
    publishedAt: string;
  };
};

export function BlogHeader({ blog }: BlogHeaderProps) {
  return (
    <Flex vertical style={{ paddingTop: 140, width: "40vw", height: "80vh" }}>
      <Text style={{ fontSize: 30 }}>{blog.title}</Text>
      <Flex style={{ marginTop: 10 }} gap={10}>
        <Text type="secondary" style={{ fontSize: 14 }}>
          作者：{blog.author}
        </Text>
        <Text type="secondary" style={{ fontSize: 14 }}>
          来源：{blog.source}
        </Text>
        <Text type="secondary" style={{ fontSize: 14 }}>
          发布时间：{dayjs(blog.publishedAt).format("YYYY-MM-DD")}
        </Text>
      </Flex>
    </Flex>
  );
}
