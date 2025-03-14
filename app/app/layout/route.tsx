import { Nav } from "./components/Nav";
import { Outlet } from "react-router";
import { useNProgress } from "@/hooks/useNprogress";
import '@ant-design/v5-patch-for-react-19';

export function Route() {
  useNProgress();
  const gridStyle = {
    backgroundImage: `linear-gradient(90deg, rgba(169, 169, 169, .4) 3%, transparent 0),
                      linear-gradient(1turn, rgba(169, 169, 169, .4) 3%, transparent 0)`,
    backgroundSize: "20px 20px",
    backgroundPosition: "100% 100%",
  };
  return (
    <div
      className="flex justify-center relative min-h-[100vh]"
      style={gridStyle}
    >
      <Nav />
      <Outlet />
    </div>
  );
}
