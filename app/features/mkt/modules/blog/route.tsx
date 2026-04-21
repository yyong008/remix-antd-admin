import { useState, useMemo } from "react";
import { Card, Skeleton, Row, Col } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { BlogItem } from "./components";
import { usePublicBlogList } from "~/api-client/queries/public-blog";
import { usePublicBlogCategoryList } from "~/api-client/queries/public-blog-category";

export function Route() {
  const [categoryId, setCategoryId] = useState<string>("");
  const { data: blogData, isLoading: blogLoading } = usePublicBlogList();
  const { data: categoryData, isLoading: categoryLoading } = usePublicBlogCategoryList();

  const allBlogs = blogData?.list ?? [];
  const categories = categoryData?.list ?? [];

  const publishedBlogs = useMemo(() => allBlogs, [allBlogs]);

  const filteredBlogs = useMemo(() => {
    if (!categoryId) return publishedBlogs;
    return publishedBlogs.filter((b) => b.categoryId === categoryId);
  }, [publishedBlogs, categoryId]);

  const categoryBlogCount = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const b of publishedBlogs) {
      counts[b.categoryId] = (counts[b.categoryId] ?? 0) + 1;
    }
    return counts;
  }, [publishedBlogs]);

  const selectedCategory = categories.find((c) => c.id === categoryId);

  const getCategoryBtnStyle = (isActive: boolean): React.CSSProperties => ({
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: 500,
    transition: "all 0.2s",
    border: "none",
    cursor: "pointer",
    ...(isActive
      ? {
          background: "var(--mkt-accent)",
          color: "white",
          boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
        }
      : { color: "var(--mkt-text)", background: "transparent" }),
  });

  return (
    <div style={{ flex: 1, background: "var(--mkt-bg)", minHeight: "100%" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
        <header style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: 700,
              color: "var(--mkt-text)",
              marginBottom: "8px",
            }}
          >
            博客中心
          </h1>
          <p style={{ color: "var(--mkt-muted)" }}>
            {selectedCategory
              ? `${selectedCategory.name} · 共 ${filteredBlogs.length} 篇`
              : `全部博客 · 共 ${filteredBlogs.length} 篇`}
          </p>
        </header>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={6}>
            <Card
              style={{
                position: "sticky",
                top: "16px",
                background: "var(--mkt-surface)",
                border: "1px solid var(--mkt-border)",
              }}
              bodyStyle={{ padding: "20px" }}
            >
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--mkt-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "12px",
                }}
              >
                分类
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <button onClick={() => setCategoryId("")} style={getCategoryBtnStyle(!categoryId)}>
                  <span>全部</span>
                  <span
                    style={{
                      fontSize: "12px",
                      padding: "2px 8px",
                      borderRadius: "9999px",
                      background: !categoryId ? "rgba(255,255,255,0.2)" : "var(--mkt-bg)",
                      color: !categoryId ? "white" : "var(--mkt-muted)",
                    }}
                  >
                    {filteredBlogs.length}
                  </span>
                </button>
                {categoryLoading ? (
                  <Skeleton active paragraph={false} />
                ) : (
                  categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategoryId(cat.id)}
                      style={getCategoryBtnStyle(categoryId === cat.id)}
                    >
                      <span
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {cat.name}
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          padding: "2px 8px",
                          borderRadius: "9999px",
                          background:
                            categoryId === cat.id ? "rgba(255,255,255,0.2)" : "var(--mkt-bg)",
                          color: categoryId === cat.id ? "white" : "var(--mkt-muted)",
                        }}
                      >
                        {categoryBlogCount[cat.id] ?? 0}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={18}>
            {blogLoading ? (
              <Row gutter={[16, 16]}>
                {[...Array(6)].map((_, i) => (
                  <Col key={i} xs={24} sm={12} lg={8}>
                    <Card
                      style={{
                        background: "var(--mkt-surface)",
                        border: "1px solid var(--mkt-border)",
                      }}
                    >
                      <Skeleton active paragraph={{ rows: 3 }} />
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : filteredBlogs.length <= 0 ? (
              <Card
                style={{
                  background: "var(--mkt-surface)",
                  border: "1px solid var(--mkt-border)",
                  textAlign: "center",
                }}
                bodyStyle={{ padding: "48px" }}
              >
                <FileTextOutlined
                  style={{ fontSize: "48px", color: "var(--mkt-muted)", marginBottom: "16px" }}
                />
                <p style={{ color: "var(--mkt-muted)" }}>暂无数据</p>
              </Card>
            ) : (
              <Row gutter={[16, 16]}>
                {filteredBlogs.map((b) => (
                  <Col key={b.id} xs={24} sm={12} lg={8}>
                    <Link to={`/blog/${b.id}`} style={{ textDecoration: "none" }}>
                      <BlogItem data={b} />
                    </Link>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}
