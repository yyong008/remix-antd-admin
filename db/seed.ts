import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, "../.env");
dotenv.config({
	path: envPath,
});
import { and, eq, isNull } from "drizzle-orm";
import { db } from "../app/libs/neon";
import {
	departments,
	menuRoles,
	menus,
	roles,
	userRoles,
	user,
} from "./schema";
import { auth } from "../app/libs/auth/server";

async function ensureDepartment() {
	const existing = await db
		.select()
		.from(departments)
		.where(eq(departments.name, "Root"))
		.limit(1);
	const found = existing[0];
	if (found) return found;
	const created = await db
		.insert(departments)
		.values({
			name: "Root",
			description: "Root Department",
			orderNo: 1,
		})
		.returning();
	return created[0];
}

async function ensureRoles() {
	const roleDefs = [
		{
			name: "Super Admin",
			value: "super_admin",
			description: "Super Admin",
			status: 0,
		},
		{
			name: "Admin",
			value: "admin",
			description: "Admin",
			status: 0,
		},
		{
			name: "User",
			value: "user",
			description: "User",
			status: 0,
		},
	];

	const existing = await db.select().from(roles);
	const byValue = new Map(existing.map((role) => [role.value, role]));
	const createdRoles: Record<string, any> = {};

	for (const def of roleDefs) {
		const found = byValue.get(def.value);
		if (found) {
			createdRoles[def.value] = found;
			continue;
		}
		const created = await db.insert(roles).values(def).returning();
		createdRoles[def.value] = created[0];
	}

	return createdRoles;
}

type MenuSeed = {
	key: string;
	parentKey?: string | null;
	name: string;
	type: number;
	path?: string | null;
	pathFile?: string | null;
	permission?: string | null;
	icon?: string | null;
	status?: number;
	isShow?: number;
	isCache?: number;
	isLink?: number;
	orderNo?: number;
	description?: string | null;
	remark?: string | null;
};

