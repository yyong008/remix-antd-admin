import {
  Button,
  Card,
  Drawer,
  Flex,
  Form,
  message,
  DatePicker,
  Input,
  Select,
  Space,
  Switch,
} from "antd";
import { PageContainer } from "~/components/page-container";
import { href, useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { useCreateNews, useNewsById, useUpdateNews } from "~/api-client/queries/news/news";
import { useNewsCategoryList } from "~/api-client/queries/news/news-category";
import { QuillEditor } from "~/components/common/quill-editor";
import { buildNewsPayload, isQuillBodyEmpty } from "../build-news-payload";
import { categoriesForNewsSelect } from "../news-category-select";
import dayjs from "dayjs";

export function Route() {
  const nav = useNavigate();
  const { locale, id } = useParams();
  const isEditMode = Boolean(id);

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [content, setContent] = useState("");

  const createNews = useCreateNews();
  const updateNews = useUpdateNews();
  const { data: newsCategoryList, isLoading: catLoading } = useNewsCategoryList({
    page: 1,
    pageSize: 200,
  });
  const { data: existingNews, isLoading: newsLoading } = useNewsById(id);

  const isLoading = isEditMode ? catLoading || newsLoading : catLoading;

  const article = (existingNews as any)?.data ?? existingNews;

  useEffect(() => {
    if (article?.content != null) {
      setContent(article.content);
    }
  }, [article?.content]);

  useEffect(() => {
    if (isEditMode && article) {
      form.setFieldsValue({
        title: article.title,
        author: article.author,
        source: article.source,
        date: article.publishedAt ? dayjs(article.publishedAt) : null,
        newsId: article.newsId,
        status: article.status === 1,
      });
    }
  }, [article, form, isEditMode]);

  const categoriesOptions = (() => {
    const ncs = newsCategoryList?.list || [];
    const pick = categoriesForNewsSelect(ncs, article?.newsId);
    return pick.map((c) => ({ label: c.name, value: c.id }));
  })();

  const editorWrapStyle = {
    height: "min(60vh, 560px)" as const,
    minHeight: 300,
    flex: 1,
    width: "100%" as const,
  };

  const handleSubmit = async (values: Record<string, unknown>) => {
    if (isQuillBodyEmpty(content)) {
      message.warning("请先在下方编辑器中填写新闻正文");
      return false;
    }

    const status = values.status ? 1 : 0;
    const { status: _status, ...restValues } = values;

    if (isEditMode && id) {
      const payload = { id, ...buildNewsPayload(restValues, content), status };
      const result = (await updateNews.mutateAsync(payload)) as { code?: number; message?: string };
      if (result.code !== 0) {
        message.error(result.message ?? "更新失败");
        return false;
      }
      message.success("更新成功");
      return true;
    } else {
      const result = (await createNews.mutateAsync(buildNewsPayload(restValues, content))) as {
        code?: number;
        message?: string;
        data?: { id?: string };
      };
      if (result.code !== 0) {
        message.error(result.message ?? "创建失败");
        return false;
      }
      message.success("发布成功");
      nav(href("/:locale?/admin/news/result", { locale }), {
        state: { title: values.title, id: result.data?.id },
      });
      return true;
    }
  };

  return (
    <PageContainer>
      <Card
        loading={isLoading}
        title="新闻正文"
        extra={
          <Button type="primary" onClick={() => setOpen(true)}>
            {isEditMode ? "编辑元数据并保存" : "填写元数据并发布"}
          </Button>
        }
      >
        {isEditMode && article ? (
          <Flex vertical gap={0} style={editorWrapStyle}>
            <QuillEditor
              key={article.id ?? id}
              initContent={article.content ?? ""}
              content={content}
              setContent={setContent}
            />
          </Flex>
        ) : (
          <Flex vertical gap={0} style={editorWrapStyle}>
            <QuillEditor initContent="" content={content} setContent={setContent} />
          </Flex>
        )}
      </Card>

      <Drawer
        title={isEditMode ? "编辑元数据" : "填写元数据"}
        open={open}
        onClose={() => setOpen(false)}
        width={520}
        styles={{ body: { overflow: "hidden" } }}
        extra={
          <Space>
            <Button onClick={() => setOpen(false)}>取消</Button>
            <Button
              type="primary"
              loading={createNews.isPending || updateNews.isPending}
              onClick={() => form.submit()}
            >
              {isEditMode ? "保存" : "发布"}
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={async (values) => {
            const result = await handleSubmit(values);
            if (result) {
              setOpen(false);
            }
          }}
        >
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
          <Form.Item
            label="立即发布"
            name="status"
            valuePropName="checked"
            extra="关闭后新闻将不会在前台显示"
          >
            <Switch checkedChildren="发布" unCheckedChildren="草稿" />
          </Form.Item>
        </Form>
      </Drawer>
    </PageContainer>
  );
}
