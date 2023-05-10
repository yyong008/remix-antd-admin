import { Button, List, Space, Spin } from "antd";
import QRCode from "qrcode";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useState } from "react";

//分阶段
// 绘制 canvas
//
export default function QrCodeRoute() {
  const [spinning, setSpinning] = useState(false)
  const list = [
    { name: "qrcode", url: "https://www.npmjs.com/package/qrcode" },
    { name: "article", url: "https://juejin.cn/article" },
    { name: "remix-antd-admin", url: "https://github.com/yyong008/remix-antd-admin" },
  ];
  // url 转化为 cavans，画出 二维码
  const gnVisiableCanvas = async () => {

    for (const item of list) {
      const canvas = document.createElement("canvas");
      canvas.style.display = "none";
      canvas.classList.add("__qrcode");
      canvas.setAttribute("name", item.name);

      // 
      await QRCode.toCanvas(canvas, item.url).catch((err) => { console.log("qr err", err)});
      document.body.appendChild(canvas);
    }
  };
  // 将 二维码转化成 图片，然后放在压缩包里面
  const createQrCodeWithURL = async () => {
    const zip = new JSZip();
    const folder = zip.folder("创建文件夹")!;
    await gnVisiableCanvas();

    const qrs = document.querySelectorAll(".__qrcode")

    qrs.forEach((qr: any) => {
      const data = qr.toDataURL().substring(22);
      folder.file(qr.getAttribute('name') + ".png", data, {
        base64: true,
      });
    });

    const content = await folder
      .generateAsync({ type: "blob" }) // zip下载
      .then(function (content) {
        return content;
      });
    saveAs(content, "二维码.zip"); // zip下载后的名字
    setSpinning(false)
    destoryQrCodeWithURL()
  };
  const destoryQrCodeWithURL = () => {
    const qrs = document.querySelectorAll(".__qrcode")
    qrs.forEach((qr: any) => {
      document.body.removeChild(qr)
    })
  }

  const gn = () => {
    setSpinning(true)
    createQrCodeWithURL();
  };
  return (
    <div className="qr-mount">
      <Spin spinning={spinning}>
        <Space direction="vertical">
        <Button type="primary" onClick={gn}>
          批量生成二维码
        </Button>
        <List
          bordered
          dataSource={list}
          renderItem={(item) => {
            return <List.Item>{item.url}</List.Item>;
          }}
        ></List>
      </Space>
      </Spin>
    </div>
  );
}
