import { useEffect, useState } from "react";
import { Button, Card, Drawer, Flex, Form, message, Space } from "antd";
import dayjs from "dayjs";
import { href, useNavigate, useParams } from "react-router";
import type { MetaFunction } from "react-router";

import { PageContainer } from "~/components/page-container";
import { QuillEditor } from "~/components/common/quill-editor";
import { useBlogById, useCreateBlog, useUpdateBlog } from "~/api-client/queries/blog/blog";
import { useBlogCategoryList } from "~/api-client/queries/blog/blog-category";
import { useBlogTagList } from "~/api-client/queries/blog/blog-tag";
import { m } from "~/paraglide/messages";

import { isQuillBodyEmpty } from "./build-blog-payload";
import { FormItems } from "./edit-blog/form-items";

export const meta: MetaFunction = () => [{ title: "Blog · edit" }];

export function Route() {
  const nav = useNavigate();
  const { locale, id } = useParams();
  const isEditMode = Boolean(id);

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [content, setContent] = useState("");

  const createBlog = useCreateBlog();
  const updateBlog = useUpdateBlog();
  const { data: categoryList, isLoading: catLoading } = useBlogCategoryList({
    page: 1,
    pageSize: 200,
  });
  const { data: tagList, isLoading: tagLoading } = useBlogTagList({
    page: 1,
    pageSize: 200,
  });
  const { data: existingBlog, isLoading: blogLoading, error } = useBlogById(id);

  const isLoading = catLoading || tagLoading || (isEditMode && blogLoading);

  const article =
    (
      existingBlog as {
        data?: {
          content?: string;
          title?: string;
          author?: string;
          publishedAt?: string;
          categoryId?: string;
          tagId?: string;
          isPublished?: boolean;
          id?: string;
        };
      } | null
    )?.data ??
    (existingBlog as {
      content?: string;
      title?: string;
      author?: string;
      publishedAt?: string;
      categoryId?: string;
      tagId?: string;
      isPublished?: boolean;
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
        publishedAt: article.publishedAt ? dayjs(article.publishedAt) : null,
        categoryId: article.categoryId,
        tagId: article.tagId,
        isPublished: article.isPublished ?? false,
      });
    }
  }, [article, form, isEditMode]);

  const editorWrapStyle = {
    height: "min(60vh, 560px)" as const,
    minHeight: 300,
    flex: 1,
    width: "100%" as const,
  };

  const handleSubmit = async (values: Record<string, unknown>) => {
    if (isQuillBodyEmpty(content)) {
      message.warning(m.blog_edit_content_required_warning());
      return false;
    }

    const publishedAt = values.publishedAt
      ? new Date(values.publishedAt as string).toISOString()
      : new Date().toISOString();

    try {
      if (isEditMode && id) {
        await updateBlog.mutateAsync({ id, ...values, content, publishedAt });
        message.success(m.blog_toast_updated());
        return true;
      } else {
        const result = (await createBlog.mutateAsync({
          ...values,
          content,
          publishedAt,
        })) as { data?: { id?: string } };
        message.success(m.blog_toast_created());
        nav(href("/:locale?/admin/blog/result", { locale }), {
          state: { title: values.title, id: result.data?.id },
        });
        return true;
      }
    } catch (e) {
      message.error(e instanceof Error ? e.message : m.blog_toast_update_failed());
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
            {m.blog_toast_load_failed({ message: (error as Error).message })}
          </div>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Card
        loading={isLoading}
        title={m.blog_edit_card_title()}
        extra={
          <Button type="primary" onClick={() => setOpen(true)}>
            {isEditMode ? m.blog_edit_open_meta_update() : m.blog_edit_open_meta_create()}
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
        title={isEditMode ? m.blog_edit_meta_title_update() : m.blog_edit_meta_title_create()}
        open={open}
        onClose={() => setOpen(false)}
        width={520}
        extra={
          <Space>
            <Button onClick={() => setOpen(false)}>{m.blog_edit_cancel_button()}</Button>
            <Button
              type="primary"
              loading={createBlog.isPending || updateBlog.isPending}
              onClick={() => form.submit()}
            >
              {isEditMode ? m.blog_edit_save_button() : m.blog_edit_publish_button()}
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
          <FormItems categoryList={categoryList} tagList={tagList} />
        </Form>
      </Drawer>
    </PageContainer>
  );
}

export default function Page() {
  return <Route />;
}
