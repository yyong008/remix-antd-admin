import { Button, Table } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";

import { Excel } from "antd-table-saveas-excel";
import type { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";

export function Component() {
  const { dataSource } = useLoaderData<typeof loader>();

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "出生",
      dataIndex: "date",
      key: "date",
    },
  ];
  return (
    <PageContainer>
      <ProCard>
        <div>
          <Button
            style={{
              marginBottom: 20,
            }}
            onClick={() => {
              const excel = new Excel();
              excel
                .addSheet("test")
                .addColumns(columns)
                .addDataSource(dataSource)
                .saveAs("测试.xlsx");
            }}
          >
            下载
          </Button>
          <Table bordered columns={columns} dataSource={dataSource} />
        </div>
      </ProCard>
    </PageContainer>
  );
}
