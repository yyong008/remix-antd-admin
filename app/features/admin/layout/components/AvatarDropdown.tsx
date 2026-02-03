import { Dropdown, Form } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { simpleStorage } from "@/libs/simpleStorage";
import { useNavigate, useParams } from "react-router";

import React from "react";

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
							navigate(`/${lang}/admin/profile/account`);
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
							navigate(`/${locale}/auth/login`, { replace: true });
						},
					},
				],
			}}
		>
			{dom}
		</Dropdown>
	);
};
