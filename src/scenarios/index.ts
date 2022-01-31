import React from "react";
import scenariosMetadata from "./scenarios.json";

export interface ScenarioModule {
  component: React.NamedExoticComponent;
  name: string;
  path: string;
}

export const scenarios = await Promise.all(
  scenariosMetadata.map((metadata) =>
    import(metadata.src).then(
      (module: { default: React.NamedExoticComponent }): ScenarioModule => ({
        path: metadata.path,
        component: module.default,
        name: metadata.name,
      })
    )
  )
);
