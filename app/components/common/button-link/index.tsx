import { EditOutlined, PlusOutlined } from "@ant-design/icons";

import { Button } from "antd";
import type { ButtonType } from "antd/es/button";
import { Link } from "react-router";

type ButtonLinkProps = {
	to: string;
	buttonType?: ButtonType;
	icon?: React.ReactNode;
	content?: string;
	type: "new" | "edit";
};

export function ButtonLink(props: ButtonLinkProps) {
	if (props.type === "new") {
		return (
			<Link to={props.to}>
				<Button
					type={props.buttonType || "primary"}
					icon={props.icon ?? <PlusOutlined />}
				>
					{props.content}
				</Button>
			</Link>
		);
	} else if (props.type === "edit") {
		return (
			<Link to={props.to}>
				<Button
					type={props.buttonType || "link"}
					icon={props.icon ?? <EditOutlined />}
				>
					{props.content}
				</Button>
			</Link>
		);
	}
}
