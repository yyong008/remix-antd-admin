import { ConfigProvider } from "antd";
import { Left } from "./components/Left";
import { ProConfigProvider } from "@ant-design/pro-components";
import { SettingContext } from "@/context/setting-context";
import { useContext } from "react";

export function Route() {
	const value = useContext(SettingContext);

	return (
		<ProConfigProvider>
			<ConfigProvider
				theme={{
					token: value.theme,
				}}
			>
				<div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,_rgba(14,116,144,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.16),_transparent_55%)]">
					<div className="flex min-h-screen items-center justify-center px-6 py-12">
						<Left />
					</div>
				</div>
			</ConfigProvider>
		</ProConfigProvider>
	);
}
