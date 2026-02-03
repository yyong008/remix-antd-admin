import { useMemo } from "react";
import { useParams } from "react-router";

export function Route() {
	const { locale, id } = useParams();

	const title = useMemo(() => (id ? `Chat ${id.slice(0, 6)}` : "Chatbot"), [id]);
	const messages = [
		{
			id: "m1",
			role: "assistant" as const,
			content: "你好，我可以帮你整理需求、生成文案或提供数据总结。",
		},
		{
			id: "m2",
			role: "user" as const,
			content: "帮我总结一下这周的增长表现。",
		},
		{
			id: "m3",
			role: "assistant" as const,
			content: "好的，我会先抓取数据，并整理成 3 个重点结论。",
		},
	];

	return (
		<div className="flex h-full flex-col gap-6">
			<div>
				<p className="text-xs uppercase tracking-[0.3em] text-[var(--mkt-muted)]">
					AI Chatbot
				</p>
				<h1 className="text-2xl font-semibold">{title}</h1>
				<p className="mt-2 text-sm text-[var(--mkt-muted)]">
					输入消息即可开始，当前语言：{locale}
				</p>
			</div>

			<div className="flex-1 space-y-4 overflow-y-auto rounded-3xl border border-[var(--mkt-border)] bg-[var(--mkt-bg)] p-4">
				{messages.map((message) => (
					<div
						key={message.id}
						className={`flex ${
							message.role === "user" ? "justify-end" : "justify-start"
						}`}
					>
						<div
							className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
								message.role === "user"
									? "bg-[var(--mkt-text)] text-[var(--mkt-surface)]"
									: "bg-[var(--mkt-surface)] text-[var(--mkt-text)]"
							}`}
						>
							{message.content}
						</div>
					</div>
				))}
			</div>

			<div className="flex items-end gap-3">
				<textarea
					rows={3}
					placeholder="输入消息..."
					className="flex-1 resize-none rounded-2xl border border-[var(--mkt-border)] bg-[var(--mkt-surface)] p-3 text-sm focus:outline-none"
				/>
				<button
					type="button"
					className="rounded-2xl bg-[var(--mkt-text)] px-5 py-3 text-sm font-semibold text-[var(--mkt-surface)] disabled:opacity-50"
				>
					发送
				</button>
			</div>
		</div>
	);
}
