import { Progress } from "antd";

const ListContent = ({ t }: any) => {
  if (t.label === "进度") {
    return (
      <div>
        <Progress percent={t.value} size="small" />
      </div>
    );
  }
  return (
    <div key={t.label}>
      <div style={{ color: "#00000073" }}>{t.label}</div>
      <div style={{ color: "#000000D9" }}>
        {t.status === "success" && <div />}
        {t.value}
      </div>
    </div>
  );
};

export default ListContent;
