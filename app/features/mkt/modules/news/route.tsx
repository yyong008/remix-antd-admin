import { useState, useMemo } from "react";
import { Pagination, Skeleton, Row, Col, Card, Input } from "antd";
import { SearchOutlined, FileTextOutlined } from "@ant-design/icons";
import { isNewsCategoryVisible } from "~/features/admin/modules/news/news-category-select";
import { NewsItem } from "./components";
import { useNewsList } from "~/api-client/queries/news";
import { useNewsCategoryList } from "~/api-client/queries/news-category";

const { Search } = Input;
const PAGE_SIZE = 10;

export function Route() {
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const { data: newsData, isLoading: newsLoading } = useNewsList({
    category,
    page,
    pageSize: PAGE_SIZE,
  });
  const { data: categoryData, isLoading: categoryLoading } = useNewsCategoryList({ pageSize: 100 });

  const allCategories = categoryData?.list ?? [];
  const visibleCategories = useMemo(
    () => allCategories.filter((c: any) => isNewsCategoryVisible(c.visible)),
    [allCategories],
  );

  const allNews = newsData?.list ?? [];
  const total = newsData?.total ?? 0;

  const publishedNews = useMemo(() => allNews.filter((n: any) => n.status === 1), [allNews]);

  const visibleNews = useMemo(() => {
    return publishedNews.filter((n: any) => {
      const cat = allCategories.find((c: any) => c.id === n.newsId);
      return isNewsCategoryVisible(cat?.visible);
    });
  }, [publishedNews, allCategories]);

  const categoryNewsCount = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of visibleCategories) {
      counts[c.id] = 0;
    }
    for (const n of allNews) {
      if (counts[n.newsId] !== undefined) {
        counts[n.newsId]++;
      }
    }
    return counts;
  }, [visibleCategories, allNews]);

  const selectedCategory = visibleCategories.find((c: any) => c.id === category);

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
            新闻中心
          </h1>
          <p style={{ color: "var(--mkt-muted)" }}>
            {selectedCategory
              ? `${selectedCategory.name} · 共 ${total} 篇`
              : `全部新闻 · 共 ${total} 篇`}
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
              <Input
                placeholder="搜索新闻..."
                prefix={<SearchOutlined style={{ color: "var(--mkt-muted)" }} />}
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
                  color: "var(--mkt-muted)",
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
                      background: !category ? "rgba(255,255,255,0.2)" : "var(--mkt-bg)",
                      color: !category ? "white" : "var(--mkt-muted)",
                    }}
                  >
                    {total}
                  </span>
                </button>
                {categoryLoading ? (
                  <Skeleton active paragraph={false} />
                ) : (
                  visibleCategories.map((cat: any) => (
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
                          background:
                            category === cat.id ? "rgba(255,255,255,0.2)" : "var(--mkt-bg)",
                          color: category === cat.id ? "white" : "var(--mkt-muted)",
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
                      background: "var(--mkt-surface)",
                      border: "1px solid var(--mkt-border)",
                      borderRadius: "10px",
                    }}
                  >
                    <Skeleton active style={{ height: "100%" }} />
                  </div>
                ))}
              </div>
            ) : visibleNews.length <= 0 ? (
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
              <>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {visibleNews.map((n: any) => (
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
