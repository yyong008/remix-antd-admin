import { Progress } from "antd";
import { DSpan, PDiv } from "../styled";

const ListContent = ({ t }: any) => {
  if (t.label === "进度") {
    return (
      <PDiv>
        <Progress percent={t.value} size="small" />
      </PDiv>
    );
  }
  return (
    <div key={t.label}>
      <div style={{ color: "#00000073" }}>{t.label}</div>
      <div style={{ color: "#000000D9" }}>
        {t.status === "success" && <DSpan />}
        {t.value}
      </div>
    </div>
  );
};

export default ListContent;
