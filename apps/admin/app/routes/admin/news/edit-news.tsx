import { useEffect, useState } from "react";
import {
  Button,
  Card,
  DatePicker,
  Drawer,
  Flex,
  Form,
  Input,
  message,
  Select,
  Space,
  Switch,
} from "antd";
import dayjs from "dayjs";
import { href, useNavigate, useParams } from "react-router";
import type { MetaFunction } from "react-router";

import { PageContainer } from "~/components/page-container";
import { QuillEditor } from "~/components/common/quill-editor";
import { useCreateNews, useNewsById, useUpdateNews } from "~/api-client/queries/news/news";
import { useNewsCategoryList } from "~/api-client/queries/news/news-category";
import { m } from "~/paraglide/messages";

import { buildNewsPayload, isQuillBodyEmpty } from "./build-news-payload";
import { categoriesForNewsSelect } from "./news-category-select";

export const meta: MetaFunction = () => [{ title: "News · edit" }];

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
  const { data: existingNews, isLoading: newsLoading, error } = useNewsById(id);

  const isLoading = isEditMode ? catLoading || newsLoading : catLoading;

  const article =
    (
      existingNews as {
        data?: {
          content?: string;
          title?: string;
          author?: string;
          source?: string;
          publishedAt?: string;
          newsId?: string;
          status?: number;
          id?: string;
        };
      } | null
    )?.data ??
    (existingNews as {
      content?: string;
      title?: string;
      author?: string;
      source?: string;
      publishedAt?: string;
      newsId?: string;
      status?: number;
      id?: string;
    } | null) ??
    null;

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
        ...(isEditMode ? {} : { status: article.status === 1 }),
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
      message.warning(m.news_edit_content_required_warning());
      return false;
    }

    try {
      if (isEditMode && id) {
        const payload = { id, ...buildNewsPayload(values, content) };
        await updateNews.mutateAsync(payload);
        message.success(m.news_toast_updated());
        return true;
      } else {
        const status = values.status ? 1 : 0;
        const { status: _status, ...restValues } = values;
        const result = (await createNews.mutateAsync({
          ...buildNewsPayload(restValues, content),
          status,
        })) as { data?: { id?: string } };
        message.success(m.news_toast_created());
        nav(href("/:locale?/admin/news/result", { locale }), {
          state: { title: values.title, id: result.data?.id },
        });
        return true;
      }
    } catch (e) {
      message.error(e instanceof Error ? e.message : m.news_toast_update_failed());
      return false;
    }
  };

  if (isEditMode && error && !isLoading) {
    return (
      <PageContainer>
        <Card>
          <div
            style={{
              textAlign: "center",
              paddingTop: 32,
              paddingBottom: 32,
              color: "#ef4444",
            }}
          >
            {m.news_toast_load_failed({ message: (error as Error).message })}
          </div>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Card
        loading={isLoading}
        title={m.news_edit_card_title()}
        extra={
          <Button type="primary" onClick={() => setOpen(true)}>
            {isEditMode ? m.news_edit_open_meta_update() : m.news_edit_open_meta_create()}
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
        title={isEditMode ? m.news_edit_meta_title_update() : m.news_edit_meta_title_create()}
        open={open}
        onClose={() => setOpen(false)}
        width={520}
        styles={{ body: { overflow: "hidden" } }}
        extra={
          <Space>
            <Button onClick={() => setOpen(false)}>{m.news_edit_cancel_button()}</Button>
            <Button
              type="primary"
              loading={createNews.isPending || updateNews.isPending}
              onClick={() => form.submit()}
            >
              {isEditMode ? m.news_edit_save_button() : m.news_edit_publish_button()}
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
            label={m.news_edit_field_title()}
            name="title"
            rules={[{ required: true, message: m.news_edit_required_title() }]}
          >
            <Input placeholder={m.news_edit_title_placeholder()} />
          </Form.Item>
          <Form.Item
            label={m.news_edit_field_author()}
            name="author"
            rules={[{ required: true, message: m.news_edit_required_author() }]}
          >
            <Input placeholder={m.news_edit_author_placeholder()} />
          </Form.Item>
          <Form.Item
            label={m.news_edit_field_source()}
            name="source"
            rules={[{ required: true, message: m.news_edit_required_source() }]}
          >
            <Input placeholder={m.news_edit_source_placeholder()} />
          </Form.Item>
          <Form.Item
            label={m.news_edit_field_published_at()}
            name="date"
            rules={[{ required: true, message: m.news_edit_required_published_at() }]}
          >
            <DatePicker showTime style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label={m.news_edit_field_category()}
            name="newsId"
            rules={[{ required: true, message: m.news_edit_required_category() }]}
          >
            <Select placeholder={m.news_edit_category_placeholder()} options={categoriesOptions} />
          </Form.Item>
          {!isEditMode && (
            <Form.Item
              label={m.news_edit_field_immediate_publish()}
              name="status"
              valuePropName="checked"
              extra={m.news_edit_immediate_publish_help()}
            >
              <Switch
                checkedChildren={m.news_edit_publish_immediate_yes()}
                unCheckedChildren={m.news_edit_publish_immediate_no()}
              />
            </Form.Item>
          )}
        </Form>
      </Drawer>
    </PageContainer>
  );
}

export default function Page() {
  return <Route />;
}
