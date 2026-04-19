CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` text,
	`refresh_token_expires_at` text,
	`scope` text,
	`password` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `blog_category` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_category_name_unique` ON `blog_category` (`name`);--> statement-breakpoint
CREATE TABLE `blog_tag` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_tag_name_unique` ON `blog_tag` (`name`);--> statement-breakpoint
CREATE TABLE `blog` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`author` text,
	`source` text,
	`viewCount` integer DEFAULT 0 NOT NULL,
	`publishedAt` text NOT NULL,
	`category_id` text NOT NULL,
	`tag_id` text NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `blog_category`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `blog_tag`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `change_log` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`publish_name` text NOT NULL,
	`publish_version` text NOT NULL,
	`publish_time` text NOT NULL,
	`type` integer NOT NULL,
	`content` text NOT NULL,
	`url` text NOT NULL,
	`createdAt` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`updatedAt` text,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sys_department` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`order_no` integer,
	`createdAt` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`updatedAt` text,
	`parent_department_id` text,
	FOREIGN KEY (`parent_department_id`) REFERENCES `sys_department`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `sys_dictionary` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`code` text NOT NULL,
	`description` text,
	`remark` text,
	`status` integer,
	`createdAt` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`updatedAt` text
);
--> statement-breakpoint
CREATE TABLE `sys_dictionary_entry` (
	`id` text PRIMARY KEY NOT NULL,
	`key` text NOT NULL,
	`value` text NOT NULL,
	`order_no` integer,
	`status` integer NOT NULL,
	`remark` text,
	`createdAt` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`updatedAt` text,
	`dictionary_id` text NOT NULL,
	FOREIGN KEY (`dictionary_id`) REFERENCES `sys_dictionary`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `feed_back` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`content` text NOT NULL,
	`url` text,
	`createdAt` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`updatedAt` text,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `profile_link_category` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `profile_link` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL,
	`description` text,
	`category_id` text NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `profile_link_category`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sys_loginlog` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`ip` text,
	`address` text,
	`login_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`system` text,
	`browser` text,
	`userId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `mail` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`title` text,
	`host` text,
	`port` integer,
	`user` text,
	`pass` text,
	`from` text,
	`to` text,
	`subject` text,
	`content` text,
	`html` text,
	`text` text
);
--> statement-breakpoint
CREATE TABLE `sys_menu_role` (
	`id` text PRIMARY KEY NOT NULL,
	`role_id` text NOT NULL,
	`menu_id` text NOT NULL,
	`createdAt` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`updatedAt` text,
	FOREIGN KEY (`role_id`) REFERENCES `sys_role`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`menu_id`) REFERENCES `sys_menu`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sys_menu` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` integer NOT NULL,
	`description` text,
	`remark` text,
	`icon` text,
	`path` text,
	`path_file` text,
	`status` integer,
	`isShow` integer,
	`isCache` integer,
	`permission` text,
	`isLink` integer,
	`order_no` integer,
	`createdAt` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`updatedAt` text,
	`parent_menu_id` text,
	FOREIGN KEY (`parent_menu_id`) REFERENCES `sys_menu`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `news` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`author` text,
	`source` text,
	`viewCount` integer DEFAULT 0 NOT NULL,
	`publishedAt` text NOT NULL,
	`news_id` text NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`news_id`) REFERENCES `news_category`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `news_category` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `news_category_name_unique` ON `news_category` (`name`);--> statement-breakpoint
CREATE TABLE `Operate` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`username` text,
	`path` text NOT NULL,
	`url` text NOT NULL,
	`method` text NOT NULL,
	`ip_address` text,
	`status_code` integer NOT NULL,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sys_role` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`value` text NOT NULL,
	`description` text,
	`remark` text,
	`status` integer,
	`createdAt` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`updatedAt` text
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` text NOT NULL,
	`token` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` text NOT NULL,
	`impersonated_by` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE TABLE `tools_storage` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`updatedAt` text,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`file_name` text NOT NULL,
	`ext_name` text NOT NULL,
	`path` text NOT NULL,
	`size` text NOT NULL,
	`type` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer NOT NULL,
	`image` text,
	`nickname` text,
	`avatar` text,
	`locale` text DEFAULT 'en-US' NOT NULL,
	`theme` text DEFAULT 'light' NOT NULL,
	`phone` text,
	`remark` text,
	`status` integer,
	`department_id` integer,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`role` text,
	`banned` integer,
	`ban_reason` text,
	`ban_expires` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `sys_user_role` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`role_id` text NOT NULL,
	`createdAt` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`updatedAt` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`role_id`) REFERENCES `sys_role`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_sign_log` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`sign_type` integer NOT NULL,
	`sign_time` text NOT NULL,
	`createdAt` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	`updatedAt` text,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_sign` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`resign_nums` integer NOT NULL,
	`signed_nums` integer NOT NULL,
	`continuity_signed_nums` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` text NOT NULL,
	`created_at` text,
	`updated_at` text
);
