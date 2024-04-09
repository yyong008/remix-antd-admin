--
-- SQLiteStudio v3.4.4 生成的文件，周三 4月 10 04:17:29 2024
--
-- 所用的文本编码：UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- 表：_prisma_migrations
DROP TABLE IF EXISTS _prisma_migrations;
CREATE TABLE "_prisma_migrations" (
    "id"                    TEXT PRIMARY KEY NOT NULL,
    "checksum"              TEXT NOT NULL,
    "finished_at"           DATETIME,
    "migration_name"        TEXT NOT NULL,
    "logs"                  TEXT,
    "rolled_back_at"        DATETIME,
    "started_at"            DATETIME NOT NULL DEFAULT current_timestamp,
    "applied_steps_count"   INTEGER UNSIGNED NOT NULL DEFAULT 0
);
INSERT INTO _prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('bec29a31-4139-48d4-8c3e-a2fc227075a1', '0f556204a3aa943196217aa739df36173ebaed30e6ec50cff04659a6cccd9326', 1711880751470, '20240331102551_init', NULL, NULL, 1711880751403, 1);
INSERT INTO _prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('51c3e7df-4fb5-481b-92c5-29dbc7cbf5fa', '084b82b51ade1b1efe70560368e32c56b5e123393ac941bd6de0ffcdced96d8c', 1711882672633, '20240331105752_tool_storage', NULL, NULL, 1711882672617, 1);
INSERT INTO _prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('b68e2fb4-cc5a-496c-8c07-a8e7ec97d04f', 'f2f7033c24ba71f3867e2f49bc972cde8eae44c2c421c6552bc00bce81c3cfc8', 1711883248525, '20240331110728_storage_user_id', NULL, NULL, 1711883248491, 1);
INSERT INTO _prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('579d391a-46f0-4515-a4f1-01cebd37d963', 'c72b55b285288737f8fb8866d313cde339c2596eea556e0479bf6be7d2c6cca2', 1711884074772, '20240331112114_storage_size', NULL, NULL, 1711884074737, 1);
INSERT INTO _prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('013c9c97-d317-4a43-ac85-c30d8cd4a099', '5f821070cd3a9778fcc495ba96866b2a9e9cf7fe2316ac08e856dd5dc709c4f4', 1711884266902, '20240331112426_', NULL, NULL, 1711884266867, 1);
INSERT INTO _prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('9c29ae38-66a7-45da-b214-c1060d2c2a9c', 'e5ebfac911ceb415085425b1845671dab9f34b381149d48f2bd40412871cf505', 1711954999617, '20240401070319_link', NULL, NULL, 1711954999594, 1);
INSERT INTO _prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('c593075c-b12b-4044-82ef-f71e3bfe1409', '600c3acbed2b0758e59b1fabcdd1e9521a4073701c33446b693119de65e5277a', 1711961753141, '20240401085553_link_name', NULL, NULL, 1711961753099, 1);

-- 表：blog
DROP TABLE IF EXISTS blog;
CREATE TABLE "blog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT,
    "source" TEXT,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" DATETIME NOT NULL,
    "category_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "blog_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "blog_category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "blog_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "blog_tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO blog (id, title, content, author, source, viewCount, publishedAt, category_id, tag_id, user_id) VALUES (1, 'JetBrains 全家桶 2024 首个大版本更新 (2024.1)', '<p>sdfsdf</p>', 'sdf', 'sdf', 0, 1712073602000, 1, 1, 1);

-- 表：blog_category
DROP TABLE IF EXISTS blog_category;
CREATE TABLE "blog_category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "user_id" INTEGER NOT NULL
);
INSERT INTO blog_category (id, name, description, user_id) VALUES (1, '编程', '', 1);
INSERT INTO blog_category (id, name, description, user_id) VALUES (2, '开发者手册', 'dfg', 1);
INSERT INTO blog_category (id, name, description, user_id) VALUES (3, '算法与数学', '算法与数学', 1);

-- 表：blog_tag
DROP TABLE IF EXISTS blog_tag;
CREATE TABLE "blog_tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "user_id" INTEGER NOT NULL
);
INSERT INTO blog_tag (id, name, description, user_id) VALUES (1, 'React', '前端框架', 1);
INSERT INTO blog_tag (id, name, description, user_id) VALUES (2, 'Vue', '前端框架', 1);
INSERT INTO blog_tag (id, name, description, user_id) VALUES (3, 'Express', '后端框架', 1);

-- 表：news
DROP TABLE IF EXISTS news;
CREATE TABLE "news" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT,
    "source" TEXT,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" DATETIME NOT NULL,
    "news_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "news_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "news_category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO news (id, title, content, author, source, viewCount, publishedAt, news_id, user_id) VALUES (1, 'Bun 1.1 版本震撼发布，Windows 支持来了', 'JavaScript 开发者们瞩目已久的 Bun 1.1 版本终于正式发布了！这次大版本更新带来了一系列令人兴奋的新特性和显著的性能提升，将为开发者们提供更加顺畅、高效的开发体验。

首先，让我们为 Bun 1.1 支持 Windows 而欢呼吧！是的，你没有看错，现在 Windows 开发者也能享受到 Bun 带来的极速体验了。通过一行简单的 PowerShell 命令，即可在 Windows 10 及以上系统安装 Bun。更令人惊喜的是，Bun 在 Windows 上的测试覆盖率已经达到了 98%，这意味着你能在 Windows 上尽情使用 Bun 的各项功能，与 macOS 和 Linux 版本几乎完全一致。

说到速度，Bun 1.1 在各个方面都有了大幅提升。在 Windows 上进行依赖安装时，Bun 的表现尤其亮眼。以安装一个 Vite React 应用为例，使用 Bun，安装速度比 Yarn 快 18 倍，比 npm 更是快了 30 倍之多！Bun 还对 Windows 上的文件系统操作进行了深度优化，例如递归读取目录的速度比 Node.js 快了 22 倍。

Bun 1.1 对 Node.js 兼容性的改进也非常显著。不仅修复了上千个 bug，还新增了大量 Node.js API 的支持。现在你可以在 Bun 中使用 HTTP/2 客户端、递归的 fs.readdir()、进程间通信等功能了。值得一提的是，Bun 还支持许多 Node.js 中没有文档说明的内部 API，让你的 npm 包可以在 Bun 下平滑迁移，而无需修改代码。

作为一个多才多艺的 JavaScript 运行时，Bun 1.1 在打包、测试、SQLite 支持等方面也有诸多亮点。全新的 bun build --target=node 命令让你轻松将 TypeScript 代码打包成可在 Node.js 下运行的文件。而 bun build --compile 命令更是一个黑科技，它能将你的 JS/TS 代码连同 SQLite 数据库一起编译成一个单文件可执行程序！

说到 SQLite，Bun 1.1 内置了一个高性能的 SQLite 接口，并且支持了多语句查询、导入预置数据库等实用功能。结合编译成单文件 exe 的功能，Bun 让嵌入式数据库应用开发变得无比简单高效。

当然，Bun 1.1 在开发者体验方面也下了不少功夫。语法高亮的错误堆栈、更加简洁的调用栈信息、bun --eval 命令行直接执行脚本……Bun 力求为开发者提供更加友好便捷的使用体验。

