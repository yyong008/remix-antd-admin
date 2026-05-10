import { Button, message } from "antd";

import { CheckCircleFilled } from "@ant-design/icons";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import { useUserSignIn } from "~/api-client/queries/dashboard/dashboard";

export function SignIn({ data: initialData }: any) {
  const [data, setData] = useState(initialData);
  const signInMutation = useUserSignIn();

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const signInHanlder = async () => {
    try {
      const result: any = await signInMutation.mutateAsync();
      if (result.code === 0) {
        setData({
          ...data,
          isLogin: true,
        });
        if (result.data?.alreadySigned) {
          message.info(result.message ?? "今日已签到");
        } else {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      } else {
        message.error(result.message ?? "签到失败");
      }
    } catch (e) {
      message.error(e instanceof Error ? e.message : "签到请求失败");
    }
  };
  return (
    <div>
      {!data?.isLogin ? (
        <Button
          onClick={signInHanlder}
          htmlType="submit"
          disabled={data?.isLogin}
          loading={signInMutation.isPending}
        >
          签到
        </Button>
      ) : (
        <Button
          type="primary"
          icon={<CheckCircleFilled />}
          onClick={() => {
            message.success("🤖 已签到，明天再来吧");
          }}
        >
          已签到
        </Button>
      )}
    </div>
  );
}
