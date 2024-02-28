"use client";

import { useEffect, useState, useRef } from "react";
import Counter from "./Counter";
import { Configure } from "./Configure";

function Tricorder() {
  const [scanForLifeforms, setScanForLifeforms] = useState<boolean>();
  const [foundLifeforms, setFoundLifeForms] = useState<number[]>([]);
  const [config, setConfig] = useState<{
    antimatter?: boolean;
    slingshot?: boolean;
    stembolts?: boolean;
  }>();
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      setFoundLifeForms((f) => [...f, Math.random()]);
    }, 10);

    return () => {
      if (interval.current != null) {
        clearInterval(interval.current);
      }
    };
  }, []);

  useEffect(() => {
    document.title = "Found lifeforms: " + foundLifeforms.length;
  }, [foundLifeforms.length]);

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
          .filter(
            (configItem) => ((config as any)[configItem as any] as any) === true
          )
          .map((a) => `${a} on`)
          .join(", ")}
      </div>
    );
  };

  function CheckNumberOfLifeformsIsCorrect({
    lifeforms,
  }: {
    lifeforms: number[];
  }) {
    if (lifeforms.length === 47) {
      if (interval.current != null) {
        clearInterval(interval.current);
      }
      return (
        <div className="text-3xl text-green-700 p-64">47 lifeforms found!</div>
      );
    }
    return <></>;
  }

  return (
    <div>
      <Counter
        count={
          typeof document === "undefined" ? "" : document?.title?.match(/\d+/)
        }
      />
      <CheckNumberOfLifeformsIsCorrect lifeforms={foundLifeforms} />
      <CheckConfigurationComponent />
      <div>
        <Configure onChange={setConfig} />
      </div>
      <pre>{JSON.stringify(config)}</pre>
      <button
        className="m-4 p-4 rounded-full bg-red-900 font-bold text-white"
        onClick={() => {
          setScanForLifeforms((s) => !s);
        }}
      >
        Scan for a new lifeform every 1000ms?
      </button>
      <button
        className="m-4 p-4 rounded-full bg-red-900 font-bold text-white"
        onClick={() => {
          setFoundLifeForms([]);
        }}
      >
        Clear found lifeforms
      </button>
      <div>
        {scanForLifeforms ? (
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