还有很多很多的新特性，在这里无法一一列举。但可以肯定的是，Bun 1.1 是一个里程碑式的版本，它以其卓越的性能、丰富的功能和贴心的开发体验，势必将 JavaScript 开发推向一个新的高度。期待 Bun 在未来为我们带来更多惊喜！', 'andalousie', '投稿', 0, 1711987201000, 1, 1);
INSERT INTO news (id, title, content, author, source, viewCount, publishedAt, news_id, user_id) VALUES (2, '搜索引擎大变局：向左AI，向右收费', 'JavaScript 开发者们瞩目已久的 Bun 1.1 版本终于正式发布了！这次大版本更新带来了一系列令人兴奋的新特性和显著的性能提升，将为开发者们提供更加顺畅、高效的开发体验。

首先，让我们为 Bun 1.1 支持 Windows 而欢呼吧！是的，你没有看错，现在 Windows 开发者也能享受到 Bun 带来的极速体验了。通过一行简单的 PowerShell 命令，即可在 Windows 10 及以上系统安装 Bun。更令人惊喜的是，Bun 在 Windows 上的测试覆盖率已经达到了 98%，这意味着你能在 Windows 上尽情使用 Bun 的各项功能，与 macOS 和 Linux 版本几乎完全一致。

说到速度，Bun 1.1 在各个方面都有了大幅提升。在 Windows 上进行依赖安装时，Bun 的表现尤其亮眼。以安装一个 Vite React 应用为例，使用 Bun，安装速度比 Yarn 快 18 倍，比 npm 更是快了 30 倍之多！Bun 还对 Windows 上的文件系统操作进行了深度优化，例如递归读取目录的速度比 Node.js 快了 22 倍。

Bun 1.1 对 Node.js 兼容性的改进也非常显著。不仅修复了上千个 bug，还新增了大量 Node.js API 的支持。现在你可以在 Bun 中使用 HTTP/2 客户端、递归的 fs.readdir()、进程间通信等功能了。值得一提的是，Bun 还支持许多 Node.js 中没有文档说明的内部 API，让你的 npm 包可以在 Bun 下平滑迁移，而无需修改代码。

作为一个多才多艺的 JavaScript 运行时，Bun 1.1 在打包、测试、SQLite 支持等方面也有诸多亮点。全新的 bun build --target=node 命令让你轻松将 TypeScript 代码打包成可在 Node.js 下运行的文件。而 bun build --compile 命令更是一个黑科技，它能将你的 JS/TS 代码连同 SQLite 数据库一起编译成一个单文件可执行程序！

说到 SQLite，Bun 1.1 内置了一个高性能的 SQLite 接口，并且支持了多语句查询、导入预置数据库等实用功能。结合编译成单文件 exe 的功能，Bun 让嵌入式数据库应用开发变得无比简单高效。

当然，Bun 1.1 在开发者体验方面也下了不少功夫。语法高亮的错误堆栈、更加简洁的调用栈信息、bun --eval 命令行直接执行脚本……Bun 力求为开发者提供更加友好便捷的使用体验。

还有很多很多的新特性，在这里无法一一列举。但可以肯定的是，Bun 1.1 是一个里程碑式的版本，它以其卓越的性能、丰富的功能和贴心的开发体验，势必将 JavaScript 开发推向一个新的高度。期待 Bun 在未来为我们带来更多惊喜！', 'asfsadf', 'asdf', 0, 1712419200000, 2, 1);
INSERT INTO news (id, title, content, author, source, viewCount, publishedAt, news_id, user_id) VALUES (3, '金山办公宣布WPS 365升级发布，已集成文心一言、通义千问', 'JavaScript 开发者们瞩目已久的 Bun 1.1 版本终于正式发布了！这次大版本更新带来了一系列令人兴奋的新特性和显著的性能提升，将为开发者们提供更加顺畅、高效的开发体验。

首先，让我们为 Bun 1.1 支持 Windows 而欢呼吧！是的，你没有看错，现在 Windows 开发者也能享受到 Bun 带来的极速体验了。通过一行简单的 PowerShell 命令，即可在 Windows 10 及以上系统安装 Bun。更令人惊喜的是，Bun 在 Windows 上的测试覆盖率已经达到了 98%，这意味着你能在 Windows 上尽情使用 Bun 的各项功能，与 macOS 和 Linux 版本几乎完全一致。

说到速度，Bun 1.1 在各个方面都有了大幅提升。在 Windows 上进行依赖安装时，Bun 的表现尤其亮眼。以安装一个 Vite React 应用为例，使用 Bun，安装速度比 Yarn 快 18 倍，比 npm 更是快了 30 倍之多！Bun 还对 Windows 上的文件系统操作进行了深度优化，例如递归读取目录的速度比 Node.js 快了 22 倍。

Bun 1.1 对 Node.js 兼容性的改进也非常显著。不仅修复了上千个 bug，还新增了大量 Node.js API 的支持。现在你可以在 Bun 中使用 HTTP/2 客户端、递归的 fs.readdir()、进程间通信等功能了。值得一提的是，Bun 还支持许多 Node.js 中没有文档说明的内部 API，让你的 npm 包可以在 Bun 下平滑迁移，而无需修改代码。

作为一个多才多艺的 JavaScript 运行时，Bun 1.1 在打包、测试、SQLite 支持等方面也有诸多亮点。全新的 bun build --target=node 命令让你轻松将 TypeScript 代码打包成可在 Node.js 下运行的文件。而 bun build --compile 命令更是一个黑科技，它能将你的 JS/TS 代码连同 SQLite 数据库一起编译成一个单文件可执行程序！

说到 SQLite，Bun 1.1 内置了一个高性能的 SQLite 接口，并且支持了多语句查询、导入预置数据库等实用功能。结合编译成单文件 exe 的功能，Bun 让嵌入式数据库应用开发变得无比简单高效。

当然，Bun 1.1 在开发者体验方面也下了不少功夫。语法高亮的错误堆栈、更加简洁的调用栈信息、bun --eval 命令行直接执行脚本……Bun 力求为开发者提供更加友好便捷的使用体验。

还有很多很多的新特性，在这里无法一一列举。但可以肯定的是，Bun 1.1 是一个里程碑式的版本，它以其卓越的性能、丰富的功能和贴心的开发体验，势必将 JavaScript 开发推向一个新的高度。期待 Bun 在未来为我们带来更多惊喜！', 'asfsadf', 'asdf', 0, 1712419200000, 2, 1);
INSERT INTO news (id, title, content, author, source, viewCount, publishedAt, news_id, user_id) VALUES (4, '10 个 Rust 终端工具，助力开发者提升生产力', 'JavaScript 开发者们瞩目已久的 Bun 1.1 版本终于正式发布了！这次大版本更新带来了一系列令人兴奋的新特性和显著的性能提升，将为开发者们提供更加顺畅、高效的开发体验。

首先，让我们为 Bun 1.1 支持 Windows 而欢呼吧！是的，你没有看错，现在 Windows 开发者也能享受到 Bun 带来的极速体验了。通过一行简单的 PowerShell 命令，即可在 Windows 10 及以上系统安装 Bun。更令人惊喜的是，Bun 在 Windows 上的测试覆盖率已经达到了 98%，这意味着你能在 Windows 上尽情使用 Bun 的各项功能，与 macOS 和 Linux 版本几乎完全一致。

说到速度，Bun 1.1 在各个方面都有了大幅提升。在 Windows 上进行依赖安装时，Bun 的表现尤其亮眼。以安装一个 Vite React 应用为例，使用 Bun，安装速度比 Yarn 快 18 倍，比 npm 更是快了 30 倍之多！Bun 还对 Windows 上的文件系统操作进行了深度优化，例如递归读取目录的速度比 Node.js 快了 22 倍。

Bun 1.1 对 Node.js 兼容性的改进也非常显著。不仅修复了上千个 bug，还新增了大量 Node.js API 的支持。现在你可以在 Bun 中使用 HTTP/2 客户端、递归的 fs.readdir()、进程间通信等功能了。值得一提的是，Bun 还支持许多 Node.js 中没有文档说明的内部 API，让你的 npm 包可以在 Bun 下平滑迁移，而无需修改代码。

作为一个多才多艺的 JavaScript 运行时，Bun 1.1 在打包、测试、SQLite 支持等方面也有诸多亮点。全新的 bun build --target=node 命令让你轻松将 TypeScript 代码打包成可在 Node.js 下运行的文件。而 bun build --compile 命令更是一个黑科技，它能将你的 JS/TS 代码连同 SQLite 数据库一起编译成一个单文件可执行程序！

说到 SQLite，Bun 1.1 内置了一个高性能的 SQLite 接口，并且支持了多语句查询、导入预置数据库等实用功能。结合编译成单文件 exe 的功能，Bun 让嵌入式数据库应用开发变得无比简单高效。

当然，Bun 1.1 在开发者体验方面也下了不少功夫。语法高亮的错误堆栈、更加简洁的调用栈信息、bun --eval 命令行直接执行脚本……Bun 力求为开发者提供更加友好便捷的使用体验。

还有很多很多的新特性，在这里无法一一列举。但可以肯定的是，Bun 1.1 是一个里程碑式的版本，它以其卓越的性能、丰富的功能和贴心的开发体验，势必将 JavaScript 开发推向一个新的高度。期待 Bun 在未来为我们带来更多惊喜！', 'asfsadf', 'asdf', 0, 1712419200000, 2, 1);
INSERT INTO news (id, title, content, author, source, viewCount, publishedAt, news_id, user_id) VALUES (5, 'JetBrains 全家桶 2024 首个大版本更新 (2024.1)', 'JavaScript 开发者们瞩目已久的 Bun 1.1 版本终于正式发布了！这次大版本更新带来了一系列令人兴奋的新特性和显著的性能提升，将为开发者们提供更加顺畅、高效的开发体验。

首先，让我们为 Bun 1.1 支持 Windows 而欢呼吧！是的，你没有看错，现在 Windows 开发者也能享受到 Bun 带来的极速体验了。通过一行简单的 PowerShell 命令，即可在 Windows 10 及以上系统安装 Bun。更令人惊喜的是，Bun 在 Windows 上的测试覆盖率已经达到了 98%，这意味着你能在 Windows 上尽情使用 Bun 的各项功能，与 macOS 和 Linux 版本几乎完全一致。

说到速度，Bun 1.1 在各个方面都有了大幅提升。在 Windows 上进行依赖安装时，Bun 的表现尤其亮眼。以安装一个 Vite React 应用为例，使用 Bun，安装速度比 Yarn 快 18 倍，比 npm 更是快了 30 倍之多！Bun 还对 Windows 上的文件系统操作进行了深度优化，例如递归读取目录的速度比 Node.js 快了 22 倍。

Bun 1.1 对 Node.js 兼容性的改进也非常显著。不仅修复了上千个 bug，还新增了大量 Node.js API 的支持。现在你可以在 Bun 中使用 HTTP/2 客户端、递归的 fs.readdir()、进程间通信等功能了。值得一提的是，Bun 还支持许多 Node.js 中没有文档说明的内部 API，让你的 npm 包可以在 Bun 下平滑迁移，而无需修改代码。

作为一个多才多艺的 JavaScript 运行时，Bun 1.1 在打包、测试、SQLite 支持等方面也有诸多亮点。全新的 bun build --target=node 命令让你轻松将 TypeScript 代码打包成可在 Node.js 下运行的文件。而 bun build --compile 命令更是一个黑科技，它能将你的 JS/TS 代码连同 SQLite 数据库一起编译成一个单文件可执行程序！

说到 SQLite，Bun 1.1 内置了一个高性能的 SQLite 接口，并且支持了多语句查询、导入预置数据库等实用功能。结合编译成单文件 exe 的功能，Bun 让嵌入式数据库应用开发变得无比简单高效。

当然，Bun 1.1 在开发者体验方面也下了不少功夫。语法高亮的错误堆栈、更加简洁的调用栈信息、bun --eval 命令行直接执行脚本……Bun 力求为开发者提供更加友好便捷的使用体验。

还有很多很多的新特性，在这里无法一一列举。但可以肯定的是，Bun 1.1 是一个里程碑式的版本，它以其卓越的性能、丰富的功能和贴心的开发体验，势必将 JavaScript 开发推向一个新的高度。期待 Bun 在未来为我们带来更多惊喜！', 'asfsadf', 'asdf', 0, 1712419200000, 2, 1);
INSERT INTO news (id, title, content, author, source, viewCount, publishedAt, news_id, user_id) VALUES (6, '水电费水电费水电费', 'JavaScript 开发者们瞩目已久的 Bun 1.1 版本终于正式发布了！这次大版本更新带来了一系列令人兴奋的新特性和显著的性能提升，将为开发者们提供更加顺畅、高效的开发体验。

首先，让我们为 Bun 1.1 支持 Windows 而欢呼吧！是的，你没有看错，现在 Windows 开发者也能享受到 Bun 带来的极速体验了。通过一行简单的 PowerShell 命令，即可在 Windows 10 及以上系统安装 Bun。更令人惊喜的是，Bun 在 Windows 上的测试覆盖率已经达到了 98%，这意味着你能在 Windows 上尽情使用 Bun 的各项功能，与 macOS 和 Linux 版本几乎完全一致。

说到速度，Bun 1.1 在各个方面都有了大幅提升。在 Windows 上进行依赖安装时，Bun 的表现尤其亮眼。以安装一个 Vite React 应用为例，使用 Bun，安装速度比 Yarn 快 18 倍，比 npm 更是快了 30 倍之多！Bun 还对 Windows 上的文件系统操作进行了深度优化，例如递归读取目录的速度比 Node.js 快了 22 倍。

Bun 1.1 对 Node.js 兼容性的改进也非常显著。不仅修复了上千个 bug，还新增了大量 Node.js API 的支持。现在你可以在 Bun 中使用 HTTP/2 客户端、递归的 fs.readdir()、进程间通信等功能了。值得一提的是，Bun 还支持许多 Node.js 中没有文档说明的内部 API，让你的 npm 包可以在 Bun 下平滑迁移，而无需修改代码。

作为一个多才多艺的 JavaScript 运行时，Bun 1.1 在打包、测试、SQLite 支持等方面也有诸多亮点。全新的 bun build --target=node 命令让你轻松将 TypeScript 代码打包成可在 Node.js 下运行的文件。而 bun build --compile 命令更是一个黑科技，它能将你的 JS/TS 代码连同 SQLite 数据库一起编译成一个单文件可执行程序！

说到 SQLite，Bun 1.1 内置了一个高性能的 SQLite 接口，并且支持了多语句查询、导入预置数据库等实用功能。结合编译成单文件 exe 的功能，Bun 让嵌入式数据库应用开发变得无比简单高效。

当然，Bun 1.1 在开发者体验方面也下了不少功夫。语法高亮的错误堆栈、更加简洁的调用栈信息、bun --eval 命令行直接执行脚本……Bun 力求为开发者提供更加友好便捷的使用体验。

还有很多很多的新特性，在这里无法一一列举。但可以肯定的是，Bun 1.1 是一个里程碑式的版本，它以其卓越的性能、丰富的功能和贴心的开发体验，势必将 JavaScript 开发推向一个新的高度。期待 Bun 在未来为我们带来更多惊喜！', 'asfsadf', 'asdf', 0, 1712419200000, 2, 1);

-- 表：news_category
DROP TABLE IF EXISTS news_category;
CREATE TABLE "news_category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "user_id" INTEGER NOT NULL
);
INSERT INTO news_category (id, name, description, user_id) VALUES (1, '搞笑', NULL, 1);
INSERT INTO news_category (id, name, description, user_id) VALUES (2, '金融', NULL, 1);
INSERT INTO news_category (id, name, description, user_id) VALUES (3, '科技', NULL, 1);
INSERT INTO news_category (id, name, description, user_id) VALUES (4, '农业', NULL, 1);
INSERT INTO news_category (id, name, description, user_id) VALUES (5, '娱乐', NULL, 1);

-- 表：profile_link
DROP TABLE IF EXISTS profile_link;
CREATE TABLE "profile_link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "category_id" INTEGER NOT NULL,
    CONSTRAINT "profile_link_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "profile_link_category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (1, 'https://juejin.cn/', 'https://juejin.cn/', 'https://juejin.cn/', 1);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (2, 'https://juejin.cn/creator/home', 'https://juejin.cn/creator/home', 'https://juejin.cn/creator/home', 1);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (3, 'https://github.com/', 'https://github.com/', 'https://github.com/', 1);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (4, 'https://github.com/trending', 'https://github.com/trending', 'https://github.com/trending', 1);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (5, 'https://remix.run/', 'https://remix.run/', 'https://remix.run/', 2);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (6, 'https://remix.run/docs/en/main', 'https://remix.run/docs/en/main', 'https://remix.run/docs/en/main', 2);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (7, 'https://github.com/remix-run/remix', 'https://github.com/remix-run/remix', 'https://github.com/remix-run/remix', 2);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (8, 'https://github.com/yyong008/remix-antd-admin', 'https://github.com/yyong008/remix-antd-admin', 'https://github.com/yyong008/remix-antd-admin', 2);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (9, 'https://chat.openai.com/', 'https://chat.openai.com/', 'https://chat.openai.com/', 7);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (10, 'https://ollama.com/', 'https://ollama.com/', 'https://ollama.com/', 7);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (11, 'https://tongyi.aliyun.com/wanxiang/creation', 'https://tongyi.aliyun.com/wanxiang/creation', 'https://tongyi.aliyun.com/wanxiang/creation', 7);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (12, 'https://tongyi.aliyun.com/', 'https://tongyi.aliyun.com/', 'https://tongyi.aliyun.com/', 7);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (13, 'https://www.coze.cn/', 'https://www.coze.cn/', 'https://www.coze.cn/', 7);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (14, 'https://www.zhihu.com/', 'https://www.zhihu.com/', 'https://www.zhihu.com/', 1);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (15, 'https://www.ixigua.com/', 'https://www.ixigua.com/', 'https://www.ixigua.com/', 5);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (16, 'https://www.bilibili.com/', 'https://www.bilibili.com/', 'https://www.bilibili.com/', 5);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (17, 'https://www.kuaishou.com/', 'https://www.kuaishou.com/', 'https://www.kuaishou.com/', 5);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (18, 'https://www.xiaohongshu.com/explore', 'https://www.xiaohongshu.com/explore', 'https://www.xiaohongshu.com/explore', 5);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (19, 'https://www.douyin.com/?recommend=1', 'https://www.douyin.com/?recommend=1', 'https://www.douyin.com/?recommend=1', 5);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (20, 'https://www.youtube.com/', 'https://www.youtube.com/', 'https://www.youtube.com/', 5);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (21, 'https://mp.weixin.qq.com/', 'https://mp.weixin.qq.com/', 'https://mp.weixin.qq.com/', 1);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (22, 'https://segmentfault.com/', 'https://segmentfault.com/', 'https://segmentfault.com/', 1);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (23, 'https://gitee.com/', 'https://gitee.com/', 'https://gitee.com/', 1);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (24, 'https://react.dev/blog', 'https://react.dev/blog', 'https://react.dev/blog', 3);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (25, 'https://react.dev/', 'https://react.dev/', 'https://react.dev/', 3);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (26, 'https://create-react-app.dev/', 'https://create-react-app.dev/', 'https://create-react-app.dev/', 3);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (27, 'https://ant.design/', 'https://ant.design/', 'https://ant.design/', 3);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (28, 'https://tailwindcss.com/', 'https://tailwindcss.com/', 'https://tailwindcss.com/', 8);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (29, 'https://unocss.dev/', 'https://unocss.dev/', 'v', 8);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (30, 'https://mui.com/', 'https://mui.com/', 'https://mui.com/', 8);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (31, 'https://nextui.org/', 'https://nextui.org/', 'https://nextui.org/', 8);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (32, 'https://chakra-ui.com/', 'https://chakra-ui.com/', 'https://chakra-ui.com/', 8);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (33, 'https://redux.js.org/', 'https://redux.js.org/', 'https://redux.js.org/', 3);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (34, 'https://zustand-demo.pmnd.rs/', 'https://zustand-demo.pmnd.rs/', 'https://zustand-demo.pmnd.rs/', 3);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (35, 'https://nextjs.org/', 'https://nextjs.org/', 'https://nextjs.org/', 3);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (36, 'https://reactrouter.com/en/main', 'https://reactrouter.com/en/main', 'https://reactrouter.com/en/main', 2);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (37, 'https://www.electronjs.org/', 'https://www.electronjs.org/', 'https://www.electronjs.org/', 9);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (38, 'https://tauri.app/', 'https://tauri.app/', 'https://tauri.app/', 9);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (39, 'https://emojipedia.org/', 'https://emojipedia.org/', 'https://emojipedia.org/', 6);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (40, 'https://pixabay.com/zh/', 'https://pixabay.com/zh/', 'https://pixabay.com/zh/', 6);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (41, 'https://www.pexels.com/zh-cn/', 'https://www.pexels.com/zh-cn/', 'https://www.pexels.com/zh-cn/', 6);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (42, 'https://www.figma.com/', 'https://www.figma.com/', 'https://www.figma.com/', 10);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (43, 'https://www.prisma.io/docs/getting-started', 'https://www.prisma.io/docs/getting-started', 'https://www.prisma.io/docs/getting-started', 11);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (44, 'https://nodejs.org/en', 'https://nodejs.org/en', 'https://nodejs.org/en', 4);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (45, 'https://bun.sh/', 'https://bun.sh/', 'https://bun.sh/', 4);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (46, 'https://deno.com/', 'https://deno.com/', 'https://deno.com/', 4);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (47, 'https://vitepress.dev/', 'https://vitepress.dev/', 'https://vitepress.dev/', 12);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (48, 'https://vitejs.dev/', 'https://vitejs.dev/', 'https://vitejs.dev/', 12);
INSERT INTO profile_link (id, name, url, description, category_id) VALUES (49, 'https://webpack.js.org/', 'https://webpack.js.org/', 'https://webpack.js.org/', 12);

-- 表：profile_link_category
DROP TABLE IF EXISTS profile_link_category;
CREATE TABLE "profile_link_category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
, user_id INTEGER);
INSERT INTO profile_link_category (id, name, description, user_id) VALUES (1, '常用网站', '常用网站', 1);
INSERT INTO profile_link_category (id, name, description, user_id) VALUES (2, 'Remix', 'Remix 相关网站', 1);
INSERT INTO profile_link_category (id, name, description, user_id) VALUES (3, 'React', 'React 相关', 1);
INSERT INTO profile_link_category (id, name, description, user_id) VALUES (4, 'Node.JS', 'Node.js 相关', 1);
INSERT INTO profile_link_category (id, name, description, user_id) VALUES (5, '视频网站', '视频相关', 1);
INSERT INTO profile_link_category (id, name, description, user_id) VALUES (6, '素材网站', '素材相关', 1);
INSERT INTO profile_link_category (id, name, description, user_id) VALUES (7, 'AI', 'AI 相关', 1);
INSERT INTO profile_link_category (id, name, description, user_id) VALUES (8, 'css', 'css', 1);
INSERT INTO profile_link_category (id, name, description, user_id) VALUES (9, '桌面端', '桌面端', 1);
INSERT INTO profile_link_category (id, name, description, user_id) VALUES (10, '设计', '设计', 1);
INSERT INTO profile_link_category (id, name, description, user_id) VALUES (11, '数据库', '数据库相关
', 1);
INSERT INTO profile_link_category (id, name, description, user_id) VALUES (12, '前端工程化', '前端工程化', 1);

-- 表：sys_department
DROP TABLE IF EXISTS sys_department;
CREATE TABLE "sys_department" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "order_no" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "parent_department_id" INTEGER,
    CONSTRAINT "sys_department_parent_department_id_fkey" FOREIGN KEY ("parent_department_id") REFERENCES "sys_department" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (1, '集团公司', 'Responsible for promoting products or services.', NULL, '2024-03-30 13:31:12', NULL, NULL);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (2, '华南公司', 'Responsible for promoting products or services.', NULL, '2024-03-30 13:31:12', NULL, NULL);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (3, '华中公司', 'Responsible for promoting products or services.', NULL, '2024-03-30 13:31:12', NULL, NULL);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (4, '华北公司', 'Responsible for promoting products or services.', NULL, '2024-03-30 13:31:12', NULL, NULL);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (5, '华东公司', 'Responsible for promoting products or services.', NULL, '2024-03-30 13:31:12', NULL, NULL);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (6, '西南公司', 'Responsible for promoting products or services.', NULL, '2024-03-30 13:31:12', NULL, NULL);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (7, '集团:市场部', 'Responsible for promoting products or services.', NULL, '2024-03-30 13:31:12', NULL, 1);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (8, '集团:销售部', 'Responsible for selling products or services.', NULL, '2024-03-30 13:31:12', NULL, 1);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (9, '集团:IT部门', 'Responsible for managing technology resources.', NULL, '2024-03-30 13:31:12', NULL, 1);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (10, '集团:人力资源部门', 'Responsible for managing employee relations and staffing.', NULL, '2024-03-30 13:31:12', NULL, 1);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (11, '集团:产品部', 'Responsible for designing and developing new products.', NULL, '2024-03-30 13:31:12', NULL, 1);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (12, '集团:金融部门', 'Responsible for managing financial resources and budgets.', NULL, '2024-03-30 13:31:12', NULL, 1);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (13, '华南:市场部', 'Responsible for promoting products or services.', NULL, '2024-03-30 13:31:12', NULL, 2);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (14, '华南:销售部', 'Responsible for selling products or services.', NULL, '2024-03-30 13:31:12', NULL, 2);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (15, '华南:IT部门', 'Responsible for managing technology resources.', NULL, '2024-03-30 13:31:12', NULL, 2);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (16, '华南:人力资源部门', 'Responsible for managing employee relations and staffing.', NULL, '2024-03-30 13:31:12', NULL, 2);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (17, '华南:产品部', 'Responsible for designing and developing new products.', NULL, '2024-03-30 13:31:12', NULL, 2);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (18, '华南:金融部门', 'Responsible for managing financial resources and budgets.', NULL, '2024-03-30 13:31:12', NULL, 2);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (19, '华中:市场部', 'Responsible for promoting products or services.', NULL, '2024-03-30 13:31:12', NULL, 3);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (20, '华中:销售部', 'Responsible for selling products or services.', NULL, '2024-03-30 13:31:12', NULL, 3);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (21, '华中:IT部门', 'Responsible for managing technology resources.', NULL, '2024-03-30 13:31:12', NULL, 3);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (22, '华中:人力资源部门', 'Responsible for managing employee relations and staffing.', NULL, '2024-03-30 13:31:12', NULL, 3);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (23, '华中:产品部', 'Responsible for designing and developing new products.', NULL, '2024-03-30 13:31:12', NULL, 3);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (24, '华中:金融部门', 'Responsible for managing financial resources and budgets.', NULL, '2024-03-30 13:31:12', NULL, 3);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (25, '华北:市场部', 'Responsible for promoting products or services.', NULL, '2024-03-30 13:31:12', NULL, 4);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (26, '华北:销售部', 'Responsible for selling products or services.', NULL, '2024-03-30 13:31:12', NULL, 4);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (27, '华北:IT部门', 'Responsible for managing technology resources.', NULL, '2024-03-30 13:31:12', NULL, 4);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (28, '华北:人力资源部门', 'Responsible for managing employee relations and staffing.', NULL, '2024-03-30 13:31:12', NULL, 4);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (29, '华北:产品部', 'Responsible for designing and developing new products.', NULL, '2024-03-30 13:31:12', NULL, 4);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (30, '华北:金融部门', 'Responsible for managing financial resources and budgets.', NULL, '2024-03-30 13:31:12', NULL, 4);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (31, '华东:市场部', 'Responsible for promoting products or services.', NULL, '2024-03-30 13:31:12', NULL, 5);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (32, '华东:销售部', 'Responsible for selling products or services.', NULL, '2024-03-30 13:31:12', NULL, 5);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (33, '华东:IT部门', 'Responsible for managing technology resources.', NULL, '2024-03-30 13:31:12', NULL, 5);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (34, '华东:人力资源部门', 'Responsible for managing employee relations and staffing.', NULL, '2024-03-30 13:31:12', NULL, 5);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (35, '华东:产品部', 'Responsible for designing and developing new products.', NULL, '2024-03-30 13:31:12', NULL, 5);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (36, '华东:金融部门', 'Responsible for managing financial resources and budgets.', NULL, '2024-03-30 13:31:12', NULL, 5);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (37, '西南:市场部', 'Responsible for promoting products or services.', NULL, '2024-03-30 13:31:12', NULL, 6);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (38, '西南:销售部', 'Responsible for selling products or services.', NULL, '2024-03-30 13:31:12', NULL, 6);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (39, '西南:IT部门', 'Responsible for managing technology resources.', NULL, '2024-03-30 13:31:12', NULL, 6);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (40, '西南:人力资源部门', 'Responsible for managing employee relations and staffing.', NULL, '2024-03-30 13:31:12', NULL, 6);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (41, '西南:产品部', 'Responsible for designing and developing new products.', NULL, '2024-03-30 13:31:12', NULL, 6);
INSERT INTO sys_department (id, name, description, order_no, createdAt, updatedAt, parent_department_id) VALUES (42, '西南:金融部门', 'Responsible for managing financial resources and budgets.', NULL, '2024-03-30 13:31:12', NULL, 6);

-- 表：sys_dictionary
DROP TABLE IF EXISTS sys_dictionary;
CREATE TABLE "sys_dictionary" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "remark" TEXT,
    "status" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO sys_dictionary (id, name, code, description, remark, status, createdAt, updatedAt) VALUES (1, '性别', 'sys:sex', '性别', '性别', 1, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_dictionary (id, name, code, description, remark, status, createdAt, updatedAt) VALUES (2, '状态', 'sex:status', '状态', '状态', 0, '2024-03-30 13:31:12', NULL);

-- 表：sys_dictionary_entry
DROP TABLE IF EXISTS sys_dictionary_entry;
CREATE TABLE "sys_dictionary_entry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "order_no" INTEGER,
    "status" INTEGER NOT NULL,
    "remark" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "dictionary_id" INTEGER NOT NULL,
    CONSTRAINT "sys_dictionary_entry_dictionary_id_fkey" FOREIGN KEY ("dictionary_id") REFERENCES "sys_dictionary" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO sys_dictionary_entry (id, key, value, order_no, status, remark, createdAt, updatedAt, dictionary_id) VALUES (1, '男', '1', 1, 1, '性别', '2024-03-30 13:31:12', NULL, 1);
INSERT INTO sys_dictionary_entry (id, key, value, order_no, status, remark, createdAt, updatedAt, dictionary_id) VALUES (2, '女', '2', 2, 1, '状态', '2024-03-30 13:31:12', NULL, 1);
INSERT INTO sys_dictionary_entry (id, key, value, order_no, status, remark, createdAt, updatedAt, dictionary_id) VALUES (3, '启用', '1', 1, 1, '启用状态', '2024-03-30 13:31:12', NULL, 2);
INSERT INTO sys_dictionary_entry (id, key, value, order_no, status, remark, createdAt, updatedAt, dictionary_id) VALUES (4, '禁用', '0', 2, 1, '禁用状态', '2024-03-30 13:31:12', NULL, 2);

-- 表：sys_loginlog
DROP TABLE IF EXISTS sys_loginlog;
CREATE TABLE "sys_loginlog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "ip" TEXT,
    "address" TEXT,
    "login_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "system" TEXT,
    "browser" TEXT
);
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (1, 'admin', '本机地址', '未知', 1711887132863, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (2, 'admin', '本机地址', '未知', 1711940509912, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (3, 'super admin', '本机地址', '未知', 1711940516141, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (4, 'admin', '本机地址', '未知', 1711966951241, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (5, 'admin', '本机地址', '未知', 1711966962738, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (6, 'super admin', '本机地址', '未知', 1711967076505, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (7, 'super admin', '本机地址', '未知', 1711977765412, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (8, 'super admin', '本机地址', '未知', 1712017512297, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (9, 'admin', '本机地址', '未知', 1712052640588, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (10, 'admin', '本机地址', '未知', 1712052649973, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (11, 'admin', '本机地址', '未知', 1712053319982, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (12, 'admin', '本机地址', '未知', 1712053346754, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (13, 'admin', '本机地址', '未知', 1712053469160, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (14, 'super admin', '本机地址', '未知', 1712053480895, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (15, 'super admin', '本机地址', '未知', 1712122216960, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (16, 'admin', '本机地址', '未知', 1712132165955, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (17, 'super admin', '本机地址', '未知', 1712132173207, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (18, 'admin', '本机地址', '未知', 1712184523608, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (19, 'super admin', '本机地址', '未知', 1712184569047, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (20, 'super admin', '本机地址', '未知', 1712184662377, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (21, 'admin', '本机地址', '未知', 1712210060564, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (22, 'super admin', '本机地址', '未知', 1712210079496, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (23, 'user1', '本机地址', '未知', 1712210213401, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (24, 'super admin', '本机地址', '未知', 1712210257709, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (25, 'admin', '本机地址', '未知', 1712242406997, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (26, 'super admin', '本机地址', '未知', 1712242415578, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (27, 'super admin', '本机地址', '未知', 1712244508577, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (28, 'super admin', '本机地址', '未知', 1712276233519, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (29, 'super admin', '本机地址', '未知', 1712278835646, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (30, 'admin', '本机地址', '未知', 1712475960943, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (31, 'super admin', '本机地址', '未知', 1712478181909, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (32, 'admin', '本机地址', '未知', 1712487889689, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (33, 'super admin', '本机地址', '未知', 1712487897121, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (34, 'admin', '本机地址', '未知', 1712488959113, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (35, 'super admin', '本机地址', '未知', 1712489041923, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (36, 'super admin', '本机地址', '未知', 1712489523965, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (37, 'super admin', '本机地址', '未知', 1712495878262, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (38, 'admin', '本机地址', '未知', 1712499938967, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (39, 'admin', '本机地址', '未知', 1712499945300, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (40, 'super admin', '本机地址', '未知', 1712499952233, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (41, 'admin', '本机地址', '未知', 1712502361963, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (42, 'super admin', '本机地址', '未知', 1712502368607, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (43, 'admin', '本机地址', '未知', 1712552775265, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (44, 'super admin', '本机地址', '未知', 1712552780917, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (45, 'super admin', '本机地址', '未知', 1712552938831, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (46, 'admin', '本机地址', '未知', 1712633358723, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (47, 'super admin', '本机地址', '未知', 1712633365241, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (48, 'super admin', '本机地址', '未知', 1712670415393, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (49, 'super admin', '本机地址', '未知', 1712672949288, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (50, 'super admin', '本机地址', '未知', 1712681884457, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (51, 'super admin', '本机地址', '未知', 1712682547498, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (52, 'admin', '本机地址', '未知', 1712691065234, 'Windows10', 'Chrome123.0.0.0');
INSERT INTO sys_loginlog (id, name, ip, address, login_at, system, browser) VALUES (53, 'super admin', '本机地址', '未知', 1712692996147, 'Windows10', 'Chrome123.0.0.0');

-- 表：sys_menu
DROP TABLE IF EXISTS sys_menu;
CREATE TABLE "sys_menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "description" TEXT,
    "remark" TEXT,
    "icon" TEXT,
    "path" TEXT,
    "path_file" TEXT,
    "status" INTEGER,
    "isShow" INTEGER,
    "isCache" INTEGER,
    "permission" TEXT,
    "isLink" INTEGER,
    "order_no" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "parent_menu_id" INTEGER,
    CONSTRAINT "sys_menu_parent_menu_id_fkey" FOREIGN KEY ("parent_menu_id") REFERENCES "sys_menu" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (1, 'menu.dashboard.main', 1, 'dashboard', NULL, 'DashboardOutlined', '/dashboard', '', 1, 1, 0, NULL, 0, 1, '2024-03-30 13:31:12', NULL, NULL);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (2, 'menu.demo.main', 1, 'demo', NULL, 'UnorderedListOutlined', '/demo', '', 1, 1, 0, NULL, 0, 2, '2024-03-30 13:31:12', NULL, NULL);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (3, 'menu.system.main', 1, 'system', NULL, 'KeyOutlined', '/system', '', 1, 1, 0, NULL, 0, 3, '2024-03-30 13:31:12', NULL, NULL);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (4, 'menu.news.main', 1, 'news', NULL, 'FieldTimeOutlined', '/news', '', 1, 1, 0, NULL, 0, 4, '2024-03-30 13:31:12', NULL, NULL);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (5, 'menu.blog.main', 1, 'system', NULL, 'BookOutlined', '/blog', '', 1, 1, 0, NULL, 0, 5, '2024-03-30 13:31:12', NULL, NULL);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (6, 'menu.about.main', 2, 'about', NULL, 'ExclamationCircleOutlined', '/about', '', 1, 1, 0, NULL, 0, 6, '2024-03-30 13:31:12', NULL, NULL);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (7, 'menu.dashboard.workplace', 2, 'dashboard', NULL, '', '/dashboard', '', 1, 1, 0, NULL, 0, 1, '2024-03-30 13:31:12', NULL, 1);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (8, 'menu.demo.dashboard.main', 2, 'dashboard', NULL, '', '/demo/dashboard', '', 1, 1, 0, NULL, 0, 1, '2024-03-30 13:31:12', NULL, 2);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (9, 'menu.demo.health.main', 1, 'disease', NULL, '', '/demo/health', '', 1, 1, 0, NULL, 0, 2, '2024-03-30 13:31:12', NULL, 2);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (10, 'menu.demo.form.main', 1, 'form', NULL, '', '/demo/form', '', 1, 1, 0, NULL, 0, 4, '2024-03-30 13:31:12', NULL, 2);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (11, 'menu.demo.list.main', 1, 'list', NULL, '', '/demo/list', '', 1, 1, 0, NULL, 0, 5, '2024-03-30 13:31:12', NULL, 2);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (12, 'menu.demo.profile.main', 1, 'profile', NULL, '', '/demo/profile', '', 1, 1, 0, NULL, 0, 5, '2024-03-30 13:31:12', NULL, 2);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (13, 'menu.demo.result.main', 1, 'result', NULL, '', '/demo/result', '', 1, 1, 0, NULL, 0, 6, '2024-03-30 13:31:12', NULL, 2);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (14, 'menu.demo.exception.main', 1, 'exception', NULL, '', '/demo/exception', '', 1, 1, 0, NULL, 0, 7, '2024-03-30 13:31:12', NULL, 2);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (15, 'menu.demo.account.main', 1, 'account', NULL, '', '/demo/account', '', 1, 1, 0, NULL, 0, 8, '2024-03-30 13:31:12', NULL, 2);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (16, 'menu.demo.editor.main', 1, 'editor', NULL, '', '/demo/editor', '', 1, 1, 0, NULL, 0, 9, '2024-03-30 13:31:12', NULL, 2);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (17, 'menu.demo.excel.main', 1, 'excel', NULL, '', '/demo/excel', '', 1, 1, 0, NULL, 0, 10, '2024-03-30 13:31:12', NULL, 2);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (18, 'menu.demo.game.main', 1, 'game', NULL, '', '/demo/game', '', 1, 1, 0, NULL, 0, 11, '2024-03-30 13:31:12', NULL, 2);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (19, 'menu.demo.stack.main', 1, 'stack', NULL, '', '/demo/stack', '', 1, 1, 0, NULL, 0, 12, '2024-03-30 13:31:12', NULL, 2);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (20, 'menu.demo.calendar.main', 1, 'calendar', NULL, '', '/demo/calendar', '', 1, 1, 0, NULL, 0, 13, '2024-03-30 13:31:12', NULL, 2);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (21, 'menu.demo.lib.main', 1, 'lib', NULL, '', '/demo/lib', '', 1, 1, 0, NULL, 0, 14, '2024-03-30 13:31:12', NULL, 2);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (22, 'menu.system.user.main', 2, 'menu: user', NULL, '', '/system/user', '', 1, 1, 0, NULL, 0, 1, '2024-03-30 13:31:12', NULL, 3);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (23, 'menu.system.role.main', 2, 'menu: role', NULL, '', '/system/role', '', 1, 1, 0, NULL, 0, 2, '2024-03-30 13:31:12', NULL, 3);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (24, 'menu.system.menu.main', 2, 'menu: menu', NULL, '', '/system/menu', '', 1, 1, 0, NULL, 0, 3, '2024-03-30 13:31:12', NULL, 3);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (25, 'menu.system.dept.main', 2, 'menu: dept', NULL, '', '/system/dept', '', 1, 1, 0, NULL, 0, 4, '2024-03-30 13:31:12', NULL, 3);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (26, 'menu.system.dict', 2, 'menu: dict', NULL, '', '/system/dict', '', 1, 1, 0, NULL, 0, 6, '2024-03-30 13:31:12', NULL, 3);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (27, 'menu.system.config', 2, 'menu: config', NULL, '', '/system/config', '', 1, 1, 0, NULL, 0, 7, '2024-03-30 13:31:12', NULL, 3);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (28, 'menu.system.monitor.main', 2, 'menu: monitor', NULL, '', '/system/monitor', '', 1, 1, 0, NULL, 0, 11, '2024-03-30 13:31:12', NULL, 3);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (29, 'menu.demo.dashboard.analysis', 2, 'menu: analysis', NULL, '', '/demo/dashboard/analysis', '', 1, 1, 0, NULL, 0, 1, '2024-03-30 13:31:12', NULL, 8);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (30, 'menu.demo.dashboard.monitor', 2, 'menu: monitor', NULL, '', '/demo/dashboard/monitor', '', 1, 1, 0, NULL, 0, 2, '2024-03-30 13:31:12', NULL, 8);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (31, 'menu.demo.dashboard.workplace', 2, 'menu: workplace', NULL, '', '/demo/dashboard/workplace', '', 1, 1, 0, NULL, 0, 3, '2024-03-30 13:31:12', NULL, 8);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (32, 'menu.demo.health.health', 2, 'menu: health', NULL, '', '/demo/health/health', '', 1, 1, 0, NULL, 0, 1, '2024-03-30 13:31:12', NULL, 9);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (33, 'menu.demo.health.cervical', 2, 'menu: cervical-vertebra', NULL, '', '/demo/health/cerical-vertebra', '', 1, 1, 0, NULL, 0, 2, '2024-03-30 13:31:12', NULL, 9);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (34, 'menu.demo.health.vision', 2, 'menu: vision', NULL, '', '/demo/health/vision', '', 1, 1, 0, NULL, 0, 3, '2024-03-30 13:31:12', NULL, 9);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (35, 'menu.demo.health.hand', 2, 'menu: hand', NULL, '', '/demo/health/hand', '', 1, 1, 0, NULL, 0, 4, '2024-03-30 13:31:12', NULL, 9);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (36, 'menu.demo.health.obesity', 2, 'menu: obesity', NULL, '', '/demo/health/obesity', '', 1, 1, 0, NULL, 0, 5, '2024-03-30 13:31:12', NULL, 9);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (37, 'menu.demo.health.anxiety', 2, 'menu: anxiety-depression', NULL, '', '/demo/health/anxiety-depression', '', 1, 1, 0, NULL, 0, 6, '2024-03-30 13:31:12', NULL, 9);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (38, 'menu.demo.health.sleep', 2, 'menu: sleep', NULL, '', '/demo/health/sleep', '', 1, 1, 0, NULL, 0, 7, '2024-03-30 13:31:12', NULL, 9);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (39, 'menu.demo.health.sport', 2, 'menu: sport', NULL, '', '/demo/health/sport', '', 1, 1, 0, NULL, 0, 8, '2024-03-30 13:31:12', NULL, 9);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (40, 'menu.demo.form.basic-form', 2, 'menu: basic-form', NULL, '', '/demo/form/basic-form', '', 1, 1, 0, NULL, 0, 1, '2024-03-30 13:31:12', NULL, 10);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (41, 'menu.demo.form.step-form', 2, 'menu: step-form', NULL, '', '/demo/form/step-form', '', 1, 1, 0, NULL, 0, 2, '2024-03-30 13:31:12', NULL, 10);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (42, 'menu.demo.form.advanced-form', 2, 'menu: advanced-form', NULL, '', '/demo/form/advanced-form', '', 1, 1, 0, NULL, 0, 3, '2024-03-30 13:31:12', NULL, 10);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (43, 'menu.demo.list.search.main', 2, 'menu: search', NULL, '', '/demo/list/search', '', 1, 1, 0, NULL, 0, 1, '2024-03-30 13:31:12', NULL, 11);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (44, 'menu.demo.list.table-list', 2, 'menu: table-list', NULL, '', '/demo/list/table-list', '', 1, 1, 0, NULL, 0, 2, '2024-03-30 13:31:12', NULL, 11);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (45, 'menu.demo.list.basic-list', 2, 'menu: basic-list', NULL, '', '/demo/list/basic-list', '', 1, 1, 0, NULL, 0, 3, '2024-03-30 13:31:12', NULL, 11);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (46, 'menu.demo.list.card-list', 2, 'menu: card-list', NULL, '', '/demo/list/card-list', '', 1, 1, 0, NULL, 0, 4, '2024-03-30 13:31:12', NULL, 11);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (47, 'menu.demo.profile.basic', 2, 'menu: basic', NULL, '', '/demo/profile/basic', '', 1, 1, 0, NULL, 0, 1, '2024-03-30 13:31:12', NULL, 12);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (48, 'menu.demo.profile.advanced', 2, 'menu: advanced', NULL, '', '/demo/profile/advanced', '', 1, 1, 0, NULL, 0, 2, '2024-03-30 13:31:12', NULL, 12);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (49, 'menu.demo.result.success', 2, 'menu: success', NULL, '', '/demo/result/success', '', 1, 1, 0, NULL, 0, 1, '2024-03-30 13:31:12', NULL, 13);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (50, 'menu.demo.result.fail', 2, 'menu: fail', NULL, '', '/demo/result/fail', '', 1, 1, 0, NULL, 0, 2, '2024-03-30 13:31:12', NULL, 13);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (51, 'menu.demo.exception.403', 2, 'menu: 403', NULL, '', '/demo/exception/403', '', 1, 1, 0, NULL, 0, 1, '2024-03-30 13:31:12', NULL, 14);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (52, 'menu.demo.exception.404', 2, 'menu: 404', NULL, '', '/demo/exception/404', '', 1, 1, 0, NULL, 0, 2, '2024-03-30 13:31:12', NULL, 14);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (53, 'menu.demo.exception.500', 2, 'menu: 500', NULL, '', '/demo/exception/500', '', 1, 1, 0, NULL, 0, 3, '2024-03-30 13:31:12', NULL, 14);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (54, 'menu.demo.account.center', 2, 'menu: center', NULL, '', '/demo/account/center', '', 1, 1, 0, NULL, 0, 1, '2024-03-30 13:31:12', NULL, 15);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (55, 'menu.demo.account.settings', 2, 'menu: settings', NULL, '', '/demo/account/settings', '', 1, 1, 0, NULL, 0, 2, '2024-03-30 13:31:12', NULL, 15);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (56, 'menu.demo.editor.rich', 2, 'menu: rich', NULL, '', '/demo/editor/rich', '', 1, 1, 0, NULL, 0, 1, '2024-03-30 13:31:12', NULL, 16);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (57, 'menu.demo.editor.markdown', 2, 'menu: markdown', NULL, '', '/demo/editor/markdown', '', 1, 1, 0, NULL, 0, 2, '2024-03-30 13:31:12', NULL, 16);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (58, 'menu.demo.editor.json-viewer', 2, 'menu: json-viewer', NULL, '', '/demo/editor/json-viewer', '', 1, 1, 0, NULL, 0, 3, '2024-03-30 13:31:12', NULL, 16);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (59, 'menu.demo.editor.flow', 2, 'menu: flow', NULL, '', '/demo/editor/flow', '', 1, 1, 0, NULL, 0, 4, '2024-03-30 13:31:12', NULL, 16);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (60, 'menu.demo.editor.mind', 2, 'menu: mind', NULL, '', '/demo/editor/mind', '', 1, 1, 0, NULL, 0, 5, '2024-03-30 13:31:12', NULL, 16);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (61, 'menu.demo.excel.export', 2, 'menu: export', NULL, '', '/demo/excel/export', '', 1, 1, 0, NULL, 0, 1, '2024-03-30 13:31:12', NULL, 17);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (62, 'menu.demo.excel.import', 2, 'menu: import', NULL, '', '/demo/excel/import', '', 1, 1, 0, NULL, 0, 2, '2024-03-30 13:31:12', NULL, 17);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (63, 'menu.demo.game.pocker-guess', 2, 'menu: pocker-guess', NULL, '', '/demo/game/pocker-guess', '', 1, 1, 0, NULL, 0, 1, '2024-03-30 13:31:12', NULL, 18);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (64, 'menu.demo.game.rl', 2, 'menu: rl', NULL, '', '/demo/game/rl', '', 1, 1, 0, NULL, 0, 2, '2024-03-30 13:31:12', NULL, 18);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (65, 'menu.demo.game.trbl', 2, 'menu: trbl', NULL, '', '/demo/game/trbl', '', 1, 1, 0, NULL, 0, 3, '2024-03-30 13:31:12', NULL, 18);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (66, 'menu.demo.game.mouse', 2, 'menu: mouse', NULL, '', '/demo/game/mouse', '', 1, 1, 0, NULL, 0, 4, '2024-03-30 13:31:12', NULL, 18);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (67, 'menu.demo.stack.rxjs.main', 2, 'menu: rxjs/keybr', NULL, '', '/demo/stack/rxjs/keybr', '', 1, 1, 0, NULL, 0, 1, '2024-03-30 13:31:12', NULL, 19);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (68, 'menu.demo.stack.laxjs.main', 2, 'menu: laxjs/cursor', NULL, '', '/demo/stack/laxjs/cursor', '', 1, 1, 0, NULL, 0, 3, '2024-03-30 13:31:12', NULL, 19);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (69, 'menu.demo.calendar.temporal', 2, 'menu: temporal', NULL, '', '/demo/calendar/temporal', '', 1, 1, 0, NULL, 0, 1, '2024-03-30 13:31:12', NULL, 20);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (70, 'menu.demo.calendar.antd', 2, 'menu: antd', NULL, '', '/demo/calendar/antd', '', 1, 1, 0, NULL, 0, 2, '2024-03-30 13:31:12', NULL, 20);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (71, 'menu.demo.lib.qrcode', 2, 'menu: qrcode', NULL, '', '/demo/lib/qrcode', '', 1, 1, 0, NULL, 0, 1, '2024-03-30 13:31:12', NULL, 21);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (72, 'menu.demo.lib.clipboard', 2, 'menu: clipboard', NULL, '', '/demo/lib/clipboard', '', 1, 1, 0, NULL, 0, 2, '2024-03-30 13:31:12', NULL, 21);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (73, 'menu.demo.lib.split', 2, 'menu: split', NULL, '', '/demo/lib/split-pane', '', 1, 1, 0, NULL, 0, 3, '2024-03-30 13:31:12', NULL, 21);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (74, 'menu.demo.lib.antd-icon', 2, 'menu: antd-icon', NULL, '', '/demo/lib/icons', '', 1, 1, 0, NULL, 0, 4, '2024-03-30 13:31:12', NULL, 21);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (75, 'menu.system.monitor.login-log', 2, 'menu: monitor-login-log', NULL, '', '/system/monitor/login-log', '', 1, 1, 0, NULL, 0, 11, '2024-03-30 13:31:12', NULL, 28);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (76, 'menu.system.monitor.serve', 2, 'menu: monitor-serve', NULL, 'montor', '/system/monitor/serve', '', 1, 1, 0, NULL, 0, 11, '2024-03-30 13:31:12', NULL, 28);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (77, 'menu.demo.stack.rxjs.keybr', 2, 'menu: rxjs/keybr', NULL, '', '/demo/stack/rxjs/keybr', '', 1, 1, 0, NULL, 0, 1, '2024-03-30 13:31:12', NULL, 67);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (78, 'menu.demo.stack.rxjs.count-down', 2, 'menu: rxjs/count-down', NULL, '', '/demo/stack/rxjs/count-down', '', 1, 1, 0, NULL, 0, 2, '2024-03-30 13:31:12', NULL, 67);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (79, 'menu.demo.stack.laxjs.cursor', 2, 'menu: laxjs/cursor', NULL, '', '/demo/stack/laxjs/cursor', '', 1, 1, 0, NULL, 0, 3, '2024-03-30 13:31:12', NULL, 68);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (80, 'menu.demo.list.search.articles', 2, 'menu: articles', NULL, '', '/demo/list/search/articles', '', 1, 1, 0, NULL, 0, 1, '2024-03-30 13:31:12', NULL, 43);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (81, 'menu.demo.list.search.projects', 2, 'menu: projects', NULL, '', '/demo/list/search/projects', '', 1, 1, 0, NULL, 0, 1, '2024-03-30 13:31:12', NULL, 43);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (82, 'menu.demo.list.search.applications', 2, 'menu: applications', NULL, '', '/demo/list/search/applications', '', 1, 1, 0, NULL, 0, 1, '2024-03-30 13:31:12', NULL, 43);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (83, '项目仓库(外链)', 2, '项目仓库', NULL, 'LinkOutlined', 'https://github.com/yyong008/remix-antd-admin', '', 1, 1, 0, NULL, 1, 5, '2024-03-30 13:31:12', NULL, NULL);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (84, 'list', 3, '菜单权限', NULL, '', '', '', 1, 1, 0, NULL, 1, 11, '2024-03-30 13:31:12', NULL, 24);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (85, 'menu.profile.account', 2, 'account', NULL, NULL, '/profile/account', NULL, 1, 1, 0, NULL, NULL, NULL, '2024-03-30 13:31:12', NULL, 86);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (86, 'menu.profile.main', 1, 'menu.profile', NULL, 'UserOutlined', '/profile', NULL, 1, 1, 0, NULL, 0, 4, '2024-03-30 13:31:12', NULL, NULL);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (87, 'menu.profile.link', 2, 'link', NULL, NULL, '/profile/link/category', NULL, 1, 1, 0, NULL, NULL, NULL, '2024-03-30 13:31:12', NULL, 86);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (88, 'menu.tools.main', 1, NULL, NULL, 'ToolOutlined', '/tools', NULL, 1, 1, 0, NULL, 0, 4, '2024-03-30 13:31:12', NULL, NULL);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (89, 'menu.tools.mail', 2, NULL, NULL, NULL, '/tools/mail', NULL, 1, 1, 0, NULL, 0, NULL, '2024-03-30 13:31:12', NULL, 88);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (90, 'menu.tools.storage', 2, NULL, NULL, NULL, '/tools/storage', NULL, 1, 1, 0, NULL, 0, NULL, '2024-03-30 13:31:12', NULL, 88);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (91, 'menu.news.main', 1, '新闻目录', NULL, 'FireOutlined', '/news', NULL, 1, 1, 0, NULL, 0, NULL, '2024-03-30 13:31:12', NULL, NULL);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (92, 'menu.news.edit', 2, '编辑新闻', NULL, NULL, '/news/edit', NULL, 1, 1, 0, NULL, 0, NULL, '2024-03-30 13:31:12', NULL, 4);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (93, 'menu.blog.main', 1, NULL, NULL, 'ReadOutlined', '/blog', NULL, 1, 1, NULL, NULL, NULL, NULL, '2024-03-30 13:31:12', NULL, NULL);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (94, 'menu.blog.edit', 2, NULL, NULL, NULL, '/blog/edit', NULL, 1, 1, NULL, NULL, NULL, NULL, '2024-03-30 13:31:12', NULL, 5);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (95, 'menu.news.sub-category', 2, '新闻子类列表', NULL, NULL, '/news/category/:id', NULL, 1, 1, 0, NULL, 0, NULL, '2024-03-30 13:31:12', NULL, 4);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (96, 'menu.news.category', 2, '新闻分类', NULL, NULL, '/news/category', NULL, 1, 1, 0, NULL, 0, NULL, '2024-03-30 13:31:12', NULL, 4);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (97, 'menu.blog.category', 2, '博客分类', NULL, NULL, '/blog/category', NULL, 1, 1, 0, 'blog:category-list:get', 0, NULL, '2024-03-30 13:31:12', NULL, 5);
INSERT INTO sys_menu (id, name, type, description, remark, icon, path, path_file, status, isShow, isCache, permission, isLink, order_no, createdAt, updatedAt, parent_menu_id) VALUES (98, 'menu.blog.tag', 2, '博客标签', NULL, NULL, '/blog/tag', NULL, 1, 1, 0, NULL, 0, NULL, '2024-03-30 13:31:12', NULL, 5);

-- 表：sys_menu_role
DROP TABLE IF EXISTS sys_menu_role;
CREATE TABLE "sys_menu_role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role_id" INTEGER NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "sys_menu_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "sys_role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "sys_menu_role_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "sys_menu" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (1, 1, 1, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (2, 1, 2, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (3, 1, 3, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (4, 1, 4, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (5, 1, 5, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (6, 1, 6, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (7, 1, 7, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (8, 1, 8, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (9, 1, 9, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (10, 1, 10, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (11, 1, 11, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (12, 1, 12, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (13, 1, 13, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (14, 1, 14, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (15, 1, 15, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (16, 1, 16, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (17, 1, 17, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (18, 1, 18, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (19, 1, 19, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (20, 1, 20, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (21, 1, 21, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (22, 1, 22, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (23, 1, 23, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (24, 1, 24, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (25, 1, 25, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (26, 1, 26, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (27, 1, 27, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (28, 1, 28, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (29, 1, 29, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (30, 1, 30, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (31, 1, 31, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (32, 1, 32, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (33, 1, 33, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (34, 1, 34, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (35, 1, 35, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (36, 1, 36, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (37, 1, 37, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (38, 1, 38, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (39, 1, 39, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (40, 1, 40, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (41, 1, 41, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (42, 1, 42, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (43, 1, 43, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (44, 1, 44, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (45, 1, 45, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (46, 1, 46, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (47, 1, 47, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (48, 1, 48, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (49, 1, 49, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (50, 1, 50, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (51, 1, 51, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (52, 1, 52, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (53, 1, 53, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (54, 1, 54, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (55, 1, 55, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (56, 1, 56, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (57, 1, 57, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (58, 1, 58, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (59, 1, 59, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (60, 1, 60, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (61, 1, 61, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (62, 1, 62, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (63, 1, 63, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (64, 1, 64, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (65, 1, 65, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (66, 1, 66, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (67, 1, 67, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (68, 1, 68, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (69, 1, 69, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (70, 1, 70, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (71, 1, 71, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (72, 1, 72, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (73, 1, 73, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (74, 1, 74, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (75, 1, 75, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (76, 1, 76, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (77, 1, 77, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (78, 1, 78, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (79, 1, 79, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (80, 1, 80, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (81, 1, 81, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (82, 1, 82, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (83, 1, 83, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (84, 2, 1, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (85, 2, 6, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (86, 2, 7, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (87, 3, 1, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (88, 6, 6, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (89, 3, 7, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (90, 1, 85, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (91, 1, 87, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (92, 1, 86, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (94, 1, 89, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (95, 1, 88, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (96, 1, 92, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (99, 1, 94, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (100, 1, 96, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (103, 1, 97, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (104, 1, 98, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_menu_role (id, role_id, menu_id, createdAt, updatedAt) VALUES (105, 1, 90, '2024-03-30 13:31:12', NULL);

-- 表：sys_role
DROP TABLE IF EXISTS sys_role;
CREATE TABLE "sys_role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "remark" TEXT,
    "status" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO sys_role (id, name, value, description, remark, status, createdAt, updatedAt) VALUES (1, 'Super Admin', 'Super Admin', 'Super Admin Role', 'Super Remark for Admin Role', 0, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_role (id, name, value, description, remark, status, createdAt, updatedAt) VALUES (2, 'Admin', 'Administrator role', 'Admin Role', 'Remark for Admin Role', 0, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_role (id, name, value, description, remark, status, createdAt, updatedAt) VALUES (3, 'User', 'Regular user role', 'User Role', 'Remark for Regular Role', 1, '2024-03-30 13:31:12', NULL);

-- 表：sys_user
DROP TABLE IF EXISTS sys_user;
CREATE TABLE "sys_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "avatar" TEXT,
    "email" TEXT,
    "name" TEXT NOT NULL,
    "nickname" TEXT,
    "password" TEXT NOT NULL,
    "lang" TEXT NOT NULL DEFAULT 'en-US',
    "theme" TEXT NOT NULL DEFAULT 'light',
    "phone" TEXT,
    "remark" TEXT,
    "status" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "department_id" INTEGER,
    CONSTRAINT "sys_user_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "sys_department" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO sys_user (id, avatar, email, name, nickname, password, lang, theme, phone, remark, status, createdAt, updatedAt, department_id) VALUES (1, '', 'admin1@example.com', 'super admin', 'iy1', '49dc52e6bf2abe5ef6e2bb5b0f1ee2d765b922ae6cc8b95d39dc06c21c848f8c', 'en-US', 'dark', '1112223333', '超级管理员', 1, '2024-03-30 13:31:12', NULL, 1);
INSERT INTO sys_user (id, avatar, email, name, nickname, password, lang, theme, phone, remark, status, createdAt, updatedAt, department_id) VALUES (2, '', 'user2@example.com', 'admin', 'iy2', '49dc52e6bf2abe5ef6e2bb5b0f1ee2d765b922ae6cc8b95d39dc06c21c848f8c', 'en-US', 'light', '1112223333', '管理员', 0, '2024-03-30 13:31:12', NULL, 1);
INSERT INTO sys_user (id, avatar, email, name, nickname, password, lang, theme, phone, remark, status, createdAt, updatedAt, department_id) VALUES (3, '', 'admin3@example.com', 'user1', 'iy3', '49dc52e6bf2abe5ef6e2bb5b0f1ee2d765b922ae6cc8b95d39dc06c21c848f8c', 'en-US', 'dark', '1112223333', '超级管理员', 1, '2024-03-30 13:31:12', NULL, 1);
INSERT INTO sys_user (id, avatar, email, name, nickname, password, lang, theme, phone, remark, status, createdAt, updatedAt, department_id) VALUES (4, '', 'user4@example.com', 'user2', 'iy4', '49dc52e6bf2abe5ef6e2bb5b0f1ee2d765b922ae6cc8b95d39dc06c21c848f8c', 'en-US', 'light', '1112223333', '用户', 0, '2024-03-30 13:31:12', NULL, 1);
INSERT INTO sys_user (id, avatar, email, name, nickname, password, lang, theme, phone, remark, status, createdAt, updatedAt, department_id) VALUES (5, '', 'admin5@example.com', 'user3', 'iy5', '49dc52e6bf2abe5ef6e2bb5b0f1ee2d765b922ae6cc8b95d39dc06c21c848f8c', 'en-US', 'dark', '1112223333', '用户', 1, '2024-03-30 13:31:12', NULL, 1);
INSERT INTO sys_user (id, avatar, email, name, nickname, password, lang, theme, phone, remark, status, createdAt, updatedAt, department_id) VALUES (6, '', 'user6@example.com', 'user4', 'iy6', '49dc52e6bf2abe5ef6e2bb5b0f1ee2d765b922ae6cc8b95d39dc06c21c848f8c', 'en-US', 'light', '1112223333', '用户', 0, '2024-03-30 13:31:12', NULL, 1);
INSERT INTO sys_user (id, avatar, email, name, nickname, password, lang, theme, phone, remark, status, createdAt, updatedAt, department_id) VALUES (7, '', 'admin7@example.com', 'user5', 'iy7', '49dc52e6bf2abe5ef6e2bb5b0f1ee2d765b922ae6cc8b95d39dc06c21c848f8c', 'en-US', 'dark', '1112223333', '用户', 1, '2024-03-30 13:31:12', NULL, 1);
INSERT INTO sys_user (id, avatar, email, name, nickname, password, lang, theme, phone, remark, status, createdAt, updatedAt, department_id) VALUES (8, '', 'user8@example.com', 'user6', 'iy8', '49dc52e6bf2abe5ef6e2bb5b0f1ee2d765b922ae6cc8b95d39dc06c21c848f8c', 'en-US', 'light', '1112223333', '用户', 0, '2024-03-30 13:31:12', NULL, 1);
INSERT INTO sys_user (id, avatar, email, name, nickname, password, lang, theme, phone, remark, status, createdAt, updatedAt, department_id) VALUES (9, '', 'admin9@example.com', 'user7', 'iy9', '49dc52e6bf2abe5ef6e2bb5b0f1ee2d765b922ae6cc8b95d39dc06c21c848f8c', 'en-US', 'dark', '1112223333', '用户', 1, '2024-03-30 13:31:12', NULL, 1);
INSERT INTO sys_user (id, avatar, email, name, nickname, password, lang, theme, phone, remark, status, createdAt, updatedAt, department_id) VALUES (10, '', 'user10@example.com', 'user8', 'iy10', '49dc52e6bf2abe5ef6e2bb5b0f1ee2d765b922ae6cc8b95d39dc06c21c848f8c', 'en-US', 'light', '1112223333', '用户', 0, '2024-03-30 13:31:12', NULL, 1);
INSERT INTO sys_user (id, avatar, email, name, nickname, password, lang, theme, phone, remark, status, createdAt, updatedAt, department_id) VALUES (11, '', 'admin11@example.com', 'user9', 'iy11', '49dc52e6bf2abe5ef6e2bb5b0f1ee2d765b922ae6cc8b95d39dc06c21c848f8c', 'en-US', 'dark', '1112223333', '用户', 1, '2024-03-30 13:31:12', NULL, 1);
INSERT INTO sys_user (id, avatar, email, name, nickname, password, lang, theme, phone, remark, status, createdAt, updatedAt, department_id) VALUES (12, '', 'user12@example.com', 'user10', 'iy12', '49dc52e6bf2abe5ef6e2bb5b0f1ee2d765b922ae6cc8b95d39dc06c21c848f8c', 'en-US', 'light', '1112223333', '用户', 0, '2024-03-30 13:31:12', NULL, 1);
INSERT INTO sys_user (id, avatar, email, name, nickname, password, lang, theme, phone, remark, status, createdAt, updatedAt, department_id) VALUES (13, '', 'admin13@example.com', 'user11', 'iy13', '49dc52e6bf2abe5ef6e2bb5b0f1ee2d765b922ae6cc8b95d39dc06c21c848f8c', 'en-US', 'dark', '1112223333', '用户', 1, '2024-03-30 13:31:12', NULL, 1);
INSERT INTO sys_user (id, avatar, email, name, nickname, password, lang, theme, phone, remark, status, createdAt, updatedAt, department_id) VALUES (14, '', 'user14@example.com', 'user12', 'iy14', '49dc52e6bf2abe5ef6e2bb5b0f1ee2d765b922ae6cc8b95d39dc06c21c848f8c', 'en-US', 'light', '1112223333', '用户', 0, '2024-03-30 13:31:12', NULL, 1);
INSERT INTO sys_user (id, avatar, email, name, nickname, password, lang, theme, phone, remark, status, createdAt, updatedAt, department_id) VALUES (15, '', 'admin15@example.com', 'user13', 'iy15', '49dc52e6bf2abe5ef6e2bb5b0f1ee2d765b922ae6cc8b95d39dc06c21c848f8c', 'en-US', 'dark', '1112223333', '用户', 1, '2024-03-30 13:31:12', NULL, 1);
INSERT INTO sys_user (id, avatar, email, name, nickname, password, lang, theme, phone, remark, status, createdAt, updatedAt, department_id) VALUES (16, '', 'user16@example.com', 'user14', 'iy16', '49dc52e6bf2abe5ef6e2bb5b0f1ee2d765b922ae6cc8b95d39dc06c21c848f8c', 'zh-CN', 'light', '1112223333', '用户', 0, '2024-03-30 13:31:12', NULL, 1);

-- 表：sys_user_role
DROP TABLE IF EXISTS sys_user_role;
CREATE TABLE "sys_user_role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "sys_user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "sys_user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "sys_user_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "sys_role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO sys_user_role (id, user_id, role_id, createdAt, updatedAt) VALUES (1, 1, 1, '2024-03-30 13:31:12', NULL);
INSERT INTO sys_user_role (id, user_id, role_id, createdAt, updatedAt) VALUES (2, 2, 2, '2024-03-30 13:31:12', NULL);

-- 表：tools_storage
DROP TABLE IF EXISTS tools_storage;
CREATE TABLE "tools_storage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "ext_name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "type" TEXT NOT NULL
);
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (1, 1711884113960, NULL, 1, 'ollama api 访问的方式-1711884113875.png', 'ollama api 访问的方式-1711884113875.png', '.png', '/uploads/ollama api 访问的方式-1711884113875.png', '136136', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (2, 1711884113960, NULL, 1, 'docker open web-ui-1711884113874.png', 'docker open web-ui-1711884113874.png', '.png', '/uploads/docker open web-ui-1711884113874.png', '108381', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (3, 1711884113960, NULL, 1, 'ollama 官方网站-1711884113874.png', 'ollama 官方网站-1711884113874.png', '.png', '/uploads/ollama 官方网站-1711884113874.png', '73098', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (4, 1711884113960, NULL, 1, 'ollama 适用写一个组件-1711884113875.png', 'ollama 适用写一个组件-1711884113875.png', '.png', '/uploads/ollama 适用写一个组件-1711884113875.png', '113208', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (5, 1711884113960, NULL, 1, 'open-webui 聊天界面-1711884113874.png', 'open-webui 聊天界面-1711884113874.png', '.png', '/uploads/open-webui 聊天界面-1711884113874.png', '90170', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (6, 1711884114332, NULL, 1, 'docker open web-ui-1711884114199.png', 'docker open web-ui-1711884114199.png', '.png', '/uploads/docker open web-ui-1711884114199.png', '108381', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (7, 1711884114822, NULL, 1, 'ollama api 访问的方式-1711884114253.png', 'ollama api 访问的方式-1711884114253.png', '.png', '/uploads/ollama api 访问的方式-1711884114253.png', '136136', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (8, 1711884114825, NULL, 1, 'ollama 适用写一个组件-1711884114254.png', 'ollama 适用写一个组件-1711884114254.png', '.png', '/uploads/ollama 适用写一个组件-1711884114254.png', '113208', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (9, 1711884114823, NULL, 1, 'ollama 官方网站-1711884114254.png', 'ollama 官方网站-1711884114254.png', '.png', '/uploads/ollama 官方网站-1711884114254.png', '73098', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (10, 1711884114826, NULL, 1, 'open-webui 聊天界面-1711884114254.png', 'open-webui 聊天界面-1711884114254.png', '.png', '/uploads/open-webui 聊天界面-1711884114254.png', '90170', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (11, 1711884180350, NULL, 1, 'docker open web-ui-1711884180275.png', 'docker open web-ui-1711884180275.png', '.png', '/uploads/docker open web-ui-1711884180275.png', '108381', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (12, 1711884180365, NULL, 1, 'ollama 适用写一个组件-1711884180321.png', 'ollama 适用写一个组件-1711884180321.png', '.png', '/uploads/ollama 适用写一个组件-1711884180321.png', '113208', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (13, 1711884180369, NULL, 1, 'open-webui 聊天界面-1711884180321.png', 'open-webui 聊天界面-1711884180321.png', '.png', '/uploads/open-webui 聊天界面-1711884180321.png', '90170', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (14, 1711884180367, NULL, 1, 'ollama 官方网站-1711884180321.png', 'ollama 官方网站-1711884180321.png', '.png', '/uploads/ollama 官方网站-1711884180321.png', '73098', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (15, 1711884180368, NULL, 1, 'ollama api 访问的方式-1711884180275.png', 'ollama api 访问的方式-1711884180275.png', '.png', '/uploads/ollama api 访问的方式-1711884180275.png', '136136', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (16, 1711884379769, NULL, 1, 'docker open web-ui-1711884379632.png', 'docker open web-ui-1711884379632.png', '.png', '/uploads/docker open web-ui-1711884379632.png', '108381', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (17, 1711884379780, NULL, 1, 'open-webui 聊天界面-1711884379718.png', 'open-webui 聊天界面-1711884379718.png', '.png', '/uploads/open-webui 聊天界面-1711884379718.png', '90170', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (18, 1711884379783, NULL, 1, 'ollama api 访问的方式-1711884379718.png', 'ollama api 访问的方式-1711884379718.png', '.png', '/uploads/ollama api 访问的方式-1711884379718.png', '136136', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (19, 1711884379782, NULL, 1, 'ollama 官方网站-1711884379718.png', 'ollama 官方网站-1711884379718.png', '.png', '/uploads/ollama 官方网站-1711884379718.png', '73098', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (20, 1711884379786, NULL, 1, 'ollama 适用写一个组件-1711884379718.png', 'ollama 适用写一个组件-1711884379718.png', '.png', '/uploads/ollama 适用写一个组件-1711884379718.png', '113208', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (21, 1711884379785, NULL, 1, 'web-ui 配置-1711884379718.png', 'web-ui 配置-1711884379718.png', '.png', '/uploads/web-ui 配置-1711884379718.png', '45782', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (22, 1711885920589, NULL, 1, 'open-webui 聊天界面-1711885920576.png', 'open-webui 聊天界面-1711885920576.png', '.png', '/uploads/open-webui 聊天界面-1711885920576.png', '90170', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (23, 1711885920602, NULL, 1, '模型搜索.png', '模型搜索.png', '.png', '/uploads/模型搜索.png', '47948', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (24, 1711885920603, NULL, 1, 'web-ui 配置-1711885920576.png', 'web-ui 配置-1711885920576.png', '.png', '/uploads/web-ui 配置-1711885920576.png', '45782', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (25, 1711886444081, NULL, 1, 'ollama 官方网站-1711886444064.png', 'ollama 官方网站-1711886444064.png', '.png', '/uploads/ollama 官方网站-1711886444064.png', '73098', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (26, 1711886444091, NULL, 1, 'ollama api 访问的方式-1711886444064.png', 'ollama api 访问的方式-1711886444064.png', '.png', '/uploads/ollama api 访问的方式-1711886444064.png', '136136', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (27, 1711886444092, NULL, 1, 'open-webui 聊天界面-1711886444064.png', 'open-webui 聊天界面-1711886444064.png', '.png', '/uploads/open-webui 聊天界面-1711886444064.png', '90170', 'image/png');
INSERT INTO tools_storage (id, createdAt, updatedAt, user_id, name, file_name, ext_name, path, size, type) VALUES (28, 1711886444093, NULL, 1, 'ollama 适用写一个组件-1711886444064.png', 'ollama 适用写一个组件-1711886444064.png', '.png', '/uploads/ollama 适用写一个组件-1711886444064.png', '113208', 'image/png');

-- 索引：blog_category_name_key
DROP INDEX IF EXISTS blog_category_name_key;
CREATE UNIQUE INDEX "blog_category_name_key" ON "blog_category"("name");

-- 索引：blog_tag_name_key
DROP INDEX IF EXISTS blog_tag_name_key;
CREATE UNIQUE INDEX "blog_tag_name_key" ON "blog_tag"("name");

-- 索引：news_category_name_key
DROP INDEX IF EXISTS news_category_name_key;
CREATE UNIQUE INDEX "news_category_name_key" ON "news_category"("name");

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
