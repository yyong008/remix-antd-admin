import { Row, Col, Typography } from "antd";
import styles from "./LogoCloud.module.css";

const { Paragraph } = Typography;

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
    <section className={styles.section}>
      <div className={styles.container}>
        <Paragraph className={styles.label}>强大的技术栈支撑</Paragraph>
        <Row gutter={[32, 20]} justify="center" align="middle" style={{ flexWrap: "wrap" }}>
          {logos.map((logo) => (
            <Col key={logo.name} style={{ textAlign: "center" }}>
              <div className={styles.logoItem}>
                <img src={logo.src} alt={logo.name} className={styles.logo} />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
