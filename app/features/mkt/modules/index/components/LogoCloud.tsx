import { Row, Col, Typography } from "antd";

const { Title, Paragraph } = Typography;

const logos = [
  { name: "React Router", src: "/images/react-router.svg" },
  { name: "React", src: "/images/react.svg" },
  { name: "TypeScript", src: "/images/typescript.svg" },
  { name: "Vite", src: "/images/vite.svg" },
  { name: "Hono", src: "/images/hono.svg" },
  { name: "Ant Design", src: "/images/ant-design.svg" },
  { name: "Drizzle ORM", src: "/images/drizzle.svg" },
  { name: "Cloudflare", src: "/images/cloudflare.svg" },
  { name: "pnpm", src: "/images/pnpm.svg" },
];

export function LogoCloud() {
  return (
    <section
      style={{
        padding: "40px 24px",
        background: "var(--mkt-bg)",
        borderTop: "1px solid var(--mkt-border)",
        borderBottom: "1px solid var(--mkt-border)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Paragraph
          type="secondary"
          style={{
            textAlign: "center",
            marginBottom: "28px",
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: 500,
          }}
        >
          强大的技术栈支撑
        </Paragraph>
        <Row gutter={[32, 20]} justify="center" align="middle" style={{ flexWrap: "wrap" }}>
          {logos.map((logo) => (
            <Col key={logo.name} style={{ textAlign: "center" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "44px",
                  padding: "0 20px",
                  opacity: 0.65,
                  transition: "all 0.25s ease",
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  style={{
                    height: "100%",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
