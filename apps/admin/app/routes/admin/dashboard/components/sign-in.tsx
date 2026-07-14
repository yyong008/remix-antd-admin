import { Button, message } from "antd";

import { CheckCircleFilled } from "@ant-design/icons";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import { useUserSignIn } from "~/api-client/queries/dashboard/dashboard";
import { m } from "~/paraglide/messages";

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
          message.info(result.message ?? m.dashboard_signin_already());
        } else {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      } else {
        message.error(result.message ?? m.dashboard_signin_failed());
      }
    } catch (e) {
      message.error(e instanceof Error ? e.message : m.dashboard_signin_request_failed());
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
          {m.dashboard_signin()}
        </Button>
      ) : (
        <Button
          type="primary"
          icon={<CheckCircleFilled />}
          onClick={() => {
            message.success(m.dashboard_signin_done_toast());
          }}
        >
          {m.dashboard_signin_done()}
        </Button>
      )}
    </div>
  );
}
