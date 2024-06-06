import "~/styles/stack/laxjs.cursor.css";

import { PageContainer, ProCard } from "@ant-design/pro-components";

import lax from "lax.js";
import { useEffect } from "react";

export function Component() {
  useEffect(() => {
    //
    lax.init();
    // Setup mouse move listener
    document.addEventListener(
      "mousemove",
      function (e) {
        lax.__cursorX = e.clientX;
        lax.__cursorY = e.clientY;
      },
      false,
    );

    // Add lax driver for cursorX
    lax.addDriver("cursorX", function () {
      return lax.__cursorX || 0;
    });

    // Add lax driver for cursorY
    lax.addDriver("cursorY", function () {
      return lax.__cursorY || 0;
    });

    // Add lax driver for cursorXY
    lax.addDriver("cursorDistanceFromCenter", function () {
      var pageHeight = document.body.scrollHeight;
      var pageWidth = document.body.scrollWidth;

      var pageCenterX = pageWidth / 2;
      var pageCenterY = pageHeight / 2;

      var absDistanceFromCenterY =
        Math.abs((lax.__cursorY || 0) - pageCenterY) / pageCenterY;
      var absDistanceFromCenterX =
        Math.abs((lax.__cursorX || 0) - pageCenterX) / pageCenterX;

      return absDistanceFromCenterX + absDistanceFromCenterY;
    });

    lax.addElements(".text", {
      cursorX: {
        translateX: [
          [0, "screenWidth"],
          ["index * 10", "index * -10"],
        ],
      },
      cursorY: {
        translateY: [
          [0, "screenHeight"],
          ["index * 10", "index * -10"],
        ],
      },
      cursorDistanceFromCenter: {
        scale: [
          [0, 1],
          [1, "1 + (index * 0.05 )"],
        ],
      },
    });

    lax.addElements(".container", {
      cursorX: {
        filter: [
          [0, "screenWidth"],
          [0, "screenWidth/2"],
          {
            cssFn: (val: any) => {
              return `hue-rotate(${val % 360}deg)`;
            },
          },
        ],
      },
    });
  }, []);
  return (
    <PageContainer>
      <ProCard className="">
        <div className="container">
          <h1 className="text a">Lax.js</h1>
          <h1 className="text b">Lax.js</h1>
          <h1 className="text c">Lax.js</h1>
          <h1 className="text d">Lax.js</h1>
          <h1 className="text a">Lax.js</h1>
          <h1 className="text b">Lax.js</h1>
          <h1 className="text c">Lax.js</h1>
          <h1 className="text d">Lax.js</h1>
          <h1 className="text a">Lax.js</h1>
          <h1 className="text b">Lax.js</h1>
          <h1 className="text c">Lax.js</h1>
          <h1 className="text d">Lax.js</h1>
          <h1 className="text a">Lax.js</h1>
          <h1 className="text b">Lax.js</h1>
          <h1 className="text c">Lax.js</h1>
          <h1 className="text d">Lax.js</h1>
          <h1 className="text a">Lax.js</h1>
          <h1 className="text b">Lax.js</h1>
          <h1 className="text c">Lax.js</h1>
          <h1 className="text d">Lax.js</h1>
        </div>
      </ProCard>
    </PageContainer>
  );
}
