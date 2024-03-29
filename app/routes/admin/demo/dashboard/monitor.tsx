// types
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

// remix
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import { Space } from "antd";
import { PageContainer } from "@ant-design/pro-components";
import {
  MonitorRowOne,
  MonitorRowTwo,
  MonitorRowThree,
} from "~/components/dashboard/dashboardMonitor";

// db
import { getMonitorData$ } from "~/__mock__/dashboard/monitor";

// libs
import { lastValueFrom } from "rxjs";
import {
  destroySession,
  getSession,
  getUserId,
} from "~/services/common/auth.server";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    {
      title: "dashboard-monitor",
    },
  ];
};

// remix:loader
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { lang } = params;
  const session = await getSession(request.headers.get("Cookie"));
  const userId = await getUserId(request);

  if (!userId) {
    return redirect("/" + lang + "/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }
  const monitorData = await lastValueFrom(getMonitorData$());
  return json({ ...monitorData });
};

export default function MonitorRoute() {
  const { geoJson, activeMonitorData, gaugeData } =
    useLoaderData<typeof loader>();
  return (
    <PageContainer breadcrumb={{}}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <MonitorRowOne
          geoJson={geoJson}
          activeMonitorData={activeMonitorData}
          gaugeData={gaugeData}
        />
        <MonitorRowTwo />
        <MonitorRowThree />
      </Space>
    </PageContainer>
  );
}
