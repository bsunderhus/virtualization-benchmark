import React from "react";

export enum Mode {
  FULL = "full",
  LIGHT = "light",
  PLACEHOLDER = "placeholder",
}

export interface Configuration {
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

export const indexArray = new Array(1000).fill(undefined).map((_, i) => i);

const configurationContext = React.createContext<Configuration | undefined>(
  undefined
);

export interface ConfigurationProviderProps {
  defaultMode?: Mode;
  children?: React.ReactNode;
}

export const ConfigurationProvider = React.memo<ConfigurationProviderProps>(
  ({ children, defaultMode = Mode.FULL }) => {
    const [mode, setMode] = React.useState(defaultMode);
    window.__setMode = setMode;
    const configuration = React.useMemo<Configuration>(
      () => ({ mode, setMode }),
      [mode]
    );
    return (
      <configurationContext.Provider value={configuration}>
        {children}
      </configurationContext.Provider>
    );
  }
);

export function useConfiguration() {
  const context = React.useContext(configurationContext);
  if (!context) throw new Error("Context being used without Provider");
  return context;
}
