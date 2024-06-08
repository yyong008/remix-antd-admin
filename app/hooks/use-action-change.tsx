import { useActionData } from "@remix-run/react";
import { message } from "antd";
import { useEffect, useState } from "react";

export const useActionDataChange = () => {
  const [loading, setLoading] = useState(false);
  const data: any = useActionData();

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
    if (data && data.code === 1) {
      message.error(data.message);
    }
  }, [data]);

  return { data, loading, setLoading };
};
