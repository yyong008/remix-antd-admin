import { useState, useMemo } from "react";
import { Pagination, Card, Skeleton, Row, Col } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { BlogItem } from "./components";
import { usePublicBlogList } from "~/api-client/queries/public-blog";
import { usePublicBlogCategoryList } from "~/api-client/queries/public-blog-category";

const PAGE_SIZE = 9;

export function Route() {
  const [categoryId, setCategoryId] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const { data: blogData, isLoading: blogLoading } = usePublicBlogList();
  const { data: categoryData, isLoading: categoryLoading } = usePublicBlogCategoryList();

  const allBlogs = blogData?.list ?? [];
  const categories = categoryData?.list ?? [];

  const publishedBlogs = useMemo(() => allBlogs.filter((b) => b.isPublished), [allBlogs]);

  const filteredBlogs = useMemo(() => {
    if (!categoryId) return publishedBlogs;
    return publishedBlogs.filter((b) => b.categoryId === categoryId);
  }, [publishedBlogs, categoryId]);

  const paginatedBlogs = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredBlogs.slice(start, start + PAGE_SIZE);
  }, [filteredBlogs, page]);

  const selectedCategory = categories.find((c) => c.id === categoryId);

  return (
    <div style={{ flex: 1, minHeight: "100%" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
        {/* Header */}
        <header style={{ marginBottom: "24px" }}>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            博客中心
          </h1>
          <p>
            {selectedCategory
              ? `${selectedCategory.name} · 共 ${filteredBlogs.length} 篇`
              : `全部博客 · 共 ${filteredBlogs.length} 篇`}
          </p>
        </header>

        {/* Category Filter Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "24px",
            padding: "16px",
            borderRadius: "12px",
          }}
        >
          <button
            onClick={() => {
              setCategoryId("");
              setPage(1);
            }}
            style={{
              padding: "8px 16px",
              borderRadius: "9999px",
              border: "none",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s",
              background: !categoryId ? "#6366f1" : "transparent",
              color: !categoryId ? "white" : "#111111",
              boxShadow: !categoryId ? "0 2px 8px rgba(102, 126, 234, 0.3)" : "none",
            }}
          >
            全部
          </button>
          {categoryLoading ? (
            <Skeleton active paragraph={false} />
          ) : (
            categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setCategoryId(cat.id);
                  setPage(1);
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  border: "none",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: categoryId === cat.id ? "#6366f1" : "transparent",
                  color: categoryId === cat.id ? "white" : "#111111",
                  boxShadow: categoryId === cat.id ? "0 2px 8px rgba(102, 126, 234, 0.3)" : "none",
                }}
              >
                {cat.name}
              </button>
            ))
          )}
        </div>

        {/* Blog List */}
        {blogLoading ? (
          <Row gutter={[16, 16]}>
            {[...Array(8)].map((_, i) => (
              <Col key={i} xs={24} sm={12} lg={6}>
                <Card style={{}}>
                  <Skeleton active paragraph={{ rows: 3 }} />
                </Card>
              </Col>
            ))}
          </Row>
        ) : filteredBlogs.length <= 0 ? (
          <Card
            style={{
              textAlign: "center",
            }}
            bodyStyle={{ padding: "48px" }}
          >
            <FileTextOutlined style={{ fontSize: "48px", marginBottom: "16px" }} />
            <p>暂无数据</p>
          </Card>
        ) : (
          <>
            <Row gutter={[16, 16]}>
              {paginatedBlogs.map((b) => (
                <Col key={b.id} xs={24} sm={12} lg={6}>
                  <Link to={`/blog/${b.id}`} style={{ textDecoration: "none" }}>
                    <BlogItem data={b} />
                  </Link>
                </Col>
              ))}
            </Row>
            {filteredBlogs.length > PAGE_SIZE && (
              <div style={{ marginTop: "32px", textAlign: "center" }}>
                <Pagination
                  current={page}
                  pageSize={PAGE_SIZE}
                  total={filteredBlogs.length}
                  onChange={(p) => setPage(p)}
                  showSizeChanger={false}
                  showQuickJumper={false}
                  showTotal={(total) => `共 ${total} 条`}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
