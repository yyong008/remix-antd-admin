import {
  GithubFilled,
  HomeFilled,
  InfoCircleFilled,
  QuestionCircleFilled,
  TranslationOutlined,
} from "@ant-design/icons";

import { Dropdown } from "antd";
import { defaultLang } from "@/config/lang";
import { useNavigate } from "@remix-run/react";

const ActionRenderImpl = ({ value }: any) => {
  const navigate = useNavigate();

  const choiceLang = (lang: string) => {
    const lg = lang || defaultLang;
    let p = location.pathname.split("/");
    p[1] = lg;

    const to = p.join("/").trim();
    navigate(to, {
      replace: true,
    });

    value.setLang(lg);
    window.location.href = to;
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
      <HomeIcon key="HomeIcon" />,
      <InfoCircleFilled key="InfoCircleFilled" />,
      <QuestionCircleFilled key="QuestionCircleFilled" />,
      <GithubFilled key="GithubFilled" onClick={goGithub} />,
      <ActionRenderImpl key="actionRender" value={value} />,
    ];
  };

function HomeIcon() {
  const navigate = useNavigate();
  return (
    <HomeFilled
      onClick={() => {
        navigate("/");
      }}
    />
  );
}
