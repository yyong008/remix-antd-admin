import { PageContainer } from "@ant-design/pro-components";
import SystemMenu from "~/components/system/Menu";
import type { loader } from "./loader";
import { useFetcherChange } from "~/hooks";
import { useLoaderData } from "@remix-run/react";

export function Component() {
  const {
    data: { menuRaw, menuNotPerm },
  } = useLoaderData<typeof loader>();
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
