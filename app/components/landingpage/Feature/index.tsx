import { AntdIconSVG } from "../BuildWith/icons/AntdIconSVG";
import { LangChainIconSVG } from "../BuildWith/icons/LangChainIconSVG";
import { PrismaIconSVG } from "../BuildWith/icons/prismaIconSVG";
import { ReactrouterSVGIcon } from "../BuildWith/icons/ReactrouterSVG";
import { TailwindSVG } from "../BuildWith/icons/TailwindSVG";

export function Feature() {
  return (
    <div className="w-[60vw] flex flex-col  mx-auto my-[100px]">
      {/* <div className="text-[60px] mb-[40px] text-center">特性</div> */}
      <div className="flex flex-col px-[50px]">
        <FeatureItem />
      </div>
    </div>
  );
}

function FeatureItem() {
  return (
    <div id="feature" className="flex gap-[80px]">
      <div className="w-[520px]">
        <img src="/images/feature/whatis.png" alt="" />
      </div>
      <div className="mt-[10px] font-[20px]">
        <h3 className="text-[40px]">什么是 Remix Antd Admin?</h3>
        <div className="my-[10px]">
          <div className="text-[20px] text-[#999]">
            Remix Antd Admin 能帮你迅速开始开始一个 Remix 全栈 AI 项目
          </div>
          <div className="flex flex-col">
            <Item
              icon={<ReactrouterSVGIcon />}
              title={"React Router Express 内置支持"}
              content="基于 Remix + Express路由快开发项目"
            />
            <Item
              icon={<AntdIconSVG />}
              title={"Antd 组件支持"}
              content="基于 Antd 组件库开发项目"
            />
            <Item
              icon={<TailwindSVG />}
              title={"TailwindCSS 组件支持"}
              content="基于 TailwindCSS 组件库开发项目"
            />
            <Item
              icon={<LangChainIconSVG />}
              title={"LangChain 内置支持"}
              content="基于 LangChain 的 AI 能力开发项目"
            />
            <Item
              icon={<PrismaIconSVG />}
              title={"Prisma 内置支持"}
              content="基于 Prisma 的数据库开发项目"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Item({
  icon,
  title,
  content,
}: {
  icon: JSX.Element;
  title: string;
  content: string;
}) {
  return (
    <div className="flex py-[10px]">
      <div className="flex w-[160px] justify-start items-center">{icon}</div>
      <div className="flex flex-col ml-[20px]">
        <span className="font-bold from-neutral-400">{title}</span>
        <span className="text-[14px] text-[#999]">{content}</span>
      </div>
    </div>
  );
}
