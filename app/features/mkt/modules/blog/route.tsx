import { useState } from "react";
import { Flex, Button, Card, theme } from "antd";
import { BlogItem } from "./components";
import { useBlogList } from "~/api-client/queries/blog";
import { useBlogCategoryList } from "~/api-client/queries/blog-category";

export function Route() {
  const [categoryId, setCategoryId] = useState<number>(0);
  const { data: blogData, isLoading: blogLoading } = useBlogList({ categoryId });
  const { data: categoryData } = useBlogCategoryList({ pageSize: 100 });
  const { token } = theme.useToken();

  const blogs = blogData?.data?.list ?? [];
  const categories = categoryData?.data?.list ?? [];

  return (
    <div
      style={{
        paddingTop: 140,
        width: "40vw",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Flex gap={8} style={{ marginBottom: 16, flexWrap: "wrap" }}>
        <Button type={!categoryId ? "primary" : "default"} onClick={() => setCategoryId(0)}>
          全部
        </Button>
        {categories.map((cat: any) => (
          <Button
            key={cat.id}
            type={categoryId === cat.id ? "primary" : "default"}
            onClick={() => setCategoryId(cat.id)}
          >
            {cat.name}
          </Button>
        ))}
      </Flex>

      {blogLoading ? (
        <Flex justify="center" style={{ color: token.colorTextTertiary }}>
          加载中...
        </Flex>
      ) : blogs.length <= 0 ? (
        <Flex justify="center" style={{ color: token.colorTextTertiary }}>
          暂无数据
        </Flex>
      ) : (
        <div>
          {blogs.map((b: any) => (
            <BlogItem data={b} key={b.id} />
          ))}
        </div>
      )}
    </div>
  );
}
