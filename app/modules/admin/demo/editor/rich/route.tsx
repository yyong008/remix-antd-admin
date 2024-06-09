import { PageContainer, ProCard } from "@ant-design/pro-components";

import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";

const tinyKey = "your key";

export function Route() {
  const [value, setValue] = useState("");
  return (
    <PageContainer>
      <ProCard className="h-[70vh]">
        <Editor
          apiKey={tinyKey}
          initialValue={value}
          id="Editor-Component_Container_TinyEditor"
          // inline={true}
          scriptLoading={{ async: true }} // 异步加载
          onChange={(value: any) => {
            setValue(value);
          }}
          init={{
            min_height: 500,
            language: "zh_CN",
            menubar: false, // 顶部菜单栏
            resize: false, // 右下角调整大小
            statusbar: false, // 底部状态栏
            object_resizing: false, // 禁止设置媒体大小
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            default_link_target: "_blank",
            plugins: "image autolink link lists", // 部分功能需要先用插件声明
            toolbar: [
              "formatselect | fontsizeselect | bold italic strikethrough forecolor backcolor |",
              "undo redo | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat | image | link |",
            ],
          }}
        />
      </ProCard>
    </PageContainer>
  );
}
