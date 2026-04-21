import { Button, Card, Drawer, Form, message, DatePicker, Input, Select, Space } from "antd";
import { PageContainer } from "~/components/page-container";
import { QuillEditor } from "~/components/common/quill-editor";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useNewsById, useUpdateNews } from "~/api-client/queries/news";
import { useNewsCategoryList } from "~/api-client/queries/news-category";
import { buildNewsPayload, isQuillBodyEmpty } from "../build-news-payload";
import { categoriesForNewsSelect } from "../news-category-select";
import dayjs from "dayjs";

export function Route() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [content, setContent] = useState("");

  const { data: newsCategoryList, isLoading: catLoading } = useNewsCategoryList({
    page: 1,
    pageSize: 200,
  });
  const { data: newsData, isLoading: newsLoading, error } = useNewsById(id);
  const updateNews = useUpdateNews();

  const article = newsData as {
    id?: string;
    title?: string;
    author?: string;
    source?: string;
    content?: string;
    publishedAt?: string;
    newsId?: string;
  } | null;

  const isLoading = catLoading || newsLoading;

  useEffect(() => {
    if (article?.content != null) {
      setContent(article.content);
    }
  }, [article?.content]);

  useEffect(() => {
    if (article && open) {
      form.setFieldsValue({
        title: article.title,
        author: article.author,
        source: article.source,
        date: article.publishedAt ? dayjs(article.publishedAt) : null,
        newsId: article.newsId,
      });
    }
  }, [article, form, open]);

  const categoriesOptions = (() => {
    const ncs = newsCategoryList?.list || [];
    const pick = categoriesForNewsSelect(ncs, article?.newsId);
    return pick.map((c) => ({ label: c.name, value: c.id }));
  })();

  const handleFinish = async (values: Record<string, unknown>) => {
    if (isQuillBodyEmpty(content)) {
      message.warning("请先在下方编辑器中填写新闻正文");
      return false;
    }
    if (!id) {
      message.error("缺少新闻 ID");
      return false;
    }
    const payload = { id, ...buildNewsPayload(values, content) };
    const result = (await updateNews.mutateAsync(payload)) as {
      code?: number;
      message?: string;
    };
    if (result.code !== 0) {
      message.error(result.message ?? "更新失败");
      return false;
    }
    message.success(result.message ?? "更新成功");
    setOpen(false);
    return true;
  };

  if (error) {
    return (
      <PageContainer>
        <Card>
          <div style={{ textAlign: "center", paddingTop: 32, paddingBottom: 32, color: "#ef4444" }}>
            加载失败: {(error as Error).message}
          </div>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Card
        loading={isLoading}
        title="新闻正文"
        extra={
          article ? (
            <Button type="primary" onClick={() => setOpen(true)}>
              编辑元数据并保存
            </Button>
          ) : null
        }
      >
        {isLoading ? null : article ? (
          <div
            style={{
              display: "flex",
              height: Math.min(560, window.innerHeight * 0.6),
              minHeight: 300,
              flexDirection: "column",
              gap: 0,
            }}
          >
            <QuillEditor
              key={article.id ?? id}
              initContent={article.content ?? ""}
              content={content}
              setContent={setContent}
            />
          </div>
        ) : (
          <div
            style={{
              color: "var(--ant-color-text-secondary)",
              textAlign: "center",
              paddingTop: 32,
              paddingBottom: 32,
            }}
          >
            未找到新闻
          </div>
        )}
      </Card>

      <Drawer
        title="编辑元数据"
        open={open}
        onClose={() => setOpen(false)}
        width={520}
        extra={
          <Space>
            <Button onClick={() => setOpen(false)}>取消</Button>
            <Button type="primary" loading={updateNews.isPending} onClick={() => form.submit()}>
              保存
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="新闻标题"
            name="title"
            rules={[{ required: true, message: "请输入标题" }]}
          >
            <Input placeholder="请输入标题" />
          </Form.Item>
          <Form.Item
            label="新闻作者"
            name="author"
            rules={[{ required: true, message: "请输入作者" }]}
          >
            <Input placeholder="请输入作者" />
          </Form.Item>
          <Form.Item
            label="新闻来源"
            name="source"
            rules={[{ required: true, message: "请输入来源" }]}
          >
            <Input placeholder="请输入来源" />
          </Form.Item>
          <Form.Item
            label="新闻发布时间"
            name="date"
            rules={[{ required: true, message: "请选择发布时间" }]}
          >
            <DatePicker showTime style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="分类" name="newsId" rules={[{ required: true, message: "请选择分类" }]}>
            <Select placeholder="请选择分类" options={categoriesOptions} />
          </Form.Item>
        </Form>
      </Drawer>
    </PageContainer>
  );
}
