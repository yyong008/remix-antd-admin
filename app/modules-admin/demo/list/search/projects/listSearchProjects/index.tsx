import { UserOutlined } from "@ant-design/icons";

import { Avatar, Card, Col, Tooltip } from "antd";

export default function ProjectsList({ cardList }: any) {
  return (
    <>
      {cardList.map((_: any, idx: number) => (
        <Col
          {...{
            sm: 24,
            md: 24,
            lg: 12,
            xl: 6,
          }}
          key={idx}
        >
          <Card hoverable cover={<img alt="example" src="/images/app.png" />}>
            <Card.Meta
              title="Europe Street beat"
              description="www.instagram.com"
            />
            <div>
              <div>2 小时前</div>
              <div>
                <Avatar.Group>
                  <Tooltip title="Ant User" placement="top">
                    <Avatar
                      style={{ backgroundColor: "#6899d0" }}
                      icon={<UserOutlined />}
                    />
                  </Tooltip>
                  <Tooltip title="Ant User" placement="top">
                    <Avatar
                      style={{ backgroundColor: "#865e26" }}
                      icon={<UserOutlined />}
                    />
                  </Tooltip>
                  <Tooltip title="Ant User" placement="top">
                    <Avatar
                      style={{ backgroundColor: "#87d068" }}
                      icon={<UserOutlined />}
                    />
                  </Tooltip>
                </Avatar.Group>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </>
  );
}
