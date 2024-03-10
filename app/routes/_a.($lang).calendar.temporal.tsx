// types
import type { MetaFunction } from "@remix-run/node";

// components
import CalRow from "~/components/temporal/calRow";
import ImageComp from "~/components/temporal/ImageComp";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    {
      title: "calendar-template",
    },
  ];
};

export default function Calendar() {
  return (
    <div className="App">
      <ImageComp />
      <CalRow />
    </div>
  );
}
