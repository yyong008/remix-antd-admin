import { Row, Col, Typography, Button } from "antd";
import { PlayCircleOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import styles from "./VideoDemo.module.css";

const { Title, Paragraph } = Typography;

export function VideoDemo() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title level={2} className={styles.title}>
            看看它是如何工作的
          </Title>
          <Paragraph className={styles.desc}>
            快速了解如何使用 React Router Antd Admin 构建现代化的全栈应用
          </Paragraph>
        </div>

        {/* 视频预览区 */}
        <div className={styles.videoWrapper}>
          {/* 视频封面 / 缩略图 */}
          <div className={styles.videoCover}>
            {/* 背景装饰 */}
            <div className={styles.videoBg} />

            {/* UI 元素装饰 */}
            <div className={styles.browserDots}>
              <div className={`${styles.dot} ${styles.dot1}`} />
              <div className={`${styles.dot} ${styles.dot2}`} />
              <div className={`${styles.dot} ${styles.dot3}`} />
            </div>

            {/* 代码预览装饰 */}
            <div className={styles.codePreview}>
              <div className={styles.codeDots}>
                <div
                  className={`${styles.dot} ${styles.dot1}`}
                  style={{ width: "8px", height: "8px" }}
                />
                <div
                  className={`${styles.dot} ${styles.dot2}`}
                  style={{ width: "8px", height: "8px" }}
                />
                <div
                  className={`${styles.dot} ${styles.dot3}`}
                  style={{ width: "8px", height: "8px" }}
                />
              </div>
              <div className={styles.codeLine}>
                <span className={styles.keyword}>const</span> app ={" "}
                <span className={styles.function}>createApp</span>();
              </div>
              <div className={styles.codeLine} style={{ marginLeft: "16px" }}>
                app.<span className={styles.method}>use</span>(auth());
              </div>
              <div className={styles.codeLine} style={{ marginLeft: "16px" }}>
                app.<span className={styles.method}>use</span>(ai());
              </div>
              <div className={styles.codeLine} style={{ marginLeft: "16px" }}>
                app.<span className={styles.method}>listen</span>(3000);
              </div>
            </div>

            {/* 播放按钮 */}
            <div className={styles.bottomBar}>
              <div className={styles.videoInfo}>
                <CustomerServiceOutlined style={{ fontSize: "18px" }} />
                3:42 分钟演示
              </div>

              <Button
                type="primary"
                shape="circle"
                size="large"
                icon={<PlayCircleOutlined style={{ fontSize: "28px" }} />}
                className={styles.playButton}
              />
            </div>
          </div>
        </div>

        {/* 快捷链接 */}
        <Row gutter={[16, 16]} justify="center" className={styles.links}>
          <Col>
            <Button type="link" href="https://github.com/yyong008/remix-antd-admin" target="_blank">
              观看更多演示 →
            </Button>
          </Col>
          <Col>
            <Button type="link" href="https://remix-antd-admin-docs.vercel.app/" target="_blank">
              阅读完整教程 →
            </Button>
          </Col>
        </Row>
      </div>
    </section>
  );
}
