import { useMemo } from "react";
import { href, NavLink, Outlet, useNavigate, useParams } from "react-router";


export function Route() {
	const { locale } = useParams();
	const navigate = useNavigate();

	const basePath = useMemo(() => href(`/:locale?/ai`, { locale }), [locale]);
	const createChat = () => {
		navigate(`${basePath}/chatbot/demo`);
	};

	const chatHistory = [
		{ id: "demo", title: "产品策略讨论" },
		{ id: "demo-2", title: "品牌语气优化" },
		{ id: "demo-3", title: "数据分析总结" },
	];

	return (
		<div className="min-h-screen bg-[var(--mkt-bg)] text-[var(--mkt-text)]">
			<div className="mx-auto flex w-full max-w-6xl gap-6 px-6 py-10">
				<aside className="w-full max-w-[280px] space-y-6">
					<div className="rounded-3xl border border-[var(--mkt-border)] bg-[var(--mkt-surface)] p-6 shadow-[var(--mkt-shadow)]">
						<h2 className="text-lg font-semibold">AI Center</h2>
						<p className="mt-2 text-xs text-[var(--mkt-muted)]">
							Chatbot 与图像能力入口
						</p>
						<div className="mt-6 space-y-2">
							<button
								type="button"
								onClick={createChat}
								className="flex w-full items-center justify-between rounded-2xl border border-[var(--mkt-border)] bg-[var(--mkt-text)] px-4 py-3 text-sm font-semibold text-[var(--mkt-surface)]"
							>
								Chatbot
								<span className="text-xs font-normal">新建</span>
							</button>
							<NavLink
								to={`${basePath}/image`}
								className="flex w-full items-center justify-between rounded-2xl border border-[var(--mkt-border)] px-4 py-3 text-sm font-semibold text-[var(--mkt-text)]"
							>
								Image
								<span className="text-xs font-normal text-[var(--mkt-muted)]">
									Beta
								</span>
							</NavLink>
						</div>
					</div>

				<div className="rounded-3xl border border-[var(--mkt-border)] bg-[var(--mkt-surface)] p-6 shadow-[var(--mkt-shadow)]">
					<div className="flex items-center justify-between">
						<h3 className="text-sm font-semibold">聊天历史</h3>
						<span className="text-xs text-[var(--mkt-muted)]">
							{chatHistory.length} 条
						</span>
					</div>
					<div className="mt-4 space-y-2">
						{chatHistory.map((item) => (
							<button
								key={item.id}
								type="button"
								onClick={() => navigate(`${basePath}/chatbot/${item.id}`)}
								className="group flex w-full items-center justify-between rounded-2xl border border-[var(--mkt-border)] px-3 py-2 text-left text-xs font-semibold transition hover:bg-[var(--mkt-bg)]"
							>
								<span className="truncate">{item.title}</span>
								<span className="text-[10px] text-[var(--mkt-muted)] group-hover:text-[var(--mkt-text)]">
									删除
								</span>
							</button>
						))}
						{chatHistory.length === 0 && (
							<div className="rounded-2xl border border-dashed border-[var(--mkt-border)] px-4 py-6 text-center text-xs text-[var(--mkt-muted)]">
								暂无聊天记录
							</div>
						)}
					</div>
				</div>
			</aside>

			<section className="flex-1 rounded-[32px] border border-[var(--mkt-border)] bg-[var(--mkt-surface)] p-8 shadow-[var(--mkt-shadow)]">
				<Outlet />
			</section>
			</div>
		</div>
	);
}
