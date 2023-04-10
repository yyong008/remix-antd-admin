// core
import { Link } from "@remix-run/react";

// components:vendor
import { Card } from "antd";

// components
import {
  IPJAvatarTitle,
  IPJAvatarWrap,
  IPJContent,
  IPJContentNameTime,
  IPJItem,
  IPJAuthor,
  IPJTime,
} from "../styled";

export default function WProject({ p }: any) {
  return (
    <IPJItem>
      <IPJAvatarTitle>
        <IPJAvatarWrap>
          <img src={p.avatar} alt="" />
        </IPJAvatarWrap>
        <IPJAvatarTitle>{p.title}</IPJAvatarTitle>
      </IPJAvatarTitle>
      <IPJContent>{p.content}</IPJContent>
      <IPJContentNameTime>
        <IPJAuthor>{p.author}</IPJAuthor>
        <IPJTime>{p.time}</IPJTime>
      </IPJContentNameTime>
    </IPJItem>
  );
}

export function WPT({ data }: any) {
  return (
    <Card
      title="进行中的项目"
      extra={<Link to={"/dashboard/analysis"}>全部项目</Link>}
    >
      {data.wProjects.map((p: any, index: number) => (
        <Card.Grid key={index}>
          {data.wProjects.map((p: any, index: number) => (
            <Card.Grid key={index}>
              <WProject p={p} />
            </Card.Grid>
          ))}
        </Card.Grid>
      ))}
    </Card>
  );
}
