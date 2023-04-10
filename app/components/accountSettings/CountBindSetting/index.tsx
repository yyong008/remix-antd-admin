/* eslint-disable jsx-a11y/anchor-is-valid */

// components
import { List, theme } from "antd";
import { ProCard } from "@ant-design/pro-components";
import {
  AlipayOutlined,
  DingdingOutlined,
  QqOutlined,
  TaobaoOutlined,
  WechatOutlined,
} from "@ant-design/icons";

const CountBindSetting = ({ dataSource }: any) => {
  const { token } = theme.useToken();
  const IconMap: any = {
    qq: <QqOutlined style={{ color: token.colorPrimary }} />,
    weichat: <WechatOutlined style={{ color: token.colorPrimary }} />,
    taobao: <TaobaoOutlined style={{ color: token.colorPrimary }} />,
    zhifubao: <AlipayOutlined style={{ color: token.colorPrimary }} />,
    dingding: <DingdingOutlined style={{ color: token.colorPrimary }} />,
  };
  return (
    <ProCard title="账号绑定" style={{ minHeight: "750px" }}>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={(item: any) => (
          <List.Item
            actions={[
              <a
                href="#"
                key="list-loadmore-edit"
                style={{ color: token.colorPrimary }}
              >
                修改
              </a>,
            ]}
          >
            <List.Item.Meta
              style={{ display: "flex", alignItems: "center" }}
              avatar={<div>{IconMap[item.picture.large]}</div>}
              title={<a href="#">{item.name?.last}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </ProCard>
  );
};

export default CountBindSetting;
