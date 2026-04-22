CREATE TABLE `sys_config` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`key` text NOT NULL,
	`value` text NOT NULL,
	`description` text,
	`remark` text,
	`type` integer,
	`status` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