const menuSeeds: MenuSeed[] = [
	{
		key: "dashboard",
		name: "Dashboard",
		type: 2,
		path: "/dashboard",
		pathFile: "admin/dashboard",
		permission: "dashboard:read",
		icon: "DashboardOutlined",
		orderNo: 1,
		isShow: 1,
	},
	{
		key: "ai",
		name: "AI",
		type: 1,
		path: "/ai",
		icon: "RobotOutlined",
		orderNo: 2,
		isShow: 1,
	},
	{
		key: "ai-simplechat",
		parentKey: "ai",
		name: "Simple Chat",
		type: 2,
		path: "/ai/simplechat",
		pathFile: "admin/ai/simplechat",
		permission: "system:ai:simplechat:read",
		orderNo: 1,
		isShow: 1,
	},
	{
		key: "news",
		name: "News",
		type: 1,
		path: "/news",
		icon: "ReadOutlined",
		orderNo: 3,
		isShow: 1,
	},
	{
		key: "news-list",
		parentKey: "news",
		name: "News List",
		type: 2,
		path: "/news/result",
		pathFile: "admin/news/result",
		permission: "news:list",
		orderNo: 1,
		isShow: 1,
	},
	{
		key: "news-category",

		parentKey: "news",
		name: "News Category",
		type: 2,
		path: "/news/category",
		pathFile: "admin/news/category",
		permission: "news:category:list",
		orderNo: 2,
		isShow: 1,
	},
	{
		key: "news-category-detail",
		parentKey: "news",
		name: "News Category Detail",
		type: 2,
		path: "/news/category/:id",
		pathFile: "admin/news/list",
		permission: "news:list",
		orderNo: 3,
		isShow: 0,
	},
	{
		key: "news-edit",
		parentKey: "news",
		name: "News Create",
		type: 2,
		path: "/news/edit",
		pathFile: "admin/news/edit",
		permission: "news:create",
		orderNo: 4,
		isShow: 0,
	},
	{
		key: "news-edit-detail",
		parentKey: "news",
		name: "News Edit",
		type: 2,
		path: "/news/edit/:id",
		pathFile: "admin/news/edit-detail",
		permission: "news:update",
		orderNo: 5,
		isShow: 0,
	},
	{
		key: "blog",
		name: "Blog",
		type: 1,
		path: "/blog",
		icon: "BookOutlined",
		orderNo: 4,
		isShow: 1,
	},
	{
		key: "blog-list",
		parentKey: "blog",
		name: "Blog List",
		type: 2,
		path: "/blog",
		pathFile: "admin/blog",
		permission: "blog:list",
		orderNo: 1,
		isShow: 1,
	},
	{
		key: "blog-category",
		parentKey: "blog",
		name: "Blog Category",
		type: 2,
		path: "/blog/category",
		pathFile: "admin/blog/category",
		permission: "blog:category:list",
		orderNo: 2,
		isShow: 1,
	},
	{
		key: "blog-tag",
		parentKey: "blog",
		name: "Blog Tag",
		type: 2,
		path: "/blog/tag",
		pathFile: "admin/blog/tag",
		permission: "blog:tag:list",
		orderNo: 3,
		isShow: 1,
	},
	{
		key: "blog-create",
		parentKey: "blog",
		name: "Blog Create",
		type: 2,
		path: "/blog/edit",
		pathFile: "admin/blog/create",
		permission: "blog:create",
		orderNo: 4,
		isShow: 0,
	},
	{
		key: "blog-edit",
		parentKey: "blog",
		name: "Blog Edit",
		type: 2,
		path: "/blog/edit/:id",
		pathFile: "admin/blog/edit",
		permission: "blog:update",
		orderNo: 5,
		isShow: 0,
	},
	{
		key: "blog-result",
		parentKey: "blog",
		name: "Blog Result",
		type: 2,
		path: "/blog/result",
		pathFile: "admin/blog/result",
		permission: "blog:list",
		orderNo: 6,
		isShow: 0,
	},
	{
		key: "profile",
		name: "Profile",
		type: 1,
		path: "/profile",
		icon: "UserOutlined",
		orderNo: 5,
		isShow: 1,
	},
	{
		key: "profile-account",
		parentKey: "profile",
		name: "Account",
		type: 2,
		path: "/profile/account",
		pathFile: "admin/profile/account",
		permission: "profile:account:list",
		orderNo: 1,
		isShow: 1,
	},
	{
		key: "profile-link-category",
		parentKey: "profile",
		name: "Link Category",
		type: 2,
		path: "/profile/link/category",
		pathFile: "admin/profile/link/category",
		permission: "profile:link-category:list",
		orderNo: 2,
		isShow: 1,
	},
	{
		key: "profile-link-list",
		parentKey: "profile",
		name: "Link List",
		type: 2,
		path: "/profile/link/category/:id",
		pathFile: "admin/profile/link/category-detail",
		permission: "profile:link:list",
		orderNo: 3,
		isShow: 0,
	},
	{
		key: "system",
		name: "System",
		type: 1,
		path: "/system",
		icon: "SettingOutlined",
		orderNo: 6,
		isShow: 1,
	},
	{
		key: "system-config",
		parentKey: "system",
		name: "Config",
		type: 2,
		path: "/system/config",
		pathFile: "admin/system/config",
		permission: "system:config:list",
		orderNo: 1,
		isShow: 1,
	},
	{
		key: "system-dept",
		parentKey: "system",
		name: "Department",
		type: 2,
		path: "/system/dept",
		pathFile: "admin/system/dept",
		permission: "system:dept:list",
		orderNo: 2,
		isShow: 1,
	},
	{
		key: "system-dict",
		parentKey: "system",
		name: "Dictionary",
		type: 2,
		path: "/system/dict",
		pathFile: "admin/system/dict",
		permission: "system:dict:list",
		orderNo: 3,
		isShow: 1,
	},
	{
		key: "system-dict-item",
		parentKey: "system",
		name: "Dictionary Item",
		type: 2,
		path: "/system/dict-item/:id",
		pathFile: "admin/system/dict-item",
		permission: "system:dict-item:list",
		orderNo: 4,
		isShow: 0,
	},
	{
		key: "system-menu",
		parentKey: "system",
		name: "Menu",
		type: 2,
		path: "/system/menu",
		pathFile: "admin/system/menu",
		permission: "system:menu:list",
		orderNo: 5,
		isShow: 1,
	},
	{
		key: "system-role",
		parentKey: "system",
		name: "Role",
		type: 2,
		path: "/system/role",
		pathFile: "admin/system/role",
		permission: "system:role:list",
		orderNo: 6,
		isShow: 1,
	},
	{
		key: "system-user",
		parentKey: "system",
		name: "User",
		type: 2,
		path: "/system/user",
		pathFile: "admin/system/user",
		permission: "system:user:list",
		orderNo: 7,
		isShow: 1,
	},
	{
		key: "system-monitor",
		parentKey: "system",
		name: "Monitor",
		type: 1,
		path: "/system/monitor",
		icon: "MonitorOutlined",
		orderNo: 8,
		isShow: 1,
	},
	{
		key: "system-monitor-loginlog",
		parentKey: "system-monitor",
		name: "Login Log",
		type: 2,
		path: "/system/monitor/login-log",
		pathFile: "admin/system/monitor/login-log",
		permission: "system:monitor:loginlog:list",
		orderNo: 1,
		isShow: 1,
	},
	{
		key: "system-monitor-serve",
		parentKey: "system-monitor",
		name: "Serve",
		type: 2,
		path: "/system/monitor/serve",
		pathFile: "admin/system/monitor/serve",
		permission: "system:monitor:serve:list",
		orderNo: 2,
		isShow: 1,
	},
	{
		key: "system-monitor-operate",
		parentKey: "system-monitor",
		name: "Operate",
		type: 2,
		path: "/system/monitor/moperate",
		pathFile: "admin/system/monitor/operate",
		permission: "system:monitor:operate:list",
		orderNo: 3,
		isShow: 1,
	},
	{
		key: "tools",
		name: "Tools",
		type: 1,
		path: "/tools",
		icon: "ToolOutlined",
		orderNo: 7,
		isShow: 1,
	},
	{
		key: "tools-mail",
		parentKey: "tools",
		name: "Mail",
		type: 2,
		path: "/tools/mail",
		pathFile: "admin/tools/mail",
		permission: "tools:mail:list",
		orderNo: 1,
		isShow: 1,
	},
	{
		key: "tools-mail-list",
		parentKey: "tools",
		name: "Mail List",
		type: 2,
		path: "/tools/mail/list",
		pathFile: "admin/tools/mail-list",
		permission: "tools:mail:list",
		orderNo: 2,
		isShow: 0,
	},
	{
		key: "tools-mail-detail",
		parentKey: "tools",
		name: "Mail Detail",
		type: 2,
		path: "/tools/mail/:id",
		pathFile: "admin/tools/mail-detail",
		permission: "tools:mail:read",
		orderNo: 3,
		isShow: 0,
	},
	{
		key: "tools-storage",
		parentKey: "tools",
		name: "Storage",
		type: 2,
		path: "/tools/storage",
		pathFile: "admin/tools/storage",
		permission: "tools:storage:list",
		orderNo: 4,
		isShow: 1,
	},
	{
		key: "about",
		name: "About",
		type: 2,
		path: "/about",
		pathFile: "admin/about",
		permission: "about:read",
		icon: "InfoCircleOutlined",
		orderNo: 8,
		isShow: 1,
	},
	{
		key: "perm-news-read",
		parentKey: "news-list",
		name: "News Read",
		type: 3,
		permission: "news:read",
		orderNo: 1,
		isShow: 0,
	},
	{
		key: "perm-news-create",
		parentKey: "news-list",
		name: "News Create",
		type: 3,
		permission: "news:create",
		orderNo: 2,
		isShow: 0,
	},
	{
		key: "perm-news-update",
		parentKey: "news-list",
		name: "News Update",
		type: 3,
		permission: "news:update",
		orderNo: 3,
		isShow: 0,
	},
	{
		key: "perm-news-delete",
		parentKey: "news-list",
		name: "News Delete",
		type: 3,
		permission: "news:delete",
		orderNo: 4,
		isShow: 0,
	},
	{
		key: "perm-news-category-read",
		parentKey: "news-category",
		name: "News Category Read",
		type: 3,
		permission: "news:category:read",
		orderNo: 1,
		isShow: 0,
	},
	{
		key: "perm-news-category-create",
		parentKey: "news-category",
		name: "News Category Create",
		type: 3,
		permission: "news:category:create",
		orderNo: 2,
		isShow: 0,
	},
	{
		key: "perm-news-category-update",
		parentKey: "news-category",
		name: "News Category Update",
		type: 3,
		permission: "news:category:update",
		orderNo: 3,
		isShow: 0,
	},
	{
		key: "perm-news-category-delete",
		parentKey: "news-category",
		name: "News Category Delete",
		type: 3,
		permission: "news:category:delete",
		orderNo: 4,
		isShow: 0,
	},
	{
		key: "perm-blog-read",
		parentKey: "blog-list",
		name: "Blog Read",
		type: 3,
		permission: "blog:read",
		orderNo: 1,
		isShow: 0,
	},
	{
		key: "perm-blog-create",
		parentKey: "blog-list",
		name: "Blog Create",
		type: 3,
		permission: "blog:create",
		orderNo: 2,
		isShow: 0,
	},
	{
		key: "perm-blog-update",
		parentKey: "blog-list",
		name: "Blog Update",
		type: 3,
		permission: "blog:update",
		orderNo: 3,
		isShow: 0,
	},
	{
		key: "perm-blog-delete",
		parentKey: "blog-list",
		name: "Blog Delete",
		type: 3,
		permission: "blog:delete",
		orderNo: 4,
		isShow: 0,
	},
	{
		key: "perm-blog-category-read",
		parentKey: "blog-category",
		name: "Blog Category Read",
		type: 3,
		permission: "blog:category:read",
		orderNo: 1,
		isShow: 0,
	},
	{
		key: "perm-blog-category-create",
		parentKey: "blog-category",
		name: "Blog Category Create",
		type: 3,
		permission: "blog:category:create",
		orderNo: 2,
		isShow: 0,
	},
	{
		key: "perm-blog-category-update",
		parentKey: "blog-category",
		name: "Blog Category Update",
		type: 3,
		permission: "blog:category:update",
		orderNo: 3,
		isShow: 0,
	},
	{
		key: "perm-blog-category-delete",
		parentKey: "blog-category",
		name: "Blog Category Delete",
		type: 3,
		permission: "blog:category:delete",
		orderNo: 4,
		isShow: 0,
	},
	{
		key: "perm-blog-tag-read",
		parentKey: "blog-tag",
		name: "Blog Tag Read",
		type: 3,
		permission: "blog:tag:read",
		orderNo: 1,
		isShow: 0,
	},
	{
		key: "perm-blog-tag-create",
		parentKey: "blog-tag",
		name: "Blog Tag Create",
		type: 3,
		permission: "blog:tag:create",
		orderNo: 2,
		isShow: 0,
	},
	{
		key: "perm-blog-tag-update",
		parentKey: "blog-tag",
		name: "Blog Tag Update",
		type: 3,
		permission: "blog:tag:update",
		orderNo: 3,
		isShow: 0,
	},
	{
		key: "perm-blog-tag-delete",
		parentKey: "blog-tag",
		name: "Blog Tag Delete",
		type: 3,
		permission: "blog:tag:delete",
		orderNo: 4,
		isShow: 0,
	},
	{
		key: "perm-profile-account-read",
		parentKey: "profile-account",
		name: "Account Read",
		type: 3,
		permission: "profile:account:read",
		orderNo: 1,
		isShow: 0,
	},
	{
		key: "perm-profile-account-create",
		parentKey: "profile-account",
		name: "Account Create",
		type: 3,
		permission: "profile:account:create",
		orderNo: 2,
		isShow: 0,
	},
	{
		key: "perm-profile-account-update",
		parentKey: "profile-account",
		name: "Account Update",
		type: 3,
		permission: "profile:account:update",
		orderNo: 3,
		isShow: 0,
	},
	{
		key: "perm-profile-account-delete",
		parentKey: "profile-account",
		name: "Account Delete",
		type: 3,
		permission: "profile:account:delete",
		orderNo: 4,
		isShow: 0,
	},
	{
		key: "perm-profile-link-read",
		parentKey: "profile-link-list",
		name: "Link Read",
		type: 3,
		permission: "profile:link:read",
		orderNo: 1,
		isShow: 0,
	},
	{
		key: "perm-profile-link-create",
		parentKey: "profile-link-list",
		name: "Link Create",
		type: 3,
		permission: "profile:link:create",
		orderNo: 2,
		isShow: 0,
	},
	{
		key: "perm-profile-link-update",
		parentKey: "profile-link-list",
		name: "Link Update",
		type: 3,
		permission: "profile:link:update",
		orderNo: 3,
		isShow: 0,
	},
	{
		key: "perm-profile-link-delete",
		parentKey: "profile-link-list",
		name: "Link Delete",
		type: 3,
		permission: "profile:link:delete",
		orderNo: 4,
		isShow: 0,
	},
	{
		key: "perm-profile-link-category-read",
		parentKey: "profile-link-category",
		name: "Link Category Read",
		type: 3,
		permission: "profile:link-category:read",
		orderNo: 1,
		isShow: 0,
	},
	{
		key: "perm-profile-link-category-create",
		parentKey: "profile-link-category",
		name: "Link Category Create",
		type: 3,
		permission: "profile:link-category:create",
		orderNo: 2,
		isShow: 0,
	},
	{
		key: "perm-profile-link-category-update",
		parentKey: "profile-link-category",
		name: "Link Category Update",
		type: 3,
		permission: "profile:link-category:update",
		orderNo: 3,
		isShow: 0,
	},
	{
		key: "perm-profile-link-category-delete",
		parentKey: "profile-link-category",
		name: "Link Category Delete",
		type: 3,
		permission: "profile:link-category:delete",
		orderNo: 4,
		isShow: 0,
	},
	{
		key: "perm-system-config-read",
		parentKey: "system-config",
		name: "Config Read",
		type: 3,
		permission: "system:config:read",
		orderNo: 1,
		isShow: 0,
	},
	{
		key: "perm-system-config-create",
		parentKey: "system-config",
		name: "Config Create",
		type: 3,
		permission: "system:config:create",
		orderNo: 2,
		isShow: 0,
	},
	{
		key: "perm-system-config-update",
		parentKey: "system-config",
		name: "Config Update",
		type: 3,
		permission: "system:config:update",
		orderNo: 3,
		isShow: 0,
	},
	{
		key: "perm-system-config-delete",
		parentKey: "system-config",
		name: "Config Delete",
		type: 3,
		permission: "system:config:delete",
		orderNo: 4,
		isShow: 0,
	},
	{
		key: "perm-system-dept-read",
		parentKey: "system-dept",
		name: "Department Read",
		type: 3,
		permission: "system:dept:read",
		orderNo: 1,
		isShow: 0,
	},
	{
		key: "perm-system-dept-create",
		parentKey: "system-dept",
		name: "Department Create",
		type: 3,
		permission: "system:dept:create",
		orderNo: 2,
		isShow: 0,
	},
	{
		key: "perm-system-dept-update",
		parentKey: "system-dept",
		name: "Department Update",
		type: 3,
		permission: "system:dept:update",
		orderNo: 3,
		isShow: 0,
	},
	{
		key: "perm-system-dept-delete",
		parentKey: "system-dept",
		name: "Department Delete",
		type: 3,
		permission: "system:dept:delete",
		orderNo: 4,
		isShow: 0,
	},
	{
		key: "perm-system-dict-read",
		parentKey: "system-dict",
		name: "Dictionary Read",
		type: 3,
		permission: "system:dict:read",
		orderNo: 1,
		isShow: 0,
	},
	{
		key: "perm-system-dict-create",
		parentKey: "system-dict",
		name: "Dictionary Create",
		type: 3,
		permission: "system:dict:create",
		orderNo: 2,
		isShow: 0,
	},
	{
		key: "perm-system-dict-update",
		parentKey: "system-dict",
		name: "Dictionary Update",
		type: 3,
		permission: "system:dict:update",
		orderNo: 3,
		isShow: 0,
	},
	{
		key: "perm-system-dict-delete",
		parentKey: "system-dict",
		name: "Dictionary Delete",
		type: 3,
		permission: "system:dict:delete",
		orderNo: 4,
		isShow: 0,
	},
	{
		key: "perm-system-dict-item-read",
		parentKey: "system-dict-item",
		name: "Dictionary Item Read",
		type: 3,
		permission: "system:dict-item:read",
		orderNo: 1,
		isShow: 0,
	},
	{
		key: "perm-system-dict-item-create",
		parentKey: "system-dict-item",
		name: "Dictionary Item Create",
		type: 3,
		permission: "system:dict-item:create",
		orderNo: 2,
		isShow: 0,
	},
	{
		key: "perm-system-dict-item-update",
		parentKey: "system-dict-item",
		name: "Dictionary Item Update",
		type: 3,
		permission: "system:dict-item:update",
		orderNo: 3,
		isShow: 0,
	},
	{
		key: "perm-system-dict-item-delete",
		parentKey: "system-dict-item",
		name: "Dictionary Item Delete",
		type: 3,
		permission: "system:dict-item:delete",
		orderNo: 4,
		isShow: 0,
	},
	{
		key: "perm-system-menu-read",
		parentKey: "system-menu",
		name: "Menu Read",
		type: 3,
		permission: "system:menu:read",
		orderNo: 1,
		isShow: 0,
	},
	{
		key: "perm-system-menu-create",
		parentKey: "system-menu",
		name: "Menu Create",
		type: 3,
		permission: "system:menu:create",
		orderNo: 2,
		isShow: 0,
	},
	{
		key: "perm-system-menu-update",
		parentKey: "system-menu",
		name: "Menu Update",
		type: 3,
		permission: "system:menu:update",
		orderNo: 3,
		isShow: 0,
	},
	{
		key: "perm-system-menu-delete",
		parentKey: "system-menu",
		name: "Menu Delete",
		type: 3,
		permission: "system:menu:delete",
		orderNo: 4,
		isShow: 0,
	},
	{
		key: "perm-system-menu-role-read",
		parentKey: "system-role",
		name: "Menu Role Read",
		type: 3,
		permission: "system:menu-role:read",
		orderNo: 4,
		isShow: 0,
	},
	{
		key: "perm-system-menu-role-list",
		parentKey: "system-role",
		name: "Menu Role List",
		type: 3,
		permission: "system:menu-role:list",
		orderNo: 5,
		isShow: 0,
	},
	{
		key: "perm-system-menu-role-create",
		parentKey: "system-role",
		name: "Menu Role Create",
		type: 3,
		permission: "system:menu-role:create",
		orderNo: 6,
		isShow: 0,
	},
	{
		key: "perm-system-menu-role-update",
		parentKey: "system-role",
		name: "Menu Role Update",
		type: 3,
		permission: "system:menu-role:update",
		orderNo: 7,
		isShow: 0,
	},
	{
		key: "perm-system-menu-role-delete",
		parentKey: "system-role",
		name: "Menu Role Delete",
		type: 3,
		permission: "system:menu-role:delete",
		orderNo: 8,
		isShow: 0,
	},
	{
		key: "perm-system-role-read",
		parentKey: "system-role",
		name: "Role Read",
		type: 3,
		permission: "system:role:read",
		orderNo: 9,
		isShow: 0,
	},
	{
		key: "perm-system-role-create",
		parentKey: "system-role",
		name: "Role Create",
		type: 3,
		permission: "system:role:create",
		orderNo: 10,
		isShow: 0,
	},
	{
		key: "perm-system-role-update",
		parentKey: "system-role",
		name: "Role Update",
		type: 3,
		permission: "system:role:update",
		orderNo: 11,
		isShow: 0,
	},
	{
		key: "perm-system-role-delete",
		parentKey: "system-role",
		name: "Role Delete",
		type: 3,
		permission: "system:role:delete",
		orderNo: 12,
		isShow: 0,
	},
	{
		key: "perm-system-user-read",
		parentKey: "system-user",
		name: "User Read",
		type: 3,
		permission: "system:user:read",
		orderNo: 1,
		isShow: 0,
	},
	{
		key: "perm-system-user-create",
		parentKey: "system-user",
		name: "User Create",
		type: 3,
		permission: "system:user:create",
		orderNo: 2,
		isShow: 0,
	},
	{
		key: "perm-system-user-update",
		parentKey: "system-user",
		name: "User Update",
		type: 3,
		permission: "system:user:update",
		orderNo: 3,
		isShow: 0,
	},
	{
		key: "perm-system-user-delete",
		parentKey: "system-user",
		name: "User Delete",
		type: 3,
		permission: "system:user:delete",
		orderNo: 4,
		isShow: 0,
	},
	{
		key: "perm-system-monitor-loginlog-read",
		parentKey: "system-monitor-loginlog",
		name: "Login Log Read",
		type: 3,
		permission: "system:monitor:loginlog:read",
		orderNo: 1,
		isShow: 0,
	},
	{
		key: "perm-system-monitor-loginlog-create",
		parentKey: "system-monitor-loginlog",
		name: "Login Log Create",
		type: 3,
		permission: "system:monitor:loginlog:create",
		orderNo: 2,
		isShow: 0,
	},
	{
		key: "perm-system-monitor-loginlog-update",
		parentKey: "system-monitor-loginlog",
		name: "Login Log Update",
		type: 3,
		permission: "system:monitor:loginlog:update",
		orderNo: 3,
		isShow: 0,
	},
	{
		key: "perm-system-monitor-loginlog-delete",
		parentKey: "system-monitor-loginlog",
		name: "Login Log Delete",
		type: 3,
		permission: "system:monitor:loginlog:delete",
		orderNo: 4,
		isShow: 0,
	},
	{
		key: "perm-system-monitor-serve-read",
		parentKey: "system-monitor-serve",
		name: "Serve Read",
		type: 3,
		permission: "system:monitor:serve:read",
		orderNo: 1,
		isShow: 0,
	},
	{
		key: "perm-system-monitor-serve-create",
		parentKey: "system-monitor-serve",
		name: "Serve Create",
		type: 3,
		permission: "system:monitor:serve:create",
		orderNo: 2,
		isShow: 0,
	},
	{
		key: "perm-system-monitor-serve-update",
		parentKey: "system-monitor-serve",
		name: "Serve Update",
		type: 3,
		permission: "system:monitor:serve:update",
		orderNo: 3,
		isShow: 0,
	},
	{
		key: "perm-system-monitor-serve-delete",
		parentKey: "system-monitor-serve",
		name: "Serve Delete",
		type: 3,
		permission: "system:monitor:serve:delete",
		orderNo: 4,
		isShow: 0,
	},
	{
		key: "perm-system-monitor-operate-read",
		parentKey: "system-monitor-operate",
		name: "Operate Read",
		type: 3,
		permission: "system:monitor:operate:read",
		orderNo: 1,
		isShow: 0,
	},
	{
		key: "perm-system-monitor-operate-create",
		parentKey: "system-monitor-operate",
		name: "Operate Create",
		type: 3,
		permission: "system:monitor:operate:create",
		orderNo: 2,
		isShow: 0,
	},
	{
		key: "perm-system-monitor-operate-update",
		parentKey: "system-monitor-operate",
		name: "Operate Update",
		type: 3,
		permission: "system:monitor:operate:update",
		orderNo: 3,
		isShow: 0,
	},
	{
		key: "perm-system-monitor-operate-delete",
		parentKey: "system-monitor-operate",
		name: "Operate Delete",
		type: 3,
		permission: "system:monitor:operate:delete",
		orderNo: 4,
		isShow: 0,
	},
	{
		key: "perm-tools-mail-read",
		parentKey: "tools-mail",
		name: "Mail Read",
		type: 3,
		permission: "tools:mail:read",
		orderNo: 1,
		isShow: 0,
	},
	{
		key: "perm-tools-mail-create",
		parentKey: "tools-mail",
		name: "Mail Create",
		type: 3,
		permission: "tools:mail:create",
		orderNo: 2,
		isShow: 0,
	},
	{
		key: "perm-tools-mail-update",
		parentKey: "tools-mail",
		name: "Mail Update",
		type: 3,
		permission: "tools:mail:update",
		orderNo: 3,
		isShow: 0,
	},
	{
		key: "perm-tools-mail-delete",
		parentKey: "tools-mail",
		name: "Mail Delete",
		type: 3,
		permission: "tools:mail:delete",
		orderNo: 4,
		isShow: 0,
	},
	{
		key: "perm-tools-storage-read",
		parentKey: "tools-storage",
		name: "Storage Read",
		type: 3,
		permission: "tools:storage:read",
		orderNo: 1,
		isShow: 0,
	},
	{
		key: "perm-tools-storage-create",
		parentKey: "tools-storage",
		name: "Storage Create",
		type: 3,
		permission: "tools:storage:create",
		orderNo: 2,
		isShow: 0,
	},
	{
		key: "perm-tools-storage-update",
		parentKey: "tools-storage",
		name: "Storage Update",
		type: 3,
		permission: "tools:storage:update",
		orderNo: 3,
		isShow: 0,
	},
	{
		key: "perm-tools-storage-delete",
		parentKey: "tools-storage",
		name: "Storage Delete",
		type: 3,
		permission: "tools:storage:delete",
		orderNo: 4,
		isShow: 0,
	},
];

