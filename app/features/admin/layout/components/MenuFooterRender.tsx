export const MenuFooterRender = (props: any) => {
  if (props?.collapsed) return undefined;
  return (
    <div
      style={{
        textAlign: "center",
        paddingBlockStart: 12,
      }}
    >
      <div>© 2023 Made with love</div>
      <div>by Yong</div>
    </div>
  );
};
