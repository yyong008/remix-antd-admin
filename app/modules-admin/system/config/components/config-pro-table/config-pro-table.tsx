import { PTable } from "@/components/pro-table";
import { createConfigTableColumns } from "./config-create-columns";

export function ConfigProTable() {
  return (
    <PTable
      headerTitle="Config"
      search={false}
      dataSource={[]}
      columns={createConfigTableColumns()}
    />
  );
}
