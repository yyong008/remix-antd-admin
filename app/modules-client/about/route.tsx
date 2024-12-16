import {
  ProjectAbout,
  ProjectDevelopmentDep,
  ProjectInfo,
  ProjectProductionDep,
} from "./components";
import { Segmented, Space } from "antd";

import { ProConfigProvider } from "@ant-design/pro-components";
import { useState } from "react";

export function Route() {
  const [value, setValue] = useState("about");
  return (
    <div className="flex flex-col py-[100px] w-[60vw] min-h-[80vh]">
      <ProConfigProvider>
        <Segmented<string>
          block
          options={["about", "development", "production"]}
          onChange={(value) => {
            setValue(value);
          }}
        />
        <div className="my-[20px]">
          {value === "about" && (
            <Space direction="vertical">
              <ProjectAbout />
              <ProjectInfo />
            </Space>
          )}
          {value === "development" && <ProjectDevelopmentDep />}
          {value === "production" && <ProjectProductionDep />}
        </div>
      </ProConfigProvider>
    </div>
  );
}
