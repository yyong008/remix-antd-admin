import { href } from "react-router";
import { Route as StorageImpl } from "~/features/admin/modules/tools/storage/route";
export { meta } from "~/features/admin/modules/tools/storage/index";

interface HandleParams {
  locale?: string;
}

export const handle = ({ params }: { params: HandleParams }) => {
  return {
    breadcrumb: [
      {
        href: href("/:locale?/admin/dashboard", { locale: params?.locale }),
        label: "Dashboard",
      },
      {
        label: "工具",
      },
      {
        label: "存储管理",
      },
    ],
  };
};

export default function Page() {
  return <StorageImpl />;
}
