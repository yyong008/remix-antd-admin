import { Button, Result } from "antd";
import { useLocation, useNavigate, useParams } from "react-router";

export function Route() {
	const { lang } = useParams();
	const state = useLocation().state;
	const nav = useNavigate();
	// if (!state || !state?.title) {
	//   return nav(-1);
	// }
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
						nav(`/${lang}/blog/${state.id}`);
					}}
				>
					go read
				</Button>,
				<Button
					key="buy"
					onClick={() => {
						nav(`/${lang}/admin/blog/edit`);
					}}
				>
					create Again
				</Button>,
			]}
		/>
	);
}
