import type { ReactNode } from "react";
import { AISDKIconSVG } from "../BuildWith/icons/AISDKIconSVG";
import { AntdIconSVG } from "../BuildWith/icons/AntdIconSVG";
import { DrizzleIconSVG } from "../BuildWith/icons/DrizzleIconSVG";
import { ReactrouterSVGIcon } from "../BuildWith/icons/ReactrouterSVG";
import { PRODUCT_NAME } from "~/config/product";

export function Feature() {
  return (
    <div style={{ width: "60vw", display: "flex", flexDirection: "column", margin: "100px auto" }}>
      {/* <div className="text-[60px] mb-[40px] text-center">特性</div> */}
      <div style={{ display: "flex", flexDirection: "column", paddingInline: 50 }}>
        <FeatureItem />
      </div>
    </div>
  );
}

function FeatureItem() {
  return (
    <div id="feature" style={{ display: "flex", gap: 80 }}>
      <div style={{ width: 520 }}>
        <img src="/images/feature/whatis.png" alt="" />
      </div>
      <div style={{ marginTop: 10, fontSize: 20 }}>
        <h3 style={{ fontSize: 40 }}>什么是 {PRODUCT_NAME}?</h3>
        <div style={{ marginBlock: 10 }}>
          <div style={{ fontSize: 20, color: "#999" }}>
            {PRODUCT_NAME} 能帮你迅速开始一个 React Router 全栈 AI 项目
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Item
              icon={<ReactrouterSVGIcon />}
              title={"React Router Hono 内置支持"}
              content="基于 Remix + Hono 路由快速开发项目"
            />
            <Item
              icon={<AntdIconSVG />}
              title={"Antd 组件支持"}
              content="基于 Antd 组件库开发项目"
            />
            <Item
              icon={<AISDKIconSVG />}
              title={"AI SDK 内置支持"}
              content="基于 AI SDK 的 AI 能力开发项目"
            />
            <Item
              icon={<DrizzleIconSVG />}
              title={"Drizzle 内置支持"}
              content="基于 Drizzle ORM 的数据库开发项目"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Item({ icon, title, content }: { icon: ReactNode; title: string; content: string }) {
  return (
    <div style={{ display: "flex", paddingBlock: 10 }}>
      <div
        style={{ width: 160, display: "flex", justifyContent: "flex-start", alignItems: "center" }}
      >
        {icon}
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginLeft: 20 }}>
        <span style={{ fontWeight: "bold", color: "#a3a3a3" }}>{title}</span>
        <span style={{ fontSize: 14, color: "#999" }}>{content}</span>
      </div>
    </div>
  );
}
