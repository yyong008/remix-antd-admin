import { AISDKIconSVG } from "./icons/AISDKIconSVG";
import { AntdIconSVG } from "./icons/AntdIconSVG";
import { DrizzleIconSVG } from "./icons/DrizzleIconSVG";
import { HonoIconSVG } from "./icons/HonoIconSVG";
import { ProComponentSVG } from "./icons/ProComponentSVG";
import { ReactIconSVG } from "./icons/ReactIconSVG";
import { ReactrouterSVGIcon } from "./icons/ReactrouterSVG";

export function BuildWith() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
          marginTop: 10,
        }}
      >
        <div style={{ fontSize: 20, marginTop: 16, color: "#94a3b8" }}>Build on: </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16 }}>
          <ReactrouterSVGIcon />
          <HonoIconSVG />
          <ReactIconSVG />
          <AntdIconSVG />
          <ProComponentSVG />
          <DrizzleIconSVG />
          <AISDKIconSVG />
        </div>
      </div>
    </div>
  );
}
