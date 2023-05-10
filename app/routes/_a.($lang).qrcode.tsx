import { List, Space } from "antd";
import QrCodeList from "~/components/QrCodeList";

export default function QrCodeRoute() {
  const list = [
    { name: "qrcode", url: "https://www.npmjs.com/package/qrcode" },
    { name: "article", url: "https://juejin.cn/article" },
    {
      name: "remix-antd-admin",
      url: "https://github.com/yyong008/remix-antd-admin",
    },
  ];

  return (
    <div className="qr-mount">
      <>
        <Space direction="vertical">
          <QrCodeList list={list} />
          <List
            bordered
            dataSource={list}
            renderItem={(item) => {
              return <List.Item>{item.url}</List.Item>;
            }}
          />
        </Space>
      </>
    </div>
  );
}
