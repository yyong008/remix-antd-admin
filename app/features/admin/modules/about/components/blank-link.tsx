import { Tag } from "antd";

export const BlankLink = ({ url = "", text = "" }) => {
  const target = /^http(s)?:/.test(url)
    ? url
    : `https://www.npmjs.com/package/${url}`;
  return (
    <a href={target} target="_blank" rel="noreferrer">
      <Tag color="cyan">{text}</Tag>
    </a>
  );
};
