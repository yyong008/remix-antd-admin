import { Space, Tag, Dropdown } from "antd";

import { DeleteAction } from "./DeleteAction";
import { UpdateLinkCategoryModal } from "./UpdateLinkCategoryModal";
import { MoreOutlined } from "@ant-design/icons";
import { useColorPrimary } from "~/hooks/useColorPrimary";
import { useTranslation } from "react-i18next";

export function createColumns({ refetch }: any) {
  const { colorPrimary } = useColorPrimary();
  const { t } = useTranslation("link");
  return [
    {
      dataIndex: "name",
      title: t("category.list.table.name"),
      render(_: any, record: any) {
        return (
          <Tag style={{ color: colorPrimary, borderColor: colorPrimary }}>
            {record?.name}
          </Tag>
        );
      },
    },
    {
      dataIndex: "description",
      title: t("category.list.table.description"),
    },
    {
      dataIndex: "op",
      title: t("category.list.table.action"),
      render(_: any, record: any) {
        return (
          <Space>
            <Dropdown
              menu={{
                items: [
                  {
                    label: (
                      <UpdateLinkCategoryModal
                        key="link-category-modal-modify"
                        record={record}
                        refetch={refetch}
                      />
                    ),
                    key: "edit",
                  },
                  {
                    label: (
                      <DeleteAction
                        record={record}
                        refetch={refetch}
                        title={t("action.delete")}
                      />
                    ),
                    key: "delete",
                  },
                ],
              }}
            >
              <MoreOutlined />
            </Dropdown>
          </Space>
        );
      },
    },
  ];
}
