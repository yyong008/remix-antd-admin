import * as ic from "@ant-design/icons";

import { Link, useNavigate } from "@remix-run/react";

import { Dropdown } from "antd";

// icons
const {
  GithubFilled,
  InfoCircleFilled,
  QuestionCircleFilled,
  TranslationOutlined,
  HomeFilled,
} = ic;

const ActionRenderImpl = ({ value }: any) => {
  const navigate = useNavigate();

  const choiceLang = (lang: string) => {
    let p = location.pathname.split("/");
    p[1] = lang || "en-US";

    navigate(p.join("/").trim(), {
      replace: true,
    });

    value.setLang(lang || "en-US");
    window.location.href = p.join("/").trim();
  };
  return (
    <Dropdown
      key="lang"
      menu={{
        items: [
          {
            key: "en",
            label: "EN English",
            onClick: () => {
              choiceLang("en-US");
            },
          },
          {
            key: "cn",
            label: "CN 简体中文",
            onClick: () => {
              choiceLang("zh-CN");
            },
          },
        ],
      }}
    >
      <TranslationOutlined />
    </Dropdown>
  );
};

export const createActionRenderWrap =
  ({ value }: any) =>
  (props: any) => {
    const goGithub = () => {
      let aTag: any = document.createElement("a");
      aTag.setAttribute("href", "https://github.com/yyong008/remix-antd-admin");
      aTag.setAttribute("target", "_blank");
      aTag.click();
      aTag = null;
    };
    if (props.isMobile) return [];
    return [
      <div key="home">
        <Link to="/">
          <HomeFilled />
        </Link>
      </div>,
      <InfoCircleFilled key="InfoCircleFilled" />,
      <QuestionCircleFilled key="QuestionCircleFilled" />,
      <GithubFilled key="GithubFilled" onClick={goGithub} />,
      <ActionRenderImpl key="actionRender" value={value} />,
    ];
  };
