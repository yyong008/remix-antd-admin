import { Image } from "antd";

export function UserAvatar(props: { avatar: string }) {
  const { avatar } = props;

  return (
    <div className="w-[20px] h-[20px] rounded-[20px] overflow-hidden">
      {<Image src={avatar ? avatar : "/images/user.jpg"} />}
    </div>
  );
}
