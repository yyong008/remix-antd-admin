import { Input } from "antd";
import { ProCard } from "@ant-design/pro-components";

type ListHeaderSearchProps = {
  title: string;
};

export function ListHeaderSearch({ title }: ListHeaderSearchProps) {
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
          onChange={() => {}}
          onSearch={() => {}}
        />
      </div>
    </ProCard>
  );
}
