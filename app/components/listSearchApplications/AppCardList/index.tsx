import {
  SettingOutlined,
  EditOutlined,
  ShareAltOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Col, Card, Avatar } from "antd";

export default function AppCardList({ cardList }: any) {
  return (
    <>
      {cardList.map((_: any, i: number) => {
        return (
          <Col
            span={6}
            key={i}
            {...{
              sm: 24,
              md: 24,
              lg: 12,
              xl: 6,
            }}
          >
            <Card
              cover={false}
              hoverable
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <ShareAltOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Card.Meta
                avatar={
                  <Avatar
                    size="large"
                    src="/images/react.png"
                  />
                }
                title="Card title"
                description="在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。"
              />
            </Card>
          </Col>
        );
      })}
    </>
  );
}
