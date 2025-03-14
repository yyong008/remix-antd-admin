import { Space, Tag } from "antd";

import { Link } from "react-router";
import { LinkSvg } from "./LinkSvg";
import { UpdateLinkModal } from "./UpdateLinkModal";
import { useColorPrimary } from "~/hooks/useColorPrimary";
import { DeleteAction } from "./DeleteAction";
import { useTranslation } from "react-i18next";

export function createColumns({ refetch }: any) {
  const { t } = useTranslation("link");
  const { colorPrimary } = useColorPrimary();
  return [
    {
      dataIndex: "name",
      title: t("link.list.table.name"),
    },
    {
      dataIndex: "url",
      title: t("link.list.table.url"),
      renderText(_: any, record: any) {
        return (
          <Link to={record.url} target="_blank">
            <Tag className="inline-flex" style={{ color: colorPrimary, borderColor: colorPrimary }}>
              {record.url}
              <LinkSvg style={{ color: colorPrimary }} />
            </Tag>
          </Link>
        );
      },
    },
    {
      dataIndex: "description",
      title: t("link.list.table.description"),
    },
    {
      dataIndex: "op",
      title: t("link.list.table.action"),
      render(_: any, record: any) {
        return (
          <Space>
            <UpdateLinkModal
              refetch={refetch}
              record={record}
              key="modify-link-modal"
            />
            <DeleteAction
              refetch={refetch}
              record={record}
              key="delete-link-modal"
              title={t("action.delete")}
            />
          </Space>
        );
      },
    },
  ];
}
