import { Typography } from "antd";

export const ProTableHeaderTitle = ({ title }: { title: string }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography.Text strong style={{ fontSize: 16, color: "var(--ant-color-text-heading)" }}>
        {title}
      </Typography.Text>
      <Typography.Text type="secondary" style={{ fontSize: 12, fontWeight: 400 }}>
        维护角色标识、描述及可访问菜单
      </Typography.Text>
    </div>
  );
};
