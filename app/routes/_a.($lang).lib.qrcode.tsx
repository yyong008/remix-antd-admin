import { useEffect, useRef } from "react";

import { List, Space } from "antd";
import QrCodeList from "~/components/QrCodeList";

// qrcode
import QRCode from "qrcode";
import { PageContainer, ProCard } from "@ant-design/pro-components";

const ReactQrCode = ({ url }: any) => {
  const cRef = useRef<any>();

  const drawQrCode = async () => {
    let canvas = document.createElement("canvas");

    await QRCode.toCanvas(canvas, url, { width: 132 }).catch((err) => {
      console.log("qr err", err);
    });
    cRef.current.appendChild(canvas);
  };

  useEffect(() => {
    drawQrCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={cRef}></div>;
};

export default function QrCodeRoute() {
  const list = [
    { name: "qrcode", url: "https://www.npmjs.com/package/qrcode" },
    {
      name: "remix-antd-admin",
      url: "https://github.com/yyong008/remix-antd-admin",
    },
  ];

  return (
    <PageContainer title="qrcode">
      <ProCard>
        <div className="qr-mount">
          <Space
            direction="vertical"
            style={{
              width: "100%",
            }}
          >
            <QrCodeList list={list} />
            <List
              bordered
              dataSource={list}
              renderItem={(item) => {
                return (
                  <List.Item>
                    <List.Item.Meta title={item.name} description={item.url} />
                    <ReactQrCode url={item.url} />
                  </List.Item>
                );
              }}
            />
          </Space>
        </div>
      </ProCard>
    </PageContainer>
  );
}
