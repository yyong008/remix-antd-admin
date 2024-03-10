// types
import type { MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import { Table, Button } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { Excel } from "antd-table-saveas-excel";

// libs
import { lastValueFrom } from "rxjs";

// db
import { getExcelDisease$ } from "~/db/excel/export";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "excel-export" }];
};

// remix:loader
export const loader = async () => {
  const { dataSource } = await lastValueFrom(getExcelDisease$());
  return json({ dataSource });
};

export default function ExcelExportRoute() {
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
    <PageContainer title="excel export">
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