async function ensureMenuItem(data: MenuSeed, parentMenuId: number | null) {
	const conditions = [
		eq(menus.name, data.name),
		eq(menus.type, data.type),
	];
	if (data.path === null || data.path === undefined) {
		conditions.push(isNull(menus.path));
	} else {
		conditions.push(eq(menus.path, data.path));
	}
	if (data.permission === null || data.permission === undefined) {
		conditions.push(isNull(menus.permission));
	} else {
		conditions.push(eq(menus.permission, data.permission));
	}
	if (parentMenuId === null) {
		conditions.push(isNull(menus.parentMenuId));
	} else {
		conditions.push(eq(menus.parentMenuId, parentMenuId));
	}

	const existing = await db
		.select()
		.from(menus)
		.where(and(...conditions))
		.limit(1);
	const found = existing[0];
	if (found) return found;

	const created = await db
		.insert(menus)
		.values({
			name: data.name,
			type: data.type,
			path: data.path ?? null,
			pathFile: data.pathFile ?? null,
			permission: data.permission ?? null,
			icon: data.icon ?? null,
			status: data.status ?? 1,
			isShow: data.isShow ?? 1,
			isCache: data.isCache ?? 0,
			isLink: data.isLink ?? 0,
			orderNo: data.orderNo ?? 1,
			description: data.description ?? null,
			remark: data.remark ?? null,
			parentMenuId,
		})
		.returning();
	return created[0];
}

