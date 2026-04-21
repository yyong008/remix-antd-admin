import { PRODUCT_NAME } from "./product";

export * from "./debug";
export * from "./antd-grid";
export * from "./lang";
export * from "./product";
export * from "./project";
export * from "./common/mail";
export * from "./client/mail";
export * from "./common/storage";
export * from "./client/storage";

export const prolayoutConfig = {
  title: PRODUCT_NAME,
  logo: "/logo.png",
  layout: "mix",
  menu: {
    defaultOpenAll: false,
    loading: false,
  },
  avatar: {
    src: "/images/user.jpg",
    size: "small",
    title: "Yong-",
  },
};
