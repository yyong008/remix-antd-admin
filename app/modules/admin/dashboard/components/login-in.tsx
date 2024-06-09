import * as ic from "@ant-design/icons";

import { Descriptions } from "antd";
import { FormatTime } from "~/components/common";

const { SmileOutlined } = ic;

export function LoginIn({ data, userInfo }: any) {
  return (
    <div>
      <div className="flex items-center text-[20px] pb-[10px]">
        <SmileOutlined className="mr-[10px]" />
        欢迎，<span className="text-lime-500">{userInfo.name}</span>
      </div>
      <Descriptions column={3} size="small">
        <Descriptions.Item label="所属部门">
          {userInfo.department.name}
        </Descriptions.Item>
        <Descriptions.Item label="最近登录时间">
          <FormatTime timeStr={data.latestLoginLog.loginAt} />
        </Descriptions.Item>
        <Descriptions.Item label="最近登录ip">
          {data.latestLoginLog.ip}
        </Descriptions.Item>
        <Descriptions.Item label="最近登录系统">
          {data.latestLoginLog.system}
        </Descriptions.Item>
        <Descriptions.Item label="最近登录设备">
          {data.latestLoginLog.browser}
        </Descriptions.Item>
        <Descriptions.Item label="最近登录地址">
          {data.latestLoginLog.address}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}
