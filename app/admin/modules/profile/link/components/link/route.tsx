import { ProTable } from "@ant-design/pro-components";

import { createColumns } from "./components/createColumns";
import { useEffect, useState } from "react";
import { LinkModalCreate } from "./components/CreateLinkModal";
import { readProfileLinkList } from "~/admin/apis/admin/profile";
import { Tag, Tooltip } from "antd";
import { useColorPrimary } from "~/hooks/useColorPrimary";
import { useTranslation } from "react-i18next";
export function LinkTable(props: {
  categoryId: number;
  categoryName: string;
  setSelectedLinkCategory: (linkCategory: any) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    list: [],
    total: 0,
  });
  const [page, setPage] = useState({
    page: 1,
    pageSize: 10,
    categoryId: props.categoryId,
  });
  const getData = async () => {
    setIsLoading(true);
    const result: any = await readProfileLinkList(page);
    if (result.code === 0) {
      setData(result.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    setPage({
      ...page,
      categoryId: props.categoryId,
    });
  }, [props.categoryId]);

  return (
    <>
      <ProTable
        rowKey="id"
        size="small"
        search={false}
        headerTitle={
          <LinkTableHeader
            categoryName={props.categoryName}
            setSelectedLinkCategory={props.setSelectedLinkCategory}
          />
        }
        loading={isLoading}
        dataSource={data?.list || []}
        toolBarRender={() => [
          <LinkModalCreate refetch={getData} key="create-link-modal" />,
        ]}
        options={{
          reload: getData,
        }}
        pagination={{
          total: data?.total,
          pageSize: 10,
          onChange(_page, pageSize) {
            setPage({
              ...page,
              page: _page,
              pageSize,
            });
          },
        }}
        columns={createColumns({ refetch: getData })}
      />
    </>
  );
}

function LinkTableHeader(props: {
  categoryName: string;
  setSelectedLinkCategory: (linkCategory: any) => void;
}) {
  const { t } = useTranslation("link");
  const { colorPrimary } = useColorPrimary();
  const tagStyle = {
    color: colorPrimary,
    borderColor: colorPrimary,
  }
  const TagRender = () => {
    return (
      <Tooltip title="关闭，退回到全部链接列表">
        <Tag
        closable
        style={tagStyle}
        onClose={() => {
          props.setSelectedLinkCategory(null);
        }}
      >
        {props.categoryName}
      </Tag>
      </Tooltip>
    );
  };
  if (!props.categoryName) {
    return (
      <Tooltip title="全部列表">
        <h1>
          <Tag style={tagStyle}>
            {t("link.list.all_list")}
          </Tag>
          {t("link.list.title")}
        </h1>
      </Tooltip>
    );
  }
  return (
    <div>
      <h1>
        <TagRender />
        {t("link.list.title")}
      </h1>
    </div>
  );
}
