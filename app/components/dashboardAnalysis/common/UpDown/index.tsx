// components: vendor
import * as _icons from '@ant-design/icons';

const { CaretUpOutlined, CaretDownOutlined } = _icons

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
