import { TypeAnimation } from "react-type-animation";
import { PRODUCT_NAME } from "~/config/product";

export function Hero() {
  return (
    <div style={{ textAlign: "center", color: "#f59e0b" }}>
      <div className="">
        <h1 style={{ marginBottom: 20, fontSize: 90 }}>
          <TypeAnimation
            sequence={["React Router", 1000, "React Router Antd ", 1000, PRODUCT_NAME, 1000]}
            wrapper="span"
            speed={50}
            style={{ fontSize: "2em", display: "inline-block" }}
            repeat={Infinity}
          />
        </h1>
        <p
          style={{
            fontSize: 30,
            marginBottom: 20,
            background: "linear-gradient(to right, #ec4899, #ef4444, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {PRODUCT_NAME} is a universal solution for the entire web site, can help you quickly start
          a React Router full-stack AI project.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
          <button
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              backgroundColor: "#f59e0b",
              color: "white",
            }}
          >
            <a href="https://github.com/yyong008/remix-antd-admin" target="_blank" rel="noreferrer">
              Github
            </a>
          </button>
          <button
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              backgroundColor: "#f59e0b",
              color: "white",
            }}
          >
            <a href="https://remix-antd-admin-docs.vercel.app/" target="_blank" rel="noreferrer">
              Read Docs
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}
