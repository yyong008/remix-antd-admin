import { Button, message } from "antd";

import { CheckCircleFilled } from "@ant-design/icons";
import confetti from "canvas-confetti";
import { useState, useTransition } from "react";
import { userSignIn } from "~/admin/apis/admin/system/user";
import { useTranslation } from "react-i18next";

export function SignIn({ data: _data }: any) {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState(_data);
  const { t } = useTranslation("dashboard");
  const signInHanlder = async () => {
    startTransition(async () => {
      const result: any = await userSignIn();
      if (result.code === 0) {
        setData({
          ...data,
          isLogin: true,
        });
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        message.error(result.message);
      }
    });
  };

  return (
    <div>
      {!data?.isLogin ? (
        <Button
          type="primary"
          onClick={signInHanlder}
          htmlType="submit"
          loading={isPending}
        >
          {t("signIn.signIn")}
        </Button>
      ) : (
        <Button
          type="primary"
          icon={<CheckCircleFilled />}
          disabled={data?.isLogin}
          onClick={() => {
            message.success(t("signIn.signInSuccess"));
          }}
        >
          {t("signIn.signIned")}
        </Button>
      )}
    </div>
  );
}
