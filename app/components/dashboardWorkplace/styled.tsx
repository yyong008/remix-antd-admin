import styled from "styled-components";

export const WorkplaceTitle = styled.div`
  margin-right: 12px;
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const WorkplaceContent = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1120px) {
    display: flex;
    flex-direction: column;
  }

  @media screen and (max-width: 992px) {
    display: flex;
    flex-direction: column;
  }
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
  @media screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
  }
`;

export const WorkplaceContentLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const WorkplaceContentLeftImgWrap = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  margin-right: 20px;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
  }
`;

export const Welcome = styled.div`
  margin-bottom: 12px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
`;

export const Jobs = styled.div`
  color: rgba(0, 0, 0, 0.45);
`;

export const WorkplaceContentRight = styled.div`
  display: flex;
`;

export const ProjectNums = styled.div`
  position: relative;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::after {
    position: absolute;
    content: " ";
    top: 8px;
    right: 0;
    width: 1px;
    height: 40px;
    background-color: #f0f0f0;
  }
`;

export const TeamRank = styled.div`
  position: relative;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::after {
    position: absolute;
    content: " ";
    top: 8px;
    right: 0;
    width: 1px;
    height: 40px;
    background-color: #f0f0f0;
  }
`;

export const VisitItem = styled.div`
  position: relative;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Project = styled.div`
  color: rgba(0, 0, 0, 0.45);
`;

export const Num = styled.div`
  font-size: 24px;
`;

//========================== IPJItem ==========================//

export const IPJItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

export const IPJAvatarTitle = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const IPJAvatarWrap = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 10px;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
  }
`;

export const IPJContent = styled.div`
  overflow: hidden;
  color: rgba(0, 0, 0, 0.45);
  line-height: 22px;
`;

export const IPJContentNameTime = styled.div`
  display: flex;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 10px;
`;

export const IPJAuthor = styled.div`
  margin-right: 10px;
`;

export const IPJTime = styled.div`
  color: rgba(0, 0, 0, 0.25);
`;
