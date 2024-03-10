// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// react
import { useEffect, useRef } from "react";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// component
import { List, Space } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import QrCodeList from "~/components/QrCodeList";
import QRCode from "qrcode";

// libs
import { lastValueFrom } from "rxjs";

// db
import { getQrCodeList$ } from "~/db/lib/qrcode";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "lib-qrcode" }];
};

// remix:loader
export const loader: LoaderFunction = async () => {
  const data = await lastValueFrom(getQrCodeList$());
  return json({ list: data });
};

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
  const { list } = useLoaderData<typeof loader>();

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
              renderItem={(item: any) => {
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
