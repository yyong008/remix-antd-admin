import { Button, Result } from "antd";
import { useLocation, useNavigate, useParams } from "react-router";

export function Route() {
  const { lang } = useParams();
  const state = useLocation().state;
  const nav = useNavigate();
  if (!state || !state?.title) {
    nav(-1);
    return null;
  }
  return (
    <Result
      status="success"
      title="新闻创建成功"
      subTitle={state?.title}
      extra={[
        <Button
          type="primary"
          key="console"
          onClick={() => {
            nav(`/${lang}/news/${state.id}`);
          }}
        >
          Go Read
        </Button>,
        <Button
          key="buy"
          onClick={() => {
            nav(`/${lang}/admin/news/edit`);
          }}
        >
          To Create News Again
        </Button>,
      ]}
    />
  );
}
