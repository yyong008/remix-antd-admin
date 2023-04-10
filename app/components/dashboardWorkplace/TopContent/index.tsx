// components:vendor
import { ProCard } from "@ant-design/pro-components";

// components
import {
  Jobs,
  Num,
  Project,
  ProjectNums,
  TeamRank,
  VisitItem,
  Welcome,
  WorkplaceContent,
  WorkplaceContentLeft,
  WorkplaceContentLeftImgWrap,
  WorkplaceContentRight,
  WorkplaceTitle,
} from "../styled";

export default function ContainerContent({ data }: any) {
  return (
    <ProCard>
      <WorkplaceTitle>工作台</WorkplaceTitle>
      <WorkplaceContent>
        <WorkplaceContentLeft>
          <WorkplaceContentLeftImgWrap>
            <img src={data.userInfo.avatar} alt="" />
          </WorkplaceContentLeftImgWrap>
          <div>
            <Welcome>早安，{data.userInfo.name}，祝你开心每一天！</Welcome>
            <Jobs>{data.userInfo.jobs}</Jobs>
          </div>
        </WorkplaceContentLeft>
        <WorkplaceContentRight>
          <ProjectNums>
            <Project>项目数</Project>
            <Num>{data.userInfo.pCount}</Num>
          </ProjectNums>
          <TeamRank>
            <Project>团队内排名</Project>
            <Num>{data.userInfo.rank}</Num>
          </TeamRank>
          <VisitItem>
            <Project>项目访问</Project>
            <Num>{data.userInfo.vCount}</Num>
          </VisitItem>
        </WorkplaceContentRight>
      </WorkplaceContent>
    </ProCard>
  );
}