async function ensureMenus() {
	const menuIds = new Map<string, number>();
	const remaining = [...menuSeeds];
	let progress = true;
	while (remaining.length && progress) {
		progress = false;
		for (let i = remaining.length - 1; i >= 0; i -= 1) {
			const item = remaining[i];
			const parentKey = item.parentKey ?? null;
			if (parentKey && !menuIds.has(parentKey)) {
				continue;
			}
			const parentMenuId = parentKey ? menuIds.get(parentKey)! : null;
			const record = await ensureMenuItem(item, parentMenuId);
			menuIds.set(item.key, record.id);
			remaining.splice(i, 1);
			progress = true;
		}
	}
	if (remaining.length) {
		const keys = remaining.map((item) => item.key).join(", ");
		throw new Error(`menu seed unresolved parents: ${keys}`);
	}
	return menuIds;
}

async function ensureUser({
	name,
	nickname,
	email,
	password,
	departmentId,
}: {
	name: string;
	nickname: string;
	email: string;
	password: string;
	departmentId: number;
}) {
	const existing = await db
		.select()
		.from(user)
		.where(eq(user.email, email.toLowerCase()))
		.limit(1);
	const found = existing[0];
	if (found) return found;

	// @ts-expect-error - better-auth endpoint typing is stricter than server usage
	await auth.api.signUpEmail({
		body: {
			name,
			email,
			password,
		},
	});

	const created = await db
		.select()
		.from(user)
		.where(eq(user.email, email.toLowerCase()))
		.limit(1);
	if (!created[0]) {
		throw new Error("create user fail");
	}
	const updated = await db
		.update(user)
		.set({
			nickname,
			status: 1,
			departmentId,
		})
		.where(eq(user.id, created[0].id))
		.returning();
	return updated[0] ?? created[0];
}

