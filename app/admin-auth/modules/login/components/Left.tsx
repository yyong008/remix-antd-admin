import { Link } from "react-router";

export function Left() {
  return (
    <div
      className="flex  items-center w-1/2 p-[40px] text-white "
      style={{
        backgroundSize: "cover",
        backgroundImage:
          "url(https://cdn.pixabay.com/photo/2023/11/02/15/58/flower-8360946_1280.jpg)",
      }}
    >
      <div className="flex flex-col justify-between h-[100%] ">
        <Link to="/">
          <div className="flex gap-4">
            <LogoImg />
            <div className="text-center">
              <h1 className="text-xl">Remix Antd Admin</h1>
            </div>
          </div>
        </Link>

        <div className="flex flex-col items-center mb-[20px]">
          Remix Antd Admin is a fullstack website building solution based on
          fullstack React Router、Antd、Prisma.
        </div>
      </div>
    </div>
  );
}

function LogoImg() {
  return (
    <img
      className="w-[30px]"
      alt="logo"
      src="/logo-light.png"
      style={{ borderRadius: "10px" }}
    />
  );
}
