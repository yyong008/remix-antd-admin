import { ConfigProvider } from "antd";
import { ProConfigProvider } from "@ant-design/pro-components";
import { Right } from "./components/Right";
import { SettingContext } from "@/context/setting-context";
import { useContext } from "react";
import { useNProgress } from "@/hooks/useNprogress";

export function Route() {
	useNProgress();
	const value = useContext(SettingContext);

	return (
		<ProConfigProvider>
			<ConfigProvider
				theme={{
					token: value.theme,
				}}
			>
				<div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_50%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.2),_transparent_55%)]">
					<div className="flex min-h-screen items-center justify-center px-6 py-12">
						<Right />
					</div>
				</div>
			</ConfigProvider>
		</ProConfigProvider>
	);
}