async function ensureUserRole(userId: string, roleId: number) {
	const existing = await db
		.select()
		.from(userRoles)
		.where(and(eq(userRoles.userId, userId), eq(userRoles.roleId, roleId)))
		.limit(1);
	const found = existing[0];
	if (found) return found;
	const created = await db
		.insert(userRoles)
		.values({ userId, roleId })
		.returning();
	return created[0];
}

async function ensureMenuRole(menuId: number, roleId: number) {
	const existing = await db
		.select()
		.from(menuRoles)
		.where(and(eq(menuRoles.menuId, menuId), eq(menuRoles.roleId, roleId)))
		.limit(1);
	const found = existing[0];
	if (found) return found;
	const created = await db
		.insert(menuRoles)
		.values({ menuId, roleId })
		.returning();
	return created[0];
}

function collectDescendantIds(allMenus: { id: number; parentMenuId: number | null }[], rootIds: number[]) {
	const byParent = new Map<number, number[]>();
	for (const item of allMenus) {
		if (item.parentMenuId === null) continue;
		const list = byParent.get(item.parentMenuId) ?? [];
		list.push(item.id);
		byParent.set(item.parentMenuId, list);
	}
	const result = new Set<number>(rootIds);
	const queue = [...rootIds];
	while (queue.length) {
		const current = queue.shift()!;
		const children = byParent.get(current) ?? [];
		for (const child of children) {
			if (!result.has(child)) {
				result.add(child);
				queue.push(child);
			}
		}
	}
	return Array.from(result);
}

