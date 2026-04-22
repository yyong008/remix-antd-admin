import { Route as StorageImpl } from "~/features/admin/modules/tools/storage/route";
export { meta } from "~/features/admin/modules/tools/storage/index";

export const handle = { breadcrumb: "存储管理" };

export default function Page() {
  return <StorageImpl />;
}
