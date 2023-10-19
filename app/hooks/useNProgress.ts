import { useNavigation } from "@remix-run/react";
import { useEffect } from "react";

import NProgress from "nprogress";

export function useNProgress() {
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "loading") {
      NProgress.start();
    } else if (navigation.state === "idle") {
      NProgress.done();
    }
  }, [navigation]);
}
