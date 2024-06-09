import "./index.css";

import { gnDateFn } from "../utils";
// 第一个天是星期几？
import { week } from "../utils/week";

// 第一行
// 前面预留位置 prviewDay
const tdStyle: any = (d: number | string) => {
  const { day } = gnDateFn();
  let active = false;
  if (day === d) {
    active = true;
  }

  const style = {
    border: "1px solid #eee",
    width: "60px",
    height: "60px",
    textAlign: "center",
    fontSize: "20px",
    color: !active ? "#111" : "#f56",
  };

  if (active) {
    style["fontSize"] = "26px";
    style.border = "1px solid #f23";
  }

  return style;
};

export function CalRow() {
  return (
    <table>
      <tbody className="table-tbody">
        {week.map((w, i) => {
          return (
            <tr key={i}>
              {w.map((l, idx) => {
                return (
                  <td style={tdStyle(l)} key={idx}>
                    {l ? l : ""}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
