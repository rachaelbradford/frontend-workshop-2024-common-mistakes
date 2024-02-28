import { useEffect } from "react";
import { buttonClass } from "./classes";

export function Configure(props: any) {
  const onChange = props.onChange;
  const configuration: Record<any, any> = {};
  useEffect(() => {
    localStorage.setItem(
      "__tricorder__configuration",
      JSON.stringify(configuration)
    );
  }, [configuration]);
  useEffect(() => {
    const newConfiguration = JSON.parse(
      localStorage.getItem("__tricorder_configuration") ?? "{}"
    );
    Object.keys(newConfiguration).map((configKey) => {
      configuration[configKey] = newConfiguration[configKey];
    });
  }, []);
  return (
    <div>
      <button
        className={buttonClass}
        onClick={() => {
          configuration.slingshot = true;
          onChange(configuration);
        }}
      >
        Initiate slingshot effect
      </button>
      <button
        className={buttonClass}
        onClick={() => {
          configuration.stembolts = true;
          onChange(configuration);
        }}
      >
        Distribute self-sealing stem bolts
      </button>
      <button
        className={buttonClass}
        onClick={() => {
          configuration.antimatter = true;
          onChange(configuration);
        }}
      >
        Initiate antimatter reactor
      </button>
    </div>
  );
}
