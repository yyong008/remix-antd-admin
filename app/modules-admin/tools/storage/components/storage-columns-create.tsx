import { FormatTime } from "~/components/common";
import { Image } from "antd";

export const storageColumnsCreate = () => {
  return [
    {
      dataIndex: "path",
      title: "预览图",
      ellipsis: true,
      width: 80,
      render(_: string, record: any) {
        if (record.type.startsWith("image")) {
          return <Image style={{ width: "50px" }} src={record.path} />;
        }
        return record.path;
      },
    },
    {
      dataIndex: "name",
      title: "文件名",
      ellipsis: true,
    },
    {
      dataIndex: "extName",
      title: "文件后缀",
      ellipsis: true,
    },
    {
      dataIndex: "type",
      title: "类型",
      ellipsis: true,
    },
    {
      dataIndex: "size",
      title: "尺寸",
      ellipsis: true,
      render(_: string, record: any) {
        return <div>{(Number(record.size) / 1024).toFixed(0)}KB</div>;
      },
    },
    {
      dataIndex: "userId",
      title: "上传者",
      ellipsis: true,
    },
    {
      dataIndex: "createdAt",
      title: "创建时间",
      ellipsis: true,
      renderText(text: string) {
        return <FormatTime timeStr={text} />;
      },
    },
  ];
};
