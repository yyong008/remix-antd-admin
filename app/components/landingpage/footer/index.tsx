import { Link, useParams } from "react-router";

import { AntdLinkIconSVG } from "../BuildWith/icons/AntdLinkIconSVG";
import { defaultLang } from "~/config/lang";
import { getLinks } from "~/config/links";

export function Footer() {
  return (
    <section className=" w-[60vw]">
      <FooterContent />
    </section>
  );
}

function FooterContent() {
  const { lang } = useParams();
  const data = getLinks(lang || defaultLang);
  return (
    <div className="py-[20px] w-[60vw] flex justify-between">
      <div className="flex flex-col  w-[400px] gap-6">
        <img className="w-[60px] h-[60px]" src="/logo.png" alt="" />
        <span>Remix Antd Admin is an open source project.</span>
        <CopyAndPrivacy />
      </div>
      <div className="flex gap-[100px]">
        {data.map((lk) => (
          <LinkList key={lk.title} title={lk.title} links={lk.links} />
        ))}
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
