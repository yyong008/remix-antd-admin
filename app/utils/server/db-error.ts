type ErrLike = {
  message?: string;
  query?: string;
  cause?: unknown;
  /** libsql / 部分驱动 */
  rawMessage?: string;
  originalError?: unknown;
  error?: unknown;
};

function pushErrStrings(o: ErrLike, parts: string[]) {
  for (const key of ["message", "rawMessage"] as const) {
    const v = o[key];
    if (typeof v === "string" && v.trim()) parts.push(v);
  }
}

/**
 * 展开 Error.cause 链，并附带 Drizzle 常在对象上挂的 `query`（便于匹配「缺列」等）。
 * D1 上顶层 `message` 常为 `"fail"`，真实原因在深层 cause 或仅能从 SQL 推断。
 */
export function errorTextChain(err: unknown): string {
  const parts: string[] = [];
  let cur: unknown = err;
  for (let i = 0; i < 16 && cur != null; i++) {
    if (cur instanceof Error) {
      parts.push(cur.message);
      cur = cur.cause;
    } else if (cur && typeof cur === "object") {
      const o = cur as ErrLike;
      pushErrStrings(o, parts);
      if (typeof o.query === "string" && o.query.trim()) parts.push(o.query);
      cur = o.cause ?? o.originalError ?? o.error;
    } else {
      parts.push(String(cur));
      break;
    }
  }
  return parts.join("\n");
}

/**
 * 将 Drizzle / D1 / SQLite 抛出的错误转成给用户看的短文案。
 */
export function friendlyDbMessage(error: unknown): string {
  const chain = errorTextChain(error);
  /** SQLite 206 / 常见文案（深层 cause 里才有，顶层常是 Drizzle 的 Failed query） */
  if (
    /UNIQUE|unique constraint|constraint failed:?\s*[`'"]?news_category[`'"]?\.name/i.test(chain)
  ) {
    return "该分类名称已存在";
  }
  if (
    /FOREIGN KEY|foreign key|constraint failed:?\s*[`'"]?news_category[`'"]?\.user_id/i.test(chain)
  ) {
    return "数据关联失败：请确认登录用户在库中存在";
  }
  /** 部分驱动只写 `constraint failed: news_category.name`，无 UNIQUE 关键字 */
  if (/constraint failed.*news_category\.\s*name/i.test(chain)) {
    return "该分类名称已存在";
  }
  if (
    /no such column.*\bvisible\b|no such column: visible|no column named.*\bvisible\b|has no column named.*\bvisible\b/i.test(
      chain,
    )
  ) {
    return "数据库未包含 news_category.visible 列，请执行 pnpm db:migrate:local（或 pnpm db:setup:local）后重试。";
  }

  const top = error instanceof Error ? error.message?.trim() : "";
  /** 勿把 Drizzle「Failed query + 整段 SQL」直接返回给前端 */
  if (top && top !== "fail" && !/^Failed query:/i.test(top)) {
    return top;
  }

  /** Drizzle 常把顶层设为 `Failed query:…`，真实 SQLite 文案在 `cause` */
  if (error instanceof Error && /^Failed query:/i.test(error.message) && error.cause != null) {
    return friendlyDbMessage(error.cause);
  }

  const o = error as { message?: string; cause?: unknown; query?: string; params?: unknown[] };
  if (typeof o?.message === "string" && o.message.trim() && o.message !== "fail") {
    if (/^Failed query:/i.test(o.message) && o.cause != null) {
      return friendlyDbMessage(o.cause);
    }
    return friendlyDbMessage(new Error(o.message));
  }
  if (o?.cause) {
    return friendlyDbMessage(o.cause);
  }

  // 仅有 query/params、无 sqlite 文案时
  if (typeof o?.query === "string" && /insert/i.test(o.query) && /news_category/i.test(o.query)) {
    const nameGuess = o.params?.[1];
    if (/\bvisible\b/i.test(o.query)) {
      return `创建分类失败：本地库可能未执行迁移（缺少 visible 列）。请执行 pnpm db:migrate:local 后重试；若名称「${String(nameGuess ?? "")}」已存在请更换。`;
    }
    return `创建分类失败。若名称「${String(nameGuess ?? "")}」已存在请更换；若仍失败请执行 pnpm db:migrate:local 后重试。`;
  }

  if (/insert into\s*`?news_category`?/i.test(chain) && /\bvisible\b/i.test(chain)) {
    return "创建分类失败：请确认已执行 pnpm db:migrate:local（为 news_category 增加 visible 等列）；若名称重复请更换。";
  }

  return "数据库操作失败，请稍后重试";
}
