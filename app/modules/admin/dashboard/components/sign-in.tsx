import * as ic from "@ant-design/icons";

import { Button } from "antd";
import { useSubmit } from "@remix-run/react";

const { CheckCircleFilled } = ic;
export function SignIn({ data }: any) {
  const submit = useSubmit();
  return (
    <div>
      {!data.isLogin ? (
        <Button
          onClick={() => {
            submit(
              {},
              {
                method: "post",
                action: "/api/signin",
                navigate: false,
              },
            );
          }}
          htmlType="submit"
          disabled={data.isLogin}
        >
          签到
        </Button>
      ) : (
        <Button type="primary" icon={<CheckCircleFilled />}>
          已签到
        </Button>
      )}
    </div>
  );
}
