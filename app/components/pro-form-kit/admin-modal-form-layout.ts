import type { FormProps } from "antd";

/**
 * 后台弹窗 / 抽屉内表单统一布局：固定 label 宽度、控件区自适应，中文标签右对齐。
 * 避免使用 `span: 3` 栅格导致不同行 label 宽度不一致。
 */
export const adminModalFormLayout: Pick<
  FormProps,
  "layout" | "labelCol" | "wrapperCol" | "colon" | "labelAlign" | "labelWrap"
> = {
  layout: "horizontal",
  labelCol: { flex: "0 0 120px" },
  wrapperCol: { flex: "1 1 auto", minWidth: 0 },
  colon: false,
  labelAlign: "right",
  labelWrap: true,
};
