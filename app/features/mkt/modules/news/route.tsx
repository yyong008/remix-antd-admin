import { useState, useMemo } from "react";
import { Pagination, Skeleton, Row, Col, Card, Input } from "antd";
import { SearchOutlined, FileTextOutlined } from "@ant-design/icons";
import { NewsItem } from "./components";
import { usePublicNewsList } from "~/api-client/queries/public-news";
import { usePublicNewsCategoryList } from "~/api-client/queries/public-news-category";

const PAGE_SIZE = 10;

export function Route() {
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const { data: newsData, isLoading: newsLoading } = usePublicNewsList({
    page,
    pageSize: PAGE_SIZE,
  });
  const { data: categoryData, isLoading: categoryLoading } = usePublicNewsCategoryList();

  // Public API already filters: status=1, visible category=true
  const categories = categoryData?.list ?? [];
  const allNews = newsData?.list ?? [];
  const total = newsData?.total ?? 0;

  // Client-side category filter
  const filteredNews = useMemo(() => {
    if (!category) return allNews;
    return allNews.filter((n: any) => n.newsId === category);
  }, [allNews, category]);

  const categoryNewsCount = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of categories) {
      counts[c.id] = 0;
    }
    for (const n of allNews) {
      if (counts[n.newsId] !== undefined) {
        counts[n.newsId]++;
      }
    }
    return counts;
  }, [categories, allNews]);

  const selectedCategory = categories.find((c: any) => c.id === category);

  const getCategoryBtnStyle = (isActive: boolean): React.CSSProperties => ({
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: 500,
    transition: "all 0.2s",
    ...(isActive
      ? {
          background: "#6366f1",
          color: "white",
          boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
        }
      : { background: "transparent" }),
  });

  return (
    <div style={{ flex: 1, minHeight: "100%" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
        <header style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            新闻中心
          </h1>
          <p>
            {selectedCategory
              ? `${selectedCategory.name} · 共 ${filteredNews.length} 篇`
              : `全部新闻 · 共 ${total} 篇`}
          </p>
        </header>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={6}>
            <Card
              style={{
                position: "sticky",
                top: "16px",
              }}
              bodyStyle={{ padding: "20px" }}
            >
              <Input
                placeholder="搜索新闻..."
                prefix={<SearchOutlined />}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                allowClear
                style={{ marginBottom: "16px" }}
              />
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "12px",
                }}
              >
                分类
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <button
                  onClick={() => {
                    setCategory("");
                    setPage(1);
                  }}
                  style={getCategoryBtnStyle(!category)}
                >
                  <span>全部</span>
                  <span
                    style={{
                      fontSize: "12px",
                      padding: "2px 8px",
                      borderRadius: "9999px",
                      color: !category ? "white" : "#111111",
                    }}
                  >
                    {total}
                  </span>
                </button>
                {categoryLoading ? (
                  <Skeleton active paragraph={false} />
                ) : (
                  categories.map((cat: any) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setCategory(cat.id);
                        setPage(1);
                      }}
                      style={getCategoryBtnStyle(category === cat.id)}
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
                        }}
                      >
                        {categoryNewsCount[cat.id] ?? 0}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={18}>
            {newsLoading ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: "72px",
                      borderRadius: "10px",
                    }}
                  >
                    <Skeleton active style={{ height: "100%" }} />
                  </div>
                ))}
              </div>
            ) : filteredNews.length <= 0 ? (
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
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {filteredNews.map((n: any) => (
                    <NewsItem key={n.id} data={n} categoryName={selectedCategory?.name} />
                  ))}
                </div>
                {total > PAGE_SIZE && (
                  <div style={{ marginTop: "32px", textAlign: "center" }}>
                    <Pagination
                      current={page}
                      pageSize={PAGE_SIZE}
                      total={total}
                      onChange={(p) => setPage(p)}
                      showSizeChanger={false}
                      showQuickJumper={false}
                      showTotal={(total) => `共 ${total} 条`}
                    />
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}
