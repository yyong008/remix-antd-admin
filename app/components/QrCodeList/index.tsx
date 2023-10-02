import React from "react";

import { Button } from "antd";

// tools
import QRCode from "qrcode";
import JSZip from "jszip";
import fileSaver from "file-saver";

const { saveAs } = fileSaver

export default function QrCodeList({ trigger, list = [] }: any) {
  // canvas
  const gnVisiableCanvas = async () => {
    for (const item of list) {
      const canvas = document.createElement("canvas");
      canvas.style.display = "none";
      canvas.classList.add("__qrcode");
      canvas.setAttribute("name", item.name);

      await QRCode.toCanvas(canvas, item.url).catch((err) => {
        console.log("qr err", err);
      });
      document.body.appendChild(canvas);
    }
  };
  
  const destoryQrCodeWithURL = () => {
    const qrs = document.querySelectorAll(".__qrcode");
    qrs.forEach((qr: any) => {
      document.body.removeChild(qr);
    });
  };

  // 将 二维码转化成 图片，然后放在压缩包里面
  const createQrCodeWithURL = async () => {
    const zip = new JSZip();
    const folder = zip.folder("创建文件夹")!;
    await gnVisiableCanvas();

    const qrs = document.querySelectorAll(".__qrcode");

    qrs.forEach((qr: any) => {
      const data = qr.toDataURL().substring(22);
      folder.file(qr.getAttribute("name") + ".png", data, {
        base64: true,
      });
    });

    const content = await folder
      .generateAsync({ type: "blob" }) // zip下载
      .then(function (content) {
        return content;
      });
    saveAs(content, "二维码.zip"); // zip下载后的名字
    destoryQrCodeWithURL();
  };

  const TriggerNew = () => {
    if (!trigger) {
      return (
        <Button type="primary" onClick={() => createQrCodeWithURL()}>
          批量生成二维码
        </Button>
      );
    }

    return React.cloneElement(
      trigger,
      {
        onClick: () => {
          createQrCodeWithURL();
        },
      },
      trigger.props.children
    );
  };

  return <TriggerNew />;
}
