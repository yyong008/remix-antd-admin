import { Button, Dropdown, Empty, Flex, Space, Tabs, Typography, type MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";

import { useBlogCategoryList, useDeleteBlogCategory } from "~/api-client/queries/blog-category";
import { useBlogTagList, useDeleteBlogTag } from "~/api-client/queries/blog-tag";
import { CreateBlogCategoryModal } from "../../category/components/CreateBlogCategoryModal";
import { CreateBlogModal } from "../../tag/components/CreateBlogModal";
import { UpdateBlogCategoryModal } from "../../category/components/UpdateBlogCategoryModal";

function CategoryActionsCell({ cat, refetch }: { cat: any; refetch: () => void }) {
  const [editOpen, setEditOpen] = useState(false);
  const { mutateAsync: deleteCategory, isPending: isDeleting } = useDeleteBlogCategory();

  const handleDelete = () => {
    import("antd").then(({ Modal }) => {
      Modal.confirm({
        title: "确定要删除该分类吗？",
        okText: "确认",
        cancelText: "取消",
        async onOk() {
          try {
            await deleteCategory({ ids: [cat.id] });
            refetch();
            Modal.success({ title: "删除成功" });
          } catch (e) {
            Modal.error({ title: e instanceof Error ? e.message : "删除失败" });
          }
        },
      });
    });
  };

  const items: MenuProps["items"] = [
    { key: "edit", label: "编辑", onClick: () => setEditOpen(true) },
    { type: "divider" as const },
    { key: "delete", label: "删除", danger: true, disabled: isDeleting, onClick: handleDelete },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button type="text" size="small" icon={<MoreOutlined />} />
      </Dropdown>
      <UpdateBlogCategoryModal
        trigger={<></>}
        record={cat}
        refetch={refetch}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
    </>
  );
}

function TagActionsCell({ tag, refetch }: { tag: any; refetch: () => void }) {
  const { mutateAsync: deleteTag, isPending: isDeleting } = useDeleteBlogTag();

  const handleDelete = () => {
    import("antd").then(({ Modal }) => {
      Modal.confirm({
        title: "确定要删除该标签吗？",
        okText: "确认",
        cancelText: "取消",
        async onOk() {
          try {
            await deleteTag({ ids: [tag.id] });
            refetch();
            Modal.success({ title: "删除成功" });
          } catch (e) {
            Modal.error({ title: e instanceof Error ? e.message : "删除失败" });
          }
        },
      });
    });
  };

  const items: MenuProps["items"] = [
    { key: "delete", label: "删除", danger: true, disabled: isDeleting, onClick: handleDelete },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button type="text" size="small" icon={<MoreOutlined />} />
    </Dropdown>
  );
}

export function BlogSidebar({
  selectedCategoryId,
  onCategorySelect,
  selectedTagId,
  onTagSelect,
}: {
  selectedCategoryId?: string;
  onCategorySelect: (id?: string) => void;
  selectedTagId?: string;
  onTagSelect: (id?: string) => void;
}) {
  const [activeTab, setActiveTab] = useState("category");

  const {
    data: catPayload,
    refetch: refetchCategories,
    isLoading: catLoading,
  } = useBlogCategoryList({
    page: 1,
    pageSize: 500,
  });
  const {
    data: tagPayload,
    refetch: refetchTags,
    isLoading: tagLoading,
  } = useBlogTagList({
    page: 1,
    pageSize: 500,
  });

  const categories = useMemo(() => catPayload?.list ?? [], [catPayload?.list]);
  const tags = useMemo(() => tagPayload?.list ?? [], [tagPayload?.list]);

  return (
    <Tabs
      activeKey={activeTab}
      onChange={setActiveTab}
      tabPosition="left"
      style={{ height: "100%" }}
      tabBarStyle={{ marginBottom: 0 }}
      items={[
        {
          key: "category",
          label: "分类",
          children: (
            <div style={{ height: "100%", overflowY: "auto", padding: "8px 4px" }}>
              <Flex justify="flex-end" style={{ marginBottom: 8 }}>
                <CreateBlogCategoryModal
                  refetch={refetchCategories}
                  trigger={
                    <Button type="primary" size="small">
                      + 新建
                    </Button>
                  }
                />
              </Flex>
              <Space orientation="vertical" size={4} style={{ width: "100%" }}>
                {catLoading ? (
                  <Flex justify="center" style={{ paddingBlock: 24 }}>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      加载中...
                    </Typography.Text>
                  </Flex>
                ) : categories.length === 0 ? (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无分类" />
                ) : (
                  categories.map((cat) => {
                    const selected = selectedCategoryId === String(cat.id);
                    return (
                      <Flex
                        key={cat.id}
                        align="center"
                        justify="space-between"
                        gap={4}
                        wrap="nowrap"
                      >
                        <Button
                          block
                          size="small"
                          type={selected ? "primary" : "text"}
                          style={{ flex: 1, textAlign: "left", fontWeight: selected ? 600 : 400 }}
                          onClick={() => onCategorySelect(selected ? undefined : String(cat.id))}
                        >
                          {cat.name}
                        </Button>
                        <CategoryActionsCell cat={cat} refetch={refetchCategories} />
                      </Flex>
                    );
                  })
                )}
              </Space>
            </div>
          ),
        },
        {
          key: "tag",
          label: "标签",
          children: (
            <div style={{ height: "100%", overflowY: "auto", padding: "8px 4px" }}>
              <Flex justify="flex-end" style={{ marginBottom: 8 }}>
                <CreateBlogModal
                  refetch={refetchTags}
                  trigger={
                    <Button type="primary" size="small">
                      + 新建
                    </Button>
                  }
                />
              </Flex>
              <Space orientation="vertical" size={4} style={{ width: "100%" }}>
                {tagLoading ? (
                  <Flex justify="center" style={{ paddingBlock: 24 }}>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      加载中...
                    </Typography.Text>
                  </Flex>
                ) : tags.length === 0 ? (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无标签" />
                ) : (
                  tags.map((tag) => {
                    const selected = selectedTagId === String(tag.id);
                    return (
                      <Flex
                        key={tag.id}
                        align="center"
                        justify="space-between"
                        gap={4}
                        wrap="nowrap"
                      >
                        <Button
                          block
                          size="small"
                          type={selected ? "primary" : "text"}
                          style={{ flex: 1, textAlign: "left", fontWeight: selected ? 600 : 400 }}
                          onClick={() => onTagSelect(selected ? undefined : String(tag.id))}
                        >
                          {tag.name}
                        </Button>
                        <TagActionsCell tag={tag} refetch={refetchTags} />
                      </Flex>
                    );
                  })
                )}
              </Space>
            </div>
          ),
        },
      ]}
    />
  );
}
