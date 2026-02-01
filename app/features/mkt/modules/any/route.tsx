import { Button, Result } from "antd";

import { useNavigate } from "react-router";

export function Route() {
	const navigate = useNavigate();

	return (
		<Result
			status="404"
			title="404"
			subTitle={"Not Found"}
			extra={
				<Button type="primary" onClick={() => navigate("/")}>
					Not Found
				</Button>
			}
		/>
	);
}
