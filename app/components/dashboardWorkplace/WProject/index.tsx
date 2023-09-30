// core
import { Link } from "@remix-run/react";

// components:vendor
import { Card } from "antd";

// components

export default function WProject({ p }: any) {
  return (
    <div className="IPJItem">
      <div className="IPJAvatarTitle">
        <div className="IPJAvatarWrap">
          <img src={p.avatar} alt="" />
        </div>
        <div className="IPJAvatarTitle">{p.title}</div>
      </div>
      <div className="IPJContent">{p.content}</div>
      <div className="IPJContentNameTime">
        <div className="IPJAuthor">{p.author}</div>
        <div className="IPJTime">{p.time}</div>
      </div>
    </div>
  );
}

export function WPT({ data }: any) {
  return (
    <Card
      title="进行中的项目"
      extra={<Link to={"/"}>全部项目</Link>}
    >
      {data.wProjects.map((p: any, index: number) => (
        <Card.Grid key={index} style={{ padding: '10px 20px'}}>
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
