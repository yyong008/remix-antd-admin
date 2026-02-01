import { Layout, Menu, Avatar, Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import {
	HomeOutlined,
	NotificationOutlined,
	ReadOutlined,
	InfoCircleOutlined,
	UserOutlined,
	SettingOutlined,
	LogoutOutlined,
	BookOutlined,
} from "@ant-design/icons";
import { Book } from "lucide-react";
import { useParams, useNavigate, useLocation, Outlet } from "react-router";

import { defaultLang } from "@/config/lang"; // must import lang no use config (in server)
import { NavFooter } from "./footer";

const { Header, Content, Footer } = Layout;

export function Nav() {
	const { locale = defaultLang } = useParams();
	const navigate = useNavigate();
	const location = useLocation();

	// 获取当前路径，用于菜单选中状态
	const currentPath = location.pathname;

	// 顶部导航菜单项 - 保持与原始导航相同的结构
	const topMenuItems: MenuProps["items"] = [
		{
			key: `/${locale}`,
			label: "Home",
			icon: <HomeOutlined />,
		},
		{
			key: `/${locale}/news`,
			label: "News",
			icon: <NotificationOutlined />,
		},
		{
			key: `/${locale}/blog`,
			label: "Blog",
			icon: <BookOutlined />,
		},
		{
			key: `/${locale}/docs`,
			label: "Docs",
			icon: <ReadOutlined />,
		},
		{
			key: `/${locale}/about`,
			label: "About",
			icon: <InfoCircleOutlined />,
		},
	];

	// 用户下拉菜单
	const userDropdownItems: MenuProps["items"] = [
		{
			key: "profile",
			label: "Profile",
			icon: <UserOutlined />,
		},
		{
			key: "settings",
			label: "Settings",
			icon: <SettingOutlined />,
		},
		{
			type: "divider",
		},
		{
			key: "logout",
			label: "Logout",
			icon: <LogoutOutlined />,
		},
	];

	// 菜单点击处理
	const handleMenuClick: MenuProps["onClick"] = (e) => {
		navigate(e.key);
	};

	// 用户下拉菜单点击处理
	const handleUserMenuClick: MenuProps["onClick"] = (e) => {
		if (e.key === "logout") {
			// 处理登出逻辑
			navigate(`/${locale}/admin/login`);
		} else if (e.key === "profile") {
			navigate(`/${locale}/profile`);
		} else if (e.key === "settings") {
			navigate(`/${locale}/settings`);
		}
	};

	return (
		<Layout style={{ minHeight: "100vh" }}>
			{/* 顶部导航栏 - 与首页和footer协调的现代设计 */}
			<Header
				style={{
					padding: "0 24px",
					background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
					position: "sticky",
					top: 0,
					zIndex: 1000,
					height: "64px",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", flex: 1 }}>
					{/* Logo 区域 */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginRight: "48px",
							cursor: "pointer",
						}}
						onClick={() => navigate(`/${locale}`)}
					>
						<img
							src="/logo.png"
							alt="Logo"
							style={{
								width: "36px",
								height: "36px",
								marginRight: "12px",
								filter: "brightness(0) invert(1)", // 使logo变为白色
							}}
						/>
						<span
							style={{
								fontWeight: "bold",
								fontSize: "18px",
								color: "white",
								letterSpacing: "0.5px",
							}}
						>
							Remix Antd Admin
						</span>
					</div>

					{/* 顶部导航菜单 */}
					<Menu
						mode="horizontal"
						selectedKeys={[currentPath]}
						items={topMenuItems}
						onClick={handleMenuClick}
						style={{
							flex: 1,
							borderBottom: "none",
							background: "transparent",
							color: "white",
						}}
						theme="dark"
					/>
				</div>

				{/* 右侧用户区域 */}
				<Space size="middle">
					<Dropdown
						menu={{
							items: userDropdownItems,
							onClick: handleUserMenuClick,
							style: { minWidth: "160px" },
						}}
						placement="bottomRight"
						trigger={["click", "hover"]}
					>
						<Space
							style={{
								cursor: "pointer",
								padding: "8px 12px",
								borderRadius: "8px",
								background: "rgba(255, 255, 255, 0.1)",
								transition: "all 0.3s",
							}}
						>
							<Avatar
								icon={<UserOutlined />}
								style={{
									backgroundColor: "rgba(255, 255, 255, 0.2)",
									color: "white",
								}}
							/>
							<span
								style={{
									color: "white",
									fontWeight: "500",
								}}
							>
								Admin User
							</span>
						</Space>
					</Dropdown>
				</Space>
			</Header>
			<Content
				style={{
					padding: "24px",
					background: "#f5f5f5",
					minHeight: "calc(100vh - 64px - 400px)", // 减去header和footer高度
				}}
			>
				<Outlet />
			</Content>
			<Footer style={{ padding: 0 }}>
				<NavFooter />
			</Footer>
		</Layout>
	);
}
