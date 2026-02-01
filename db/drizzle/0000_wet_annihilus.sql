CREATE TABLE "blog_category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"user_id" integer NOT NULL,
	CONSTRAINT "blog_category_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "blog_tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"user_id" integer NOT NULL,
	CONSTRAINT "blog_tag_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "blog" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"author" text,
	"source" text,
	"viewCount" integer DEFAULT 0 NOT NULL,
	"publishedAt" timestamp NOT NULL,
	"category_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "change_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"publish_name" text NOT NULL,
	"publish_version" text NOT NULL,
	"publish_time" timestamp NOT NULL,
	"type" integer NOT NULL,
	"content" text NOT NULL,
	"url" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "sys_department" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"order_no" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp,
	"parent_department_id" integer
);
--> statement-breakpoint
CREATE TABLE "sys_dictionary" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"description" text,
	"remark" text,
	"status" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "sys_dictionary_entry" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"value" text NOT NULL,
	"order_no" integer,
	"status" integer NOT NULL,
	"remark" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp,
	"dictionary_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "feed_back" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"content" text NOT NULL,
	"url" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "profile_link_category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profile_link" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"description" text,
	"category_id" integer NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sys_loginlog" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"ip" text,
	"address" text,
	"login_at" timestamp DEFAULT now() NOT NULL,
	"system" text,
	"browser" text,
	"userId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mail" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"title" text,
	"host" text,
	"port" integer,
	"user" text,
	"pass" text,
	"from" text,
	"to" text,
	"subject" text,
	"content" text,
	"html" text,
	"text" text
);
--> statement-breakpoint
CREATE TABLE "sys_menu_role" (
	"id" serial PRIMARY KEY NOT NULL,
	"role_id" integer NOT NULL,
	"menu_id" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "sys_menu" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" integer NOT NULL,
	"description" text,
	"remark" text,
	"icon" text,
	"path" text,
	"path_file" text,
	"status" integer,
	"isShow" integer,
	"isCache" integer,
	"permission" text,
	"isLink" integer,
	"order_no" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp,
	"parent_menu_id" integer
);
--> statement-breakpoint
CREATE TABLE "news" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"author" text,
	"source" text,
	"viewCount" integer DEFAULT 0 NOT NULL,
	"publishedAt" timestamp NOT NULL,
	"news_id" integer NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "news_category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"user_id" integer NOT NULL,
	CONSTRAINT "news_category_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "Operate" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"username" text,
	"path" text NOT NULL,
	"url" text NOT NULL,
	"method" text NOT NULL,
	"ip_address" text,
	"status_code" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sys_role" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"value" text NOT NULL,
	"description" text,
	"remark" text,
	"status" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "tools_storage" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp,
	"user_id" integer NOT NULL,
	"name" text NOT NULL,
	"file_name" text NOT NULL,
	"ext_name" text NOT NULL,
	"path" text NOT NULL,
	"size" text NOT NULL,
	"type" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sys_user_role" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"role_id" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_sign_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"sign_type" integer NOT NULL,
	"sign_time" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_sign" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"resign_nums" integer NOT NULL,
	"signed_nums" integer NOT NULL,
	"continuity_signed_nums" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sys_user" (
	"id" serial PRIMARY KEY NOT NULL,
	"avatar" text,
	"email" text,
	"name" text NOT NULL,
	"nickname" text,
	"password" text NOT NULL,
	"lang" text DEFAULT 'en-US' NOT NULL,
	"theme" text DEFAULT 'light' NOT NULL,
	"phone" text,
	"remark" text,
	"status" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp,
	"department_id" integer
);
--> statement-breakpoint
ALTER TABLE "blog" ADD CONSTRAINT "blog_category_id_blog_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."blog_category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog" ADD CONSTRAINT "blog_tag_id_blog_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."blog_tag"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sys_department" ADD CONSTRAINT "sys_department_parent_fk" FOREIGN KEY ("parent_department_id") REFERENCES "public"."sys_department"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sys_dictionary_entry" ADD CONSTRAINT "sys_dictionary_entry_dictionary_id_sys_dictionary_id_fk" FOREIGN KEY ("dictionary_id") REFERENCES "public"."sys_dictionary"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile_link" ADD CONSTRAINT "profile_link_category_id_profile_link_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."profile_link_category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sys_menu_role" ADD CONSTRAINT "sys_menu_role_role_id_sys_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."sys_role"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sys_menu_role" ADD CONSTRAINT "sys_menu_role_menu_id_sys_menu_id_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."sys_menu"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sys_menu" ADD CONSTRAINT "sys_menu_parent_fk" FOREIGN KEY ("parent_menu_id") REFERENCES "public"."sys_menu"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "news" ADD CONSTRAINT "news_news_id_news_category_id_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news_category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sys_user_role" ADD CONSTRAINT "sys_user_role_user_id_sys_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."sys_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sys_user_role" ADD CONSTRAINT "sys_user_role_role_id_sys_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."sys_role"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sys_user" ADD CONSTRAINT "sys_user_department_id_sys_department_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."sys_department"("id") ON DELETE cascade ON UPDATE no action;