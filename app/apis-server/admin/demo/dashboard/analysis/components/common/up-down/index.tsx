import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

export const UpDown = ({ item }: any) => {
  return (
    <>
      {item.status === "up" ? (
        <CaretUpOutlined style={{ color: "green" }} />
      ) : item.status === "down" ? (
        <CaretDownOutlined style={{ color: "red" }} />
      ) : null}
    </>
  );
};
