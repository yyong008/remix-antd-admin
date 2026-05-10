export const MenuFooterRender = (props: { collapsed?: boolean }) => {
  if (props?.collapsed) return undefined;
  return (
    <div
      style={{
        flexShrink: 0,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingInline: 16,
        paddingBlock: 16,
        textAlign: "center",
      }}
    >
      <p
        style={{
          marginBottom: 2,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.05em",
          color: "rgba(255,255,255,0.4)",
        }}
      >
        © 2023
      </p>
      <p style={{ marginBottom: 0, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
        Made with love · Yong
      </p>
    </div>
  );
};