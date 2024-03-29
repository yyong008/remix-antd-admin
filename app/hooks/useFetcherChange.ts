import { useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";
import { message } from "antd";

export const useFetcherChange = () => {
  const [setState] = useState("");
  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data) {
      return;
    }

    if (fetcher.state === "submitting") {
      setState("submitting");
    }

    if (fetcher.data) {
      const { data, state } = fetcher;
      if (data?.code === 0) {
        if (state === "loading") {
          setState("loading");
        }
        if (state === "idle") {
          setState("idle");
          message.info(data.message ?? "操作成功");
        }
      } else if (data.code === 1) {
        if (state === "idle") {
          setState("idle");
          message.error(data.message ?? "操作失败");
        }
      }
    }
  }, [fetcher]);
  return fetcher;
};
