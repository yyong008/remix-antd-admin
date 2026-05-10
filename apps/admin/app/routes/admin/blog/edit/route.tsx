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
import { PageContainer } from "~/components/page-container";
import { href, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useBlogById, useCreateBlog, useUpdateBlog } from "~/api-client/queries/blog/blog";
import { useBlogCategoryList } from "~/api-client/queries/blog/blog-category";
import { useBlogTagList } from "~/api-client/queries/blog/blog-tag";
import { QuillEditor } from "~/components/common/quill-editor";
import dayjs from "dayjs";

function isQuillBodyEmpty(html: string): boolean {
  if (!html) return true;
  const text = html.replace(/<[^>]*>/g, "").trim();
  return text.length === 0;
}

export function Route() {
  const { locale } = useParams();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const nav = useNavigate();

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
  const { data: existingBlog, isLoading: blogLoading } = useBlogById(id);

  const isLoading = catLoading || tagLoading || (isEditMode && blogLoading);

  const article = (existingBlog as any)?.data ?? existingBlog;

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

  const categoriesOptions = (categoryList?.list || []).map((c: any) => ({
    label: c.name,
    value: c.id,
  }));

  const tagsOptions = (tagList?.list || []).map((t: any) => ({
    label: t.name,
    value: t.id,
  }));

  const editorWrapStyle = {
    height: "min(60vh, 560px)" as const,
    minHeight: 300,
    flex: 1,
    width: "100%" as const,
  };

  const createBlogHandler = async (values: Record<string, unknown>) => {
    const result = (await createBlog.mutateAsync(values)) as {
      code?: number;
      message?: string;
      data?: { id?: string };
    };

    if (result.code !== 0) {
      message.error(result.message ?? "保存失败");
      return false;
    }
    message.success("保存成功");
    nav(href("/:locale?/admin/blog/result", { locale }), {
      state: { title: values.title, id: result.data?.id },
    });
    return true;
  };

  const updateBlogHandler = async (id: string, values: Record<string, unknown>) => {
    const result = (await updateBlog.mutateAsync({ id, ...values })) as {
      code?: number;
      message?: string;
    };

    if (result.code !== 0) {
      message.error(result.message ?? "更新失败");
      return false;
    }
    message.success("更新成功");
    return true;
  };

  const handleSubmit = async (values: Record<string, unknown>) => {
    if (isQuillBodyEmpty(content)) {
      message.warning("请先在下方编辑器中填写文章正文");
      return false;
    }

    const payload = {
      ...values,
      content,
      publishedAt: values.publishedAt
        ? new Date(values.publishedAt as string).toISOString()
        : new Date().toISOString(),
    };

    if (isEditMode && id) {
      return updateBlogHandler(id, payload);
    } else {
      return createBlogHandler(payload);
    }
  };

  return (
    <PageContainer>
      <Card
        loading={isLoading}
        title="文章正文"
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
            label="文章标题"
            name="title"
            rules={[{ required: true, message: "请输入标题" }]}
          >
            <Input placeholder="请输入标题" />
          </Form.Item>
          <Form.Item
            label="文章作者"
            name="author"
            rules={[{ required: true, message: "请输入作者" }]}
          >
            <Input placeholder="请输入作者" />
          </Form.Item>
          <Form.Item
            label="发布时间"
            name="publishedAt"
            rules={[{ required: true, message: "请选择发布时间" }]}
          >
            <DatePicker showTime style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="分类"
            name="categoryId"
            rules={[{ required: true, message: "请选择分类" }]}
          >
            <Select placeholder="请选择分类" options={categoriesOptions} />
          </Form.Item>
          <Form.Item label="标签" name="tagId" rules={[{ required: true, message: "请选择标签" }]}>
            <Select placeholder="请选择标签" options={tagsOptions} />
          </Form.Item>
          <Form.Item label="是否发布" name="isPublished" valuePropName="checked">
            <Switch checkedChildren="发布" unCheckedChildren="草稿" />
          </Form.Item>
          <Form.Item style={{ marginTop: 16 }}>
            <Space>
              <Button onClick={() => setOpen(false)}>取消</Button>
              <Button
                type="primary"
                loading={createBlog.isPending || updateBlog.isPending}
                onClick={() => {
                  form
                    .validateFields()
                    .then(async (values) => {
                      const result = await handleSubmit(values);
                      if (result) {
                        setOpen(false);
                      }
                    })
                    .catch((err) => {
                      console.log("Validation failed:", err);
                    });
                }}
              >
                {isEditMode ? "保存" : "发布"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </PageContainer>
  );
}
