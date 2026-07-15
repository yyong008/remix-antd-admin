import {
  Badge,
  Button,
  Dropdown,
  Empty,
  Flex,
  Modal,
  Space,
  Tabs,
  Typography,
  type MenuProps,
} from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";

import {
  useBlogCategoryList,
  useDeleteBlogCategory,
} from "~/api-client/queries/blog/blog-category";
import { useBlogTagList, useDeleteBlogTag } from "~/api-client/queries/blog/blog-tag";
import { m } from "~/paraglide/messages";

import { CreateBlogCategoryModal } from "../category/components/create-blog-category-modal";
import { CreateBlogTagModal } from "../tag/components/create-blog-tag-modal";
import { UpdateBlogCategoryModal } from "../category/components/update-blog-category-modal";
import { UpdateBlogTagModal } from "../tag/components/update-blog-tag-modal";

function CategoryActionsCell({
  cat,
  refetch,
}: {
  cat: { id: string; name?: string; description?: string | null; showOnClient?: boolean };
  refetch: () => void;
}) {
  const [editOpen, setEditOpen] = useState(false);
  const { mutateAsync: deleteCategory, isPending: isDeleting } = useDeleteBlogCategory();

  const handleDelete = () => {
    Modal.confirm({
      title: m.blog_action_confirm_delete_category(),
      okText: m.blog_category_submit_button(),
      cancelText: m.blog_edit_cancel_button(),
      async onOk() {
        try {
          await deleteCategory({ ids: [cat.id] });
          refetch();
          Modal.success({ title: m.blog_category_toast_deleted() });
        } catch (e) {
          Modal.error({
            title: e instanceof Error ? e.message : m.blog_category_toast_failed(),
          });
        }
      },
    });
  };

  const items: MenuProps["items"] = [
    { key: "edit", label: m.blog_action_edit(), onClick: () => setEditOpen(true) },
    { type: "divider" as const },
    {
      key: "delete",
      label: m.blog_action_delete(),
      danger: true,
      disabled: isDeleting,
      onClick: handleDelete,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button type="text" size="small" icon={<MoreOutlined />} />
      </Dropdown>
      <UpdateBlogCategoryModal
        record={cat}
        refetch={refetch}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
    </>
  );
}

function TagActionsCell({
  tag,
  refetch,
}: {
  tag: { id: string; name?: string; description?: string | null };
  refetch: () => void;
}) {
  const [editOpen, setEditOpen] = useState(false);
  const { mutateAsync: deleteTag, isPending: isDeleting } = useDeleteBlogTag();

  const handleDelete = () => {
    Modal.confirm({
      title: m.blog_action_confirm_delete_tag(),
      okText: m.blog_tag_submit_button(),
      cancelText: m.blog_edit_cancel_button(),
      async onOk() {
        try {
          await deleteTag({ ids: [tag.id] });
          refetch();
          Modal.success({ title: m.blog_tag_toast_deleted() });
        } catch (e) {
          Modal.error({
            title: e instanceof Error ? e.message : m.blog_tag_toast_failed(),
          });
        }
      },
    });
  };

  const items: MenuProps["items"] = [
    { key: "edit", label: m.blog_action_edit(), onClick: () => setEditOpen(true) },
    { type: "divider" as const },
    {
      key: "delete",
      label: m.blog_action_delete(),
      danger: true,
      disabled: isDeleting,
      onClick: handleDelete,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button type="text" size="small" icon={<MoreOutlined />} />
      </Dropdown>
      <UpdateBlogTagModal
        record={tag}
        refetch={refetch}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
    </>
  );
}

export function BlogSidebar({
  selectedCategoryId,
  onCategorySelect,
  selectedTagId,
  onTagSelect,
  categoryCounts,
  tagCounts,
}: {
  selectedCategoryId?: string;
  onCategorySelect: (id?: string) => void;
  selectedTagId?: string;
  onTagSelect: (id?: string) => void;
  categoryCounts?: Map<string, number>;
  tagCounts?: Map<string, number>;
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
      style={{ height: "100%" }}
      type="card"
      tabBarStyle={{ marginBottom: 0 }}
      items={[
        {
          key: "category",
          label: m.blog_list_sidebar_tab_category(),
          children: (
            <div style={{ height: "100%", overflowY: "auto", padding: "8px 4px" }}>
              <Flex justify="flex-end" style={{ marginBottom: 8 }}>
                <CreateBlogCategoryModal
                  refetch={refetchCategories}
                  trigger={
                    <Button type="primary" size="small">
                      {m.blog_list_sidebar_new_category()}
                    </Button>
                  }
                />
              </Flex>
              <Space orientation="vertical" size={4} style={{ width: "100%" }}>
                {catLoading ? (
                  <Flex justify="center" style={{ paddingBlock: 24 }}>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      {m.blog_list_loading()}
                    </Typography.Text>
                  </Flex>
                ) : categories.length === 0 ? (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={m.blog_list_empty_categories()}
                  />
                ) : (
                  categories.map((cat) => {
                    const selected = selectedCategoryId === String(cat.id);
                    const catWithShow = cat as {
                      id: string;
                      name: string;
                      showOnClient?: boolean;
                    };
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
                          type={selected ? "primary" : "link"}
                          style={{
                            flex: 1,
                            textAlign: "left",
                            fontWeight: selected ? 600 : 400,
                            padding: "4px 8px",
                            borderRadius: 6,
                          }}
                          onClick={() => onCategorySelect(selected ? undefined : String(cat.id))}
                        >
                          <Flex
                            gap={6}
                            align="center"
                            justify="space-between"
                            style={{ width: "100%" }}
                          >
                            <span
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                              }}
                            >
                              <span
                                style={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  backgroundColor: catWithShow.showOnClient ? "#52c41a" : "#d9d9d9",
                                  flexShrink: 0,
                                }}
                                title={
                                  catWithShow.showOnClient
                                    ? m.blog_list_visible_tip_visible()
                                    : m.blog_list_visible_tip_hidden()
                                }
                              />
                              {cat.name}
                            </span>
                            {categoryCounts && categoryCounts.get(String(cat.id)) ? (
                              <Badge
                                count={categoryCounts.get(String(cat.id))}
                                size="small"
                                style={{ fontSize: 10 }}
                              />
                            ) : null}
                          </Flex>
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
          label: m.blog_list_sidebar_tab_tag(),
          children: (
            <div style={{ height: "100%", overflowY: "auto", padding: "8px 4px" }}>
              <Flex justify="flex-end" style={{ marginBottom: 8 }}>
                <CreateBlogTagModal
                  refetch={refetchTags}
                  trigger={
                    <Button type="primary" size="small">
                      {m.blog_list_sidebar_new_tag()}
                    </Button>
                  }
                />
              </Flex>
              <Space orientation="vertical" size={4} style={{ width: "100%" }}>
                {tagLoading ? (
                  <Flex justify="center" style={{ paddingBlock: 24 }}>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      {m.blog_list_loading()}
                    </Typography.Text>
                  </Flex>
                ) : tags.length === 0 ? (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={m.blog_list_empty_tags()}
                  />
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
                          type={selected ? "primary" : "link"}
                          style={{
                            flex: 1,
                            textAlign: "left",
                            fontWeight: selected ? 600 : 400,
                            padding: "4px 8px",
                            borderRadius: 6,
                          }}
                          onClick={() => onTagSelect(selected ? undefined : String(tag.id))}
                        >
                          <Flex
                            gap={6}
                            align="center"
                            justify="space-between"
                            style={{ width: "100%" }}
                          >
                            <span
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {tag.name}
                            </span>
                            {tagCounts && tagCounts.get(String(tag.id)) ? (
                              <Badge
                                count={tagCounts.get(String(tag.id))}
                                size="small"
                                style={{ fontSize: 10 }}
                              />
                            ) : null}
                          </Flex>
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
