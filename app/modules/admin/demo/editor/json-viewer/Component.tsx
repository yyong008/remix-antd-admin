import "react-json-view-lite/dist/index.css";

import { PageContainer, ProCard } from "@ant-design/pro-components";

import { JsonView } from "react-json-view-lite";
import type { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";

export function Component() {
  const { packageJson } = useLoaderData<typeof loader>();
  return (
    <PageContainer>
      <ProCard>
        <JsonView data={packageJson} />
      </ProCard>
    </PageContainer>
  );
}
