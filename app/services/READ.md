# services

## 编程范式

- 函数式

## 对外输出

- `action/loader` 的 api, 使得 api 层只需要分发即可。

## 命名

- 'xxx.service.ts'

## 任务

- 完成繁重的计算任务
- 访问数据层 dals

## 问题

- blog 列表（tag/category） 显示不出来。

- api/admin/blog?page=1&pageSize=10 返回的不是 json 数据

## serveice 命名

`[module_name]/[action_name]/service`

- modules_name: news/news_category
- action_name: create/read/readList/update/delete
