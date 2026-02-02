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
				<div className="relative min-h-[100dvh] w-full overflow-hidden bg-[var(--mkt-bg)] text-[var(--mkt-text)]">
					<div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-[var(--mkt-accent)] opacity-20 blur-[110px]" />
					<div className="pointer-events-none absolute right-[-110px] bottom-10 h-80 w-80 rounded-full bg-[var(--mkt-accent-2)] opacity-20 blur-[120px]" />
					<div className="flex min-h-full items-center justify-center px-6 py-16 box-border">
						<Left />
					</div>
				</div>
			</ConfigProvider>
		</ProConfigProvider>
	);
}
