import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export function UserAvatar(props: { avatar: string; name: string }) {
  const { avatar, name } = props;

  return (
    <div className="rounded-[20px] overflow-hidden">
      <Avatar src={avatar} size={20} icon={<UserOutlined />}>
        {name ? name : "-"}
      </Avatar>
    </div>
  );
}
