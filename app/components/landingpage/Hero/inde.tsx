import { TypeAnimation } from "react-type-animation";

export function Hero() {
  return (
    <div className="text-center text-neutral-content text-yellow-500">
      <div className="">
        <h1 className="mb-5 text-5xl text-[90px]">
          <TypeAnimation
            sequence={[
              "Remix",
              1000,
              "Remix Antd ",
              1000,
              "Remix Antd Admin",
              1000,
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: "2em", display: "inline-block" }}
            repeat={Infinity}
          />
        </h1>
        <p className="text-[30px] mb-5  bg-gradient-to-r from-pink-500 via-red-500 to-blue-500 bg-clip-text ">
          Remix Antd Admin is a universal solution for the entire web site, can
          help you quickly start a Remix full-stack AI project.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-[10px] py-[6px] rounded-md bg-yellow-500 text-white">
            <a
              href="https://github.com/yyong008/remix-antd-admin"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </button>
          <button className="px-[10px] py-[6px] rounded-md bg-yellow-500 text-white">
            <a
              href="https://remix-antd-admin-docs.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              Read Docs
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}
