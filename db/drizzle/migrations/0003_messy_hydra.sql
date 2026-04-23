ALTER TABLE `news` ADD `status` integer DEFAULT 1 NOT NULL;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_blog` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`author` text NOT NULL,
	`viewCount` integer DEFAULT 0 NOT NULL,
	`published_at` integer NOT NULL,
	`is_published` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`category_id` text NOT NULL,
	`tag_id` text NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `blog_category`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `blog_tag`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_blog`("id", "title", "content", "author", "viewCount", "published_at", "is_published", "created_at", "updated_at", "category_id", "tag_id", "user_id") SELECT "id", "title", "content", "author", "viewCount", "published_at", "is_published", "created_at", "updated_at", "category_id", "tag_id", "user_id" FROM `blog`;--> statement-breakpoint
DROP TABLE `blog`;--> statement-breakpoint
ALTER TABLE `__new_blog` RENAME TO `blog`;--> statement-breakpoint
PRAGMA foreign_keys=ON;