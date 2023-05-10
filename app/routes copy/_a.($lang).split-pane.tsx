import type { LinksFunction } from "@remix-run/node";

import { Allotment } from "allotment";
import { cssBundleHref } from "@remix-run/css-bundle";

import "allotment/dist/style.css";
import { Button } from "antd";
import React from "react";

// utils
import { nanoid } from 'nanoid';

export const links: LinksFunction = () => {
  return [
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  ];
};

const ComponentA = () => {
  return <div>This is ComponentA</div>;
};

const ComponentB = () => {
  return <div>This is ComponentB</div>;
};

const App = () => {
  type Panel = {
    label: string;
    id: string;
  };

  const [panels, setPanels] = React.useState<Panel[]>([]);

  const openPane = () => {
    const id = nanoid(3);
    const panel = { label: "Panel-" + id, id };
    const newPanels = panels.concat(panel);
    console.log(newPanels);
    setPanels(newPanels);
  };

  const closePane = (pid: string) => {
    const newPanels = panels.filter((_p) => _p.id !== pid);
    if (newPanels.length === 0) {
      setPanels([]);
    } else {
      setPanels(newPanels);
    }
  };
  return (
    <div style={{ width: '500px', height: '1000px'}}>
      <Allotment vertical>
      <Allotment.Pane minSize={100}>tespiego</Allotment.Pane>
      <Allotment.Pane minSize={100}>
        <Allotment snap>
          {panels.map((p) => (
            <Allotment.Pane key={p.id} minSize={100} snap={false}>
              <div
                style={{
                  height: "100%",
                  backgroundColor: "#ccc",
                  padding: "8px",
                }}
              >
                {p.label} <Button onClick={(e) => closePane(p.id)}>X</Button>
              </div>
            </Allotment.Pane>
          ))}
        </Allotment>
      </Allotment.Pane>
    </Allotment>
    </div>
  );
};

export default App;
