"use client";

import { useEffect, useState } from "react";
import Counter from "./Counter";
import { Configure } from "./Configure";

function Tricorder(props: any) {
  const scanForLifeforms = useState<any>();

  var isScanningForLifeForms = scanForLifeforms[0];
  var setScanForLifeFormsToTrue = () => scanForLifeforms[1](true);
  var setScanForLifeFormsToFalse = () => scanForLifeforms[1](false);

  let [foundLifeforms, setFoundLifeForms] = useState<any>([]);

  useEffect(() => {
    setInterval(() => {
      foundLifeforms.push(Math.random());
    }, 1000);
  });

  useEffect(() => {
    document.title = "Found lifeforms: " + foundLifeforms.length;
  });

  const [titleSet, setTitleSet] = useState(false);

  useEffect(() => {
    if (titleSet === false) {
      document.title = "Found lifeforms: " + foundLifeforms.length;
    }
  }, [titleSet, foundLifeforms.length]);

  const [config, setConfig] = useState<{
    antimatter?: boolean;
    slingshot?: boolean;
    stembolts?: boolean;
  }>();

  const CheckConfigurationComponent = (tricorderConfig: typeof config) => {
    if (
      tricorderConfig?.antimatter &&
      tricorderConfig?.slingshot &&
      tricorderConfig?.stembolts
    ) {
      return <div>👍👍</div>;
    }
    return (
      <div>
        🙃{" "}
        {Object.keys(config ? config : {})
          .filter((configItem) => config[configItem] === true)
          .map((a) => `${a} on`)
          .join(", ")}
      </div>
    );
  };

  return (
    <div>
      <Counter
        count={
          typeof document === "undefined" ? "" : document?.title?.match(/\d+/)
        }
      />
      <CheckConfigurationComponent />
      <div>
        <Configure onChange={setConfig} />
      </div>
      <pre>{JSON.stringify(config)}</pre>
      <button
        className="m-4 p-4 rounded-full bg-red-900 font-bold text-white"
        onClick={() => {
          if (isScanningForLifeForms) {
            setScanForLifeFormsToFalse();
          } else {
            setScanForLifeFormsToTrue();
          }
        }}
      >
        Scan for a new lifeform every 1000ms?
      </button>
      <button
        className="m-4 p-4 rounded-full bg-red-900 font-bold text-white"
        onClick={() => {
          const newFoundLifeforms = foundLifeforms;
          newFoundLifeforms.map((_, idx) => {
            delete newFoundLifeforms[idx];
          });
          setFoundLifeForms(newFoundLifeforms);
        }}
      >
        Clear found lifeforms
      </button>
      <div>
        {isScanningForLifeForms ? (
          <span className="font-bold mb-8">SCANNING FOR LIFE FORMS</span>
        ) : (
          "Not scanning for lifeforms"
        )}
      </div>
      <div>
        <h4>Lifeforms Found</h4>
      </div>
      <div>
        <ul>
          {foundLifeforms.map((lifeform, idx) => (
            <li key={lifeform}>
              {idx}: {lifeform}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Tricorder;
