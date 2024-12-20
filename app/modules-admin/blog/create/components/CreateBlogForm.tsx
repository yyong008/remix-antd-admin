import { Button, message } from "antd";
import { useNavigate, useParams } from "@remix-run/react";

import { DrawerForm } from "@ant-design/pro-components";
import { ModalFormItems } from "./ModalFormItems";
import { useCreateBlogMutation } from "~/apis-client/admin/blog/blog";
import { useMemo } from "react";
import { useReadBlogCategoryListQuery } from "@/apis-client/admin/blog/category";
import { useReadBlogTagListQuery } from "@/apis-client/admin/blog/tag";

export function CreateBlogForm() {
  const nav = useNavigate();
  const { lang } = useParams();
  const [createBlog, others] = useCreateBlogMutation();
  const { data: categories = {} } = useReadBlogCategoryListQuery({
    page: 1,
    pageSize: 1000,
  });
  const { data: tags = {} } = useReadBlogTagListQuery({
    page: 1,
    pageSize: 1000,
  });

  const categoriesOptions = useMemo(() => {
    return (
      categories?.data?.list?.map((c: any) => {
        return {
          label: c.name,
          value: c.id,
        };
      }) ?? []
    );
  }, [categories]);

  const tagsOptions = useMemo(() => {
    return (
      tags?.data?.list?.map((c: any) => {
        return {
          label: c.name,
          value: c.id,
        };
      }) ?? []
    );
  }, [tags]);

  const onFinish = async (v: any) => {
    const result: any = await createBlog(v);
    if (result.data?.code !== 0) {
      message.error(result.data?.message);
      return false;
    }

    message.success(result.data?.message);
    nav(`/${lang}/admin/blog/result`, {
      state: { title: v.title, id: result.data.data.id },
    });
    return true;
  };
  return (
    <DrawerForm
      title="创建博客"
      submitter={{
        resetButtonProps: {
          style: {
            display: "none",
          },
        },
      }}
      onFinish={onFinish}
      loading={others.isLoading}
      trigger={<Button type="primary">创建博客</Button>}
    >
      <ModalFormItems
        categoriesOptions={categoriesOptions}
        tagsOptions={tagsOptions}
      />
    </DrawerForm>
  );
}
