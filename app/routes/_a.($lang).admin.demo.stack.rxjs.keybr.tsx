// types
import type { MetaFunction } from "@remix-run/node";

// component
import { PageContainer, ProCard } from "@ant-design/pro-components";

// libs
import classNames from "classnames";

// hooks
import { useKeyPress } from "~/hooks";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    { title: "Stack-RxJS-Keybr" },
    { name: "Stack-RxJS-Keybr", content: "Stack-RxJS-Keybr" },
  ];
};

export default function StackRxJSKeybr() {
  const [key] = useKeyPress();
  const qwertyRows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  return (
    <PageContainer>
      <ProCard>
        <div className="flex flex-col justify-center align-middle h-[70vh] bg-green-400">
          <div className="text-center pb-[50px]">
            RxJS Keybr(Press keybr, RxJS in hooks)
          </div>
          <div className="flex justify-center 90vh">
            <div className="border-slate-400 border-spacing-1 border p-[20px] rounded">
              {qwertyRows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="row flex align-center justify-center"
                >
                  {row.map((rowKey, keyIndex) => (
                    <div
                      key={keyIndex}
                      className={classNames(
                        "flex align-center justify-center w-[80px] h-[80px] bg-slate-300 m-[4px] rounded-sm",
                        {
                          "bg-yellow-500": rowKey === key,
                        },
                      )}
                    >
                      {rowKey.toUpperCase()}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ProCard>
    </PageContainer>
  );
}
