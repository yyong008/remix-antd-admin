import { Button, Result } from "antd";
import { href, useLocation, useNavigate, useParams } from "react-router";

export function Route() {
	const { locale } = useParams();
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
						nav(href("/:locale?/news/:id", { locale, id: state.id }));
					}}
				>
					Go Read
				</Button>,
				<Button
					key="buy"
					onClick={() => {
						nav(href("/:locale?/admin/news/edit", { locale }));
					}}
				>
					To Create News Again
				</Button>,
			]}
		/>
	);
}
