import { href, NavLink, useParams } from "react-router";
import { defaultLang } from "~/config/lang";
import { Typography } from "antd";

const { Text } = Typography;

export function BlogItem(props: any) {
  const { data } = props;
  const { locale: localeParam } = useParams();
  const locale = localeParam ?? defaultLang;
  return (
    <div>
      <NavLink
        style={({ isActive }) => ({
          color: isActive ? "#ca8a04" : undefined,
        })}
        to={href(`/:locale?/blog/:id`, { locale, id: props.data.id })}
      >
        <Text
          strong
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 10,
            fontSize: 16,
          }}
        >
          <span
            style={{
              marginRight: 4,
              color: "#ca8a04",
            }}
          >
            ·
          </span>
          {data.title}
        </Text>
      </NavLink>
    </div>
  );
}
