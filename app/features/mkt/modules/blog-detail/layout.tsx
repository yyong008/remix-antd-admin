import type { ReactNode } from "react";

export function Layout({ children }: { children?: ReactNode }) {
	return (
		<div className="flex flex-col pt-[140px] w-[40vw] h-[80vh]">{children}</div>
	);
}
