/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
// type
import type { V2_MetaFunction } from "@remix-run/node";

// core
import { json } from "@remix-run/node";

// core
import React from "react";

// components:vendor
import { Space, Tag } from "antd";
import { ProList } from "@ant-design/pro-components";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";

// styled
import { Tasks, AddModalForm } from "~/components/listBasicList";

// hooks
import { useLoaderData } from "@remix-run/react";

// data
import data from "~/data/listBasicList";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "搜索表格",
    },
  ];
};

export const loader = () => {
  return json(data.dataSource);
};

const IconText = ({ icon, text }: { icon: any; text: string }) => (
  <span>
    {React.createElement(icon, { style: { marginInlineEnd: 8 } })}
    {text}
  </span>
);

export default function ListBasicPage() {
  const dataSource = useLoaderData();
  return (
    <Space direction="vertical">
      <Tasks />
      <div>
      <ProList<{ title: string }>
        itemLayout="vertical"
        rowKey="id"
        dataSource={dataSource}
        metas={{
          title: {},
          description: {
            render: () => (
              <>
                <Tag color="magenta">麻辣火锅</Tag>
                <Tag color="volcano">剁椒鱼头</Tag>
                <Tag color="cyan">铁板烧</Tag>
              </>
            ),
          },
          actions: {
            render: () => [
              <IconText icon={StarOutlined} text="156" key="star-o" />,
              <IconText icon={LikeOutlined} text="156" key="like-o" />,
              <IconText icon={MessageOutlined} text="2" key="message" />,
            ],
          },
          extra: {
            render: () => (
              <img
                width={272}
                alt="logo"
                src="/images/bear.png"
              />
            ),
          },
          content: {
            render: () => {
              return (
                <div style={{ margin: "0px -32px 0px -32px" }}>
                  专注于 Web 标准和现代 Web 应用程序
                  UX，您只需构建更好的网站即可 Remix 是一个全栈 Web
                  框架，可让您专注于用户界面并重新了解 Web
                  标准，以提供快速、流畅和弹性的用户体验。人们会喜欢使用你的东西。
                </div>
              );
            },
          },
        }}
      />
        <AddModalForm />
      </div>
    </Space>
  );
}
