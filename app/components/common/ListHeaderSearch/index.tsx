import { ProCard } from "@ant-design/pro-components";
import { Input } from "antd";

type ListHeaderSearchProps = {
  title: string;
};

export default function ListHeaderSearch({ title }: ListHeaderSearchProps) {
  return (
    <ProCard>
      <h2>{title}</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Input.Search
          style={{
            width: "50%",
          }}
          placeholder="请输入"
          enterButton="搜索"
          value={""}
          onChange={(_e) => {}}
          onSearch={() => {}}
        />
      </div>
    </ProCard>
  );
}
