import React from "react";
import scenariosMetadata from "/scenarios.json";

export interface ScenarioModule {
  component: React.NamedExoticComponent;
  src: string;
  name: string;
  path: string;
}

const BASE_PATH = "http://domain/src/utils/";

const modules = Object.fromEntries(
  Object.entries(import.meta.globEager("../scenarios/*.tsx")).map(
    ([path, module]) => [new URL(path, BASE_PATH).pathname, module]
  )
) as Record<string, { default: React.NamedExoticComponent }>;

export const scenarios = scenariosMetadata.map<ScenarioModule>((metadata) => ({
  component: modules[metadata.src].default,
  ...metadata,
}));
