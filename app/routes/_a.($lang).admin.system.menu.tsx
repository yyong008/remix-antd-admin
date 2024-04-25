// types
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";

// remix
import { useLoaderData } from "@remix-run/react";

// components
import { PageContainer } from "@ant-design/pro-components";
import SystemMenu from "~/components/system/Menu";

// hooks
import { useFetcherChange } from "~/hooks";

// controllers
import { AdminSystemMenuController } from "~/server/controllers/system/admin.system.menu.controller";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "System-Menu" }];
};

export const action: ActionFunction = AdminSystemMenuController.action;
export const loader: LoaderFunction = AdminSystemMenuController.loader;

export default function AdminSystemMenuRoute() {
  const { menuRaw, menuNotPerm } = useLoaderData<typeof loader>();
  const fetcher = useFetcherChange();
  return (
    <PageContainer>
      <SystemMenu
        menuRaw={menuRaw}
        fetcher={fetcher as any}
        menuNotPerm={menuNotPerm!}
      />
    </PageContainer>
  );
}
