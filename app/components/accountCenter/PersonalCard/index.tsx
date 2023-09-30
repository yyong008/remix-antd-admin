// core

// components:vendor
import * as _icons from '@ant-design/icons'

import { Card, Divider, Row, Col } from "antd";

// components
import Tags from "./Tags";

const { ClusterOutlined, ContactsOutlined, HomeOutlined } = _icons;

export default function PersonalCard({ team, tags, userInfo }: any) {
  return (
    <Card>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{
          width: '104px',
          height: '104px',
          borderRadius: '50%',
        }}>
          <img src="/remix.png" alt="" style={{
            width: '100%',
            height: '100%',
          }} />
        </div>
        <div style={{
          marginBottom: '4px',
          color: 'rgba(0, 0, 0, 0.85)',
          fontWeight: 500,
          fontSize: '20px',
          lineHeight: '28px',
        }}>{userInfo.name}</div>
        <div style={{
          boxSizing: 'border-box',
          marginBottom: '24px',
          textAlign: 'center',
        }}>{userInfo.desc}</div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'flex-start',
            margin: '0 0 10px 0',
          }}>
            <ContactsOutlined />
            <div style={{
              marginLeft: '10px',
            }}>{userInfo.contacts}</div>
          </div>
          <div>
            <ClusterOutlined />
            <div>{userInfo.jobs}</div>
          </div>
          <div>
            <HomeOutlined />
            <div>{userInfo.address}</div>
          </div>
        </div>
      </div>
      <Divider dashed={true} />
      <div className="tag">
        {/* // @ts-ignore */}
        <Tags ts={tags as any} />
      </div>
      <Divider dashed={true} />
      <div>
        <h3
          style={{
            marginBottom: 10,
          }}
        >
          团队
        </h3>
        <div>
          <Row gutter={[10, 10]}>
            {team.map((itm: any, i: number) => {
              return (
                <Col
                  key={i}
                  span={12}
                  style={{
                    display: "inline-flex",
                  }}
                >
                  <div
                    style={{
                      height: "24px",
                      width: "24px",
                    }}
                  >
                    <img
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "50%",
                        marginRight: 10,
                      }}
                      src={itm.url}
                      alt=""
                    />
                  </div>
                  <div>{itm.name}</div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </Card >
  );
}
