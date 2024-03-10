// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import { JsonView } from "react-json-view-lite";
import { PageContainer, ProCard } from "@ant-design/pro-components";

// styles
import "react-json-view-lite/dist/index.css";
import { lastValueFrom } from "rxjs";
import { getPackageJsonData$ } from "~/db/editor/json";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    {
      title: "editor-json-viewer",
    },
  ];
};

// remix:loader
export const loader: LoaderFunction = async () => {
  const { packageJson } = await lastValueFrom(getPackageJsonData$());
  return json({
    packageJson,
  });
};

export default function EditorJsonViewer() {
  const { packageJson } = useLoaderData<typeof loader>();
  return (
    <PageContainer title="editor json view">
      <ProCard>
        <JsonView data={packageJson} />
      </ProCard>
    </PageContainer>
  );
}
