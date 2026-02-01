class Auth {
	superAdminName = "Super Admin";
	adminName = "Admin";
	superAdminId = 1;
	adminId = 2;
	isSuperAdmin(record: any) {
		return (
			record.name === this.superAdminName || record.id === this.superAdminId
		);
	}
	isAdmin(record: any) {
		return record.name === this.adminName || record.id === this.adminId;
	}
	isUser(record: any) {
		return !this.isSuperAdmin(record) && !this.isAdmin(record);
	}
}

export const auth = new Auth();
