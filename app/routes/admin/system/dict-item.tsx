import { href } from "react-router";
import { Route as DictItemImpl } from "~/features/admin/modules/system/dict-item/route";
export { meta } from "~/features/admin/modules/system/dict-item/index";

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
        label: "系统",
      },
      {
        href: href("/:locale?/admin/dict", { locale: params?.locale }),
        label: "字典",
      },
      {
        label: "字典项目",
      },
    ],
  };
};

export default function Page() {
  return <DictItemImpl />;
}
