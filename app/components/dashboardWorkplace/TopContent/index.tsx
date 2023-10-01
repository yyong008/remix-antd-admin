// components:vendor
import { ProCard } from "@ant-design/pro-components";

export default function ContainerContent({ data }: any) {
  return (
    <ProCard>
      <div className="WorkplaceTitle">工作台</div>
      <div className="WorkplaceContent">
        <div className="WorkplaceContentLeft">
          <div className="WorkplaceContentLeftImgWrap">
            <img src={data.userInfo.avatar} alt="" />
          </div>
          <div>
            <div className="Welcome">早安，{data.userInfo.name}，祝你开心每一天！</div>
            <div className="Jobs">{data.userInfo.jobs}</div>
          </div>
        </div>
        <div className="WorkplaceContentRight">
          <div className="ProjectNums">
            <div className="Project">项目数</div>
            <div className="Num">{data.userInfo.pCount}</div>
          </div>
          <div className="TeamRank">
            <div className="Project">团队内排名</div>
            <div className="Num">{data.userInfo.rank}</div>
          </div>
          <div className="VisitItem">
            <div className="Project">项目访问</div>
            <div className="Num">{data.userInfo.vCount}</div>
          </div>
        </div>
      </div>
    </ProCard>
  );
}
