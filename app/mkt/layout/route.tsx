import { Nav } from "./components/Nav";
import { useNProgress } from "@/hooks/useNprogress";

export function Route() {
  useNProgress();

  // 由于 Nav 组件现在包含了完整的布局和内容区域，
  // 我们只需要渲染 Nav 组件即可
  return <Nav />;
}
