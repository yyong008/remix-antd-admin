import { Button, Result } from "antd";
import { href, useLocation, useNavigate, useParams } from "react-router";
import type { MetaFunction } from "react-router";

import { m } from "~/paraglide/messages";

export const meta: MetaFunction = () => [{ title: "Blog · result" }];

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
      title={m.blog_result_title()}
      subTitle={state?.title}
      extra={[
        <Button
          type="primary"
          key="console"
          onClick={() => {
            nav(href("/:locale?/blog/:id" as any, { locale, id: state.id }));
          }}
        >
          {m.blog_result_button_view()}
        </Button>,
        <Button
          key="buy"
          onClick={() => {
            nav(href("/:locale?/admin/blog/new" as any, { locale }));
          }}
        >
          {m.blog_result_button_create_again()}
        </Button>,
      ]}
    />
  );
}

export default function Page() {
  return <Route />;
}
