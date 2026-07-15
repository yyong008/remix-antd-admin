import { Button, Result } from "antd";
import { href, useLocation, useNavigate, useParams } from "react-router";
import type { MetaFunction } from "react-router";

import { m } from "~/paraglide/messages";

export const handle = () => ({
  breadcrumb: [{ label: m.breadcrumb_result() }],
});

export const meta: MetaFunction = () => [{ title: "News · result" }];

export function Route() {
  const { locale } = useParams();
  const state = useLocation().state as { title?: string; id?: string } | null;
  const nav = useNavigate();
  if (!state || !state?.title) {
    nav(-1);
    return null;
  }
  return (
    <Result
      status="success"
      title={m.news_result_title()}
      subTitle={state?.title}
      extra={[
        <Button
          type="primary"
          key="console"
          onClick={() => {
            nav(href("/:locale?/news/:id" as any, { locale, id: state.id }));
          }}
        >
          {m.news_result_button_view()}
        </Button>,
        <Button
          key="buy"
          onClick={() => {
            nav(href("/:locale?/admin/news/edit", { locale }));
          }}
        >
          {m.news_result_button_create_again()}
        </Button>,
      ]}
    />
  );
}

export default function Page() {
  return <Route />;
}
