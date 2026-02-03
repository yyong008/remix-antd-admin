import { Dropdown, Form } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { simpleStorage } from "@/libs/simpleStorage";
import { href, useNavigate, useParams } from "react-router";

import type React from "react";

type AvatarDropDownProps = {
	dom: any;
};

export const AvatarDropDown: React.FC<AvatarDropDownProps> = ({ dom }) => {
	const navigate = useNavigate();
	const { locale } = useParams();
	const isZh = locale === "zh";

	return (
		<Dropdown
			menu={{
				items: [
					{
						key: "profile-center",
						icon: <UserOutlined />,
						label: isZh ? "个人中心" : "Personal Center",
						onClick: () => {
							navigate(href("/:locale?/admin/profile/account", { locale }));
						},
					},
					{
						type: "divider",
					},
					{
						key: "logout",
						icon: (
							<Form method="post" action="/logout">
								<LogoutOutlined />
							</Form>
						),
						label: isZh ? "退出登录" : "Logout",
						onClick() {
							simpleStorage.clearAllToken();
							navigate(href("/:locale?/auth/login", { locale }), { replace: true });
						},
					},
				],
			}}
		>
			{dom}
		</Dropdown>
	);
};
