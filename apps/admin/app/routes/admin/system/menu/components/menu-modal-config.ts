import type { FormProps } from "antd";
import type { ModalProps } from "antd";

import { adminModalFormLayout } from "~/components/pro-form-kit/admin-modal-form-layout";

/** Wider modal so path / path_file / permission fields don’t feel cramped */
export const MENU_MODAL_WIDTH: ModalProps["width"] = 760;

/** 与全局弹窗表单一致（固定 label 宽 + 控件区自适应） */
export const menuModalFormLayout: Pick<FormProps, "layout" | "labelCol" | "wrapperCol"> =
  adminModalFormLayout;

export function menuModalStyles(): NonNullable<ModalProps["styles"]> {
  return {
    body: {
      maxHeight: "min(72vh, 640px)",
      overflowY: "auto",
      padding: "16px 24px 12px",
    },
  };
}

/** Scoped to modal body so inputs / tree-select stretch full width */
export const MENU_MODAL_CLASS_NAMES: NonNullable<ModalProps["classNames"]> = {
  body: "menu-modal-form-body",
};
