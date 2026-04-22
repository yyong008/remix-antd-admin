import { href } from "react-router";
import { Route as DictImpl } from "~/features/admin/modules/system/dict/route";
export { meta } from "~/features/admin/modules/system/dict/index";

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
        label: "字典",
      },
    ],
  };
};

export default function Page() {
  return <DictImpl />;
}
