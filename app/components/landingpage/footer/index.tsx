import { Link, useParams } from "react-router";

import { AntdLinkIconSVG } from "../BuildWith/icons/AntdLinkIconSVG";
import { defaultLang } from "~/config/lang";

export function Footer() {
  return (
    <section className=" w-[60vw]">
      <FooterContent />
    </section>
  );
}

function FooterContent() {
  const { lang } = useParams();
  return (
    <div className="py-[20px] w-[60vw] flex justify-between">
      <div className="flex flex-col  w-[400px] gap-6">
        <img className="w-[60px] h-[60px]" src="/logo.png" alt="" />
        <span>Remix Antd Admin is an open source project.</span>
        <CopyAndPrivacy />
      </div>
      <div className="flex gap-[100px]">
        <LinkList
          title="更多"
          links={[
            {
              text: "Github",
              to: "https://github.com/yyong008/remix-antd-admin",
              isOut: true,
            },
            {
              text: "组件",
              to: "https://remix-antd-admin-docs.vercel.app/antd/",
              isOut: true,
            },
            {
              text: "业务",
              to: "https://remix-antd-admin-docs.vercel.app/feature/home.html",
              isOut: true,
            },
          ]}
        />
        <LinkList
          title="资源"
          links={[
            {
              text: "文档",
              to: "https://remix-antd-admin-docs.vercel.app/",
              isOut: true,
            },
            {
              text: "privacy",
              to: `/${lang || defaultLang}/privacy`,
              isOut: false,
            },
          ]}
        />
      </div>
    </div>
  );
}

function CopyAndPrivacy() {
  return (
    <div className="flex justify-between items-center text-gray-800">
      <div>@{new Date().getFullYear()} Remix Antd Admin Copyright</div>
    </div>
  );
}

function LinkList({
  title,
  links,
}: {
  title: string;
  links: { to: string; text: string; isOut: boolean }[];
}) {
  return (
    <div className="text-gray-600">
      <div className="text-[14px] font-bold mb-[20px] text-gray-800">
        {title}
      </div>
      <ul className="flex flex-col gap-4">
        {links.map((link, index) => {
          return (
            <Link to={link.to} key={index} target={link.isOut ? "_blank" : ""}>
              <li className="flex gap-[4px] text-[14px] pr-[12px]">
                {link.text}
                {link.isOut ? (
                  <p className="">
                    <AntdLinkIconSVG size={12} />
                  </p>
                ) : (
                  <></>
                )}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