async function main() {
	const department = await ensureDepartment();
	const roleMap = await ensureRoles();
	const menuIds = await ensureMenus();

	const superAdmin = await ensureUser({
		name: "superadmin",
		nickname: "Super Admin",
		email: "superadmin@example.com",
		password: "superadmin123456",
		departmentId: department.id,
	});
	const admin = await ensureUser({
		name: "admin",
		nickname: "Administrator",
		email: "admin@example.com",
		password: "admin123456",
		departmentId: department.id,
	});
	const normalUser = await ensureUser({
		name: "user",
		nickname: "User",
		email: "user@example.com",
		password: "user123456",
		departmentId: department.id,
	});

	const superAdminRole = roleMap.super_admin ?? roleMap.admin;
	const adminRole = roleMap.admin ?? roleMap.super_admin;
	const userRole = roleMap.user ?? roleMap.admin;

	if (superAdminRole) {
		await ensureUserRole(superAdmin.id, superAdminRole.id);
		const allMenus = await db.select().from(menus);
		for (const item of allMenus) {
			await ensureMenuRole(item.id, superAdminRole.id);
		}
	}

	if (adminRole) {
		await ensureUserRole(admin.id, adminRole.id);
		const adminRoots = new Set([
			"dashboard",
			"ai",
			"news",
			"blog",
			"profile",
			"tools",
			"about",
		]);
		const allMenus = await db.select().from(menus);
		const adminRootIds = Array.from(adminRoots)
			.map((key) => menuIds.get(key))
			.filter((id): id is number => Number.isFinite(id));
		const adminMenuIds = collectDescendantIds(allMenus, adminRootIds);
		for (const id of adminMenuIds) {
			await ensureMenuRole(id, adminRole.id);
		}
	}

	if (userRole) {
		await ensureUserRole(normalUser.id, userRole.id);
		const userRoots = new Set(["dashboard", "profile", "about"]);
		const allMenus = await db.select().from(menus);
		const userRootIds = Array.from(userRoots)
			.map((key) => menuIds.get(key))
			.filter((id): id is number => Number.isFinite(id));
		const userMenuIds = collectDescendantIds(allMenus, userRootIds);
		for (const id of userMenuIds) {
			await ensureMenuRole(id, userRole.id);
		}
	}
}

main()
	.catch((error) => {
		console.error("Seed failed:", error);
		process.exitCode = 1;
	})
	.finally(async () => {
		// Neon HTTP client does not require explicit disconnect
		console.log("Seed completed.");
	});
