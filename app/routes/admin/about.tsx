import { href } from "react-router";
import { Route as AboutImpl } from "~/features/admin/modules/about/route";
export { meta } from "~/features/admin/modules/about/index";

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
        label: "关于我们",
      },
    ],
  };
};

export default function Page() {
  return <AboutImpl />;
}
