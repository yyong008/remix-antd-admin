import { Button, Dropdown, type MenuProps } from "antd";
import { PlusOutlined, FileTextOutlined, TagOutlined, FolderOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CreateBlogForm } from "../../create/components/CreateBlogForm";
import { CreateBlogCategoryModal } from "../../category/components/CreateBlogCategoryModal";
import { CreateBlogModal } from "../../tag/components/CreateBlogModal";

export function CreateBlogMenu({
  onCategoryCreated,
  onTagCreated,
}: {
  onCategoryCreated?: () => void;
  onTagCreated?: () => void;
}) {
  const [blogOpen, setBlogOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [tagOpen, setTagOpen] = useState(false);

  const items: MenuProps["items"] = [
    {
      key: "article",
      label: "文章",
      icon: <FileTextOutlined />,
      onClick: () => setBlogOpen(true),
    },
    {
      key: "category",
      label: "分类",
      icon: <FolderOutlined />,
      onClick: () => setCategoryOpen(true),
    },
    {
      key: "tag",
      label: "标签",
      icon: <TagOutlined />,
      onClick: () => setTagOpen(true),
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button type="primary" icon={<PlusOutlined />}>
          新建
        </Button>
      </Dropdown>
      <CreateBlogForm content="" open={blogOpen} setOpen={setBlogOpen} />
      <CreateBlogCategoryModal
        open={categoryOpen}
        setOpen={setCategoryOpen}
        refetch={onCategoryCreated}
      />
      <CreateBlogModal open={tagOpen} setOpen={setTagOpen} refetch={onTagCreated} />
    </>
  );
}
