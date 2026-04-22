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
import { PageContainer } from "@/components/page-container";
import { href, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useCreateBlog } from "~/api-client/queries/blog";
import { useBlogCategoryList } from "~/api-client/queries/blog-category";
import { useBlogTagList } from "~/api-client/queries/blog-tag";
import { QuillEditor } from "@/components/common/quill-editor";
import { useUserSessionQuery } from "~/api-client/queries/session";

function isQuillBodyEmpty(html: string): boolean {
  if (!html) return true;
  const text = html.replace(/<[^>]*>/g, "").trim();
  return text.length === 0;
}

export function Route() {
  const nav = useNavigate();
  const { locale } = useParams();

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [content, setContent] = useState("");

  const { data: session } = useUserSessionQuery();
  const createBlog = useCreateBlog();
  const { data: categoryList, isLoading: catLoading } = useBlogCategoryList({
    page: 1,
    pageSize: 200,
  });
  const { data: tagList, isLoading: tagLoading } = useBlogTagList({
    page: 1,
    pageSize: 200,
  });

  const isLoading = catLoading || tagLoading;

  // Set default author from current user
  useEffect(() => {
    if (session?.user && form) {
      form.setFieldsValue({ author: session.user.name });
    }
  }, [session?.user, form]);

  const categoriesOptions = (categoryList?.list || []).map((c: any) => ({
    label: c.name,
    value: c.id,
  }));

  const tagsOptions = (tagList?.list || []).map((t: any) => ({
    label: t.name,
    value: t.id,
  }));

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

    return createBlogHandler(payload);
  };

  return (
    <PageContainer>
      <Card
        loading={isLoading}
        title="文章正文"
        extra={
          <Button type="primary" onClick={() => setOpen(true)}>
            编辑元数据
          </Button>
        }
      >
        <Flex
          vertical
          gap={0}
          style={{
            height: "min(60vh, 560px)",
            minHeight: 300,
            flex: 1,
            width: "100%",
          }}
        >
          <QuillEditor initContent="" content={content} setContent={setContent} />
        </Flex>
      </Card>

      <Drawer
        title="编辑元数据"
        open={open}
        onClose={() => setOpen(false)}
        width={520}
        footer={
          <Space style={{ width: "100%", justifyContent: "flex-end" }}>
            <Button onClick={() => setOpen(false)}>取消</Button>
            <Button
              type="primary"
              loading={createBlog.isPending}
              onClick={() => {
                form.submit();
              }}
            >
              保存
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
          <Form.Item
            label="是否发布"
            name="isPublished"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch checkedChildren="发布" unCheckedChildren="草稿" />
          </Form.Item>
        </Form>
      </Drawer>
    </PageContainer>
  );
}
