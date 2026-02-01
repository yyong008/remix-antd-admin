import "./index";

export enum Roles {
	SuperAdmin = 1,
	Admin = 2,
	User = 3,
}

export type TPage = {
	page?: number;
	pageSize?: number;
	name?: string;
	role?: string;
};

export enum SortOrder {
	ASCENDING = "asc",
	DESCENDING = "desc",
}

export type RoleDataMenusItem = {
	id: number;
	roleId: number;
	menuId: number;
};

export type RoleData = {
	name: string;
	description: string;
	remark: string;
	status: number;
	value: string;
	menus: RoleDataMenusItem[];
};

export type UpdateRoleData = RoleData & { id: number };
