import {
  GithubFilled,
  HomeFilled,
  InfoCircleFilled,
  QuestionCircleFilled,
  TranslationOutlined,
} from "@ant-design/icons";

import { Dropdown } from "antd";
import { useNavigate, useParams } from "react-router";

const ActionRenderImpl = () => {
  const navigate = useNavigate();
  const { locale: _locale } = useParams();

  const choiceLang = (newLocale: string) => {
    navigate(`/${newLocale ? `${newLocale}/` : ""}admin/dashboard`, {
      replace: true,
    });
  };
  return (
    <Dropdown
      key="locale"
      menu={{
        items: [
          {
            key: "en",
            label: "EN English",
            onClick: () => {
              choiceLang("en");
            },
          },
          {
            key: "cn",
            label: "CN 简体中文",
            onClick: () => {
              choiceLang("zh");
            },
          },
        ],
      }}
    >
      <TranslationOutlined />
    </Dropdown>
  );
};

export const createActionRenderWrap = () => (props: any) => {
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
    <ActionRenderImpl key="actionRender" />,
  ];
};

function HomeIcon() {
  const navigate = useNavigate();
  const { locale } = useParams();
  return (
    <HomeFilled
      onClick={() => {
        navigate(`/${locale ? `${locale}/` : ""}`);
      }}
    />
  );
}
