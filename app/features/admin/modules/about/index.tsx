import { href, type MetaFunction } from "react-router";
import { Route } from "~/features/admin/modules/about/route";

export const meta: MetaFunction = () => {
  return [{ title: "About" }];
};

interface HandleParams {
  locale?: string;
}

export const handle = ({ params }: { params: HandleParams }) => {
  return {
    breadcrumb: [
      {
        href: href("/:locale?/admin/about", { locale: params?.locale }),
        label: "About",
      },
    ],
  };
};

export default function Page() {
  return <Route />;
}
