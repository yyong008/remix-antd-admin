---
name: sign-in
description: Sign-in feature for admin dashboard. Manages user daily check-in, cumulative sign-in count, and continuous sign-in streak tracking.
---

# Sign-In Skill

## Overview

签到功能用于管理用户每日签到、累计签到次数和连续签到天数。

## Architecture (Mono Repo)

```
app/
├── dals/sign-in/
│   ├── SignIn/
│   │   ├── index.ts          # exports
│   │   ├── signInImpl.ts     # SignInDAL implementation
│   │   └── signIn.type.ts    # type definitions
│   └── SignInLog/
│       ├── index.ts          # exports
│       ├── signInLogImpl.ts  # SignInLogDAL implementation
│       └── signInLog.type.ts # type definitions
│   └── SignInLogDAL.ts       # legacy DAL (to be migrated)
│
packages/api/src/routes/admin/
│   └── system/
│       └── user.ts           # POST /signin endpoint
│
packages/database/src/schema/
│   └── misc.ts               # userSignLogs, userSigns tables
```

## Database Schema

### userSignLogs (签到记录表)

记录每次签到行为。

```typescript
userSignLogs = sqliteTable("user_sign_log", {
  id: text("id").primaryKey(),
  userId: text("userId").notNull().references(() => user.id),
  signType: integer("sign_type").notNull(),
  signTime: integer("sign_time", { mode: "timestamp_ms" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});
```

### userSigns (签到统计表)

记录用户签到统计数据。

```typescript
userSigns = sqliteTable("user_sign", {
  id: text("id").primaryKey(),
  userId: text("userId").notNull().references(() => user.id),
  resignNums: integer("resign_nums").notNull(),           // 补签次数
  signedNums: integer("signed_nums").notNull(),           // 累计签到次数
  continuitySignedNums: integer("continuity_signed_nums").notNull(), // 连续签到天数
});
```

## API Endpoint

### POST /api/admin/system/user/signin

用户签到接口。

**Logic:**

1. 检查用户今日是否已签到 (`getLatestById`)
2. 如已签到，返回 `alreadySigned: true`
3. 创建签到记录 (`userSignLogs`)
4. 更新签到统计 (`userSigns`):
   - `signedNums + 1`
   - 如昨日有签到记录，`continuitySignedNums + 1`
   - 否则 `continuitySignedNums = 1`（重新开始连续）

## DAL Structure

### SignInDAL

```typescript
function createSignInDAL(db: DrizzleD1Database) {
  return {
    getUserSignById(userId): Promise<UserSign | null>,
    createUserSign(userId): Promise<UserSign>,
    updateUserSign(userId, data): Promise<UserSign>,
    getYesterdaySignLog(userId): Promise<SignLog | null>,
    getLatestSignLogById(userId): Promise<SignLog | null>,
  };
}
```

### SignInLogDAL

```typescript
function createSignInLogDAL(db: DrizzleD1Database) {
  return {
    create(data): Promise<SignLog>,
    getLatestById(userId): Promise<SignLog | null>,  // 今日
  };
}
```

## Frontend Component

```
app/features/admin/modules/dashboard/
├── components/
│   ├── sign-in.tsx           # SignIn component
│   └── index.ts              # exports
└── route.tsx                 # dashboard route
```

### SignIn Component

- 使用 `useUserSignIn` mutation hook
- 签到成功后触发 `confetti` 动画
- 显示已签到/未签到状态

## Query Hook

```typescript
// app/api-client/queries/dashboard.ts
export function useUserSignIn() {
  return useMutation({
    mutationFn: async () => {
      const res = await getApiClient().api.admin.system.user.signin.$post();
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dashboardKeys.info });
    },
  });
}
```

## Implementation Checklist

- [x] `app/dals/sign-in/SignIn/signInImpl.ts` - SignInDAL 实现
- [x] `app/dals/sign-in/SignIn/index.ts` - exports
- [x] `app/utils/server/time.utils.ts` - 添加 `getYesterdayTime`
- [x] `packages/api/src/routes/admin/system/user.ts` - 签到 API 更新
- [ ] 统一 DAL 导出（避免两个 SignInLogDAL 实现）
- [ ] 补签功能（resignNums）

## Convention

- DAL 文件放在 `app/dals/` 目录下
- API 路由使用 `packages/api/src/routes/admin/`
- 前端组件使用 `app/features/admin/modules/`
- 使用 Drizzle ORM 进行数据库操作
- 时间处理使用 `getTodayTime` / `getYesterdayTime` 工具函数