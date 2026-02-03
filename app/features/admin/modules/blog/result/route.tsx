import { Button, Result } from "antd";
import { href, useLocation, useNavigate, useParams } from "react-router";

export function Route() {
	const { locale } = useParams();
	const state = useLocation().state;
	const nav = useNavigate();
	return (
		<Result
			status="success"
			title="博客创建成f功"
			subTitle={state?.title}
			extra={[
				<Button
					type="primary"
					key="console"
					onClick={() => {
						nav(href("/:locale?/blog/:id", { locale, id: state.id }));
					}}
				>
					go read
				</Button>,
				<Button
					key="buy"
					onClick={() => {
						nav(href("/:locale?/admin/blog/edit", { locale: locale }));
					}}
				>
					create Again
				</Button>,
			]}
		/>
	);
}
