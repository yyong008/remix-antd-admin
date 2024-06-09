// components: vendor
import * as ic from "@ant-design/icons";

const { CaretUpOutlined, CaretDownOutlined } = ic;

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
