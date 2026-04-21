ALTER TABLE `news` ADD `status` integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE `news_category` ADD `visible` integer DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `profile_link` ADD `created_at` integer;--> statement-breakpoint
ALTER TABLE `profile_link` ADD `updated_at` integer;