import { Image } from "antd";

export function UserAvatar(props: { avatar: string }) {
  const { avatar } = props;

  return (
    <div className="rounded-[20px] overflow-hidden">
      {avatar ? <Image src={avatar ? avatar : "/images/user.jpg"} /> : "-"}
    </div>
  );
}
