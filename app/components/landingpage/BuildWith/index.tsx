import { AntdIconSVG } from "./icons/AntdIconSVG";
import { DrizzleIconSVG } from "./icons/DrizzleIconSVG";
import { ExpressIconSVG } from "./icons/ExpressIconSVG";
import { LangChainIconSVG } from "./icons/LangChainIconSVG";
import { ProComponentSVG } from "./icons/ProComponentSVG";
import { ReactIconSVG } from "./icons/ReactIconSVG";
import { ReactrouterSVGIcon } from "./icons/ReactrouterSVG";
import { TailwindSVG } from "./icons/TailwindSVG";

export function BuildWith() {
	return (
		<div>
			<div className="flex flex-col justify-center items-center gap-4 mt-[10px]">
				<div className="text-xl mt-4 text-slate-400">Build on: </div>
				<div className="flex justify-center items-center gap-4">
					<ReactrouterSVGIcon />
					<ExpressIconSVG />
					<ReactIconSVG />
					<AntdIconSVG />
					<ProComponentSVG />
					<TailwindSVG />
					<DrizzleIconSVG />
					<LangChainIconSVG />
				</div>
			</div>
		</div>
	);
}
