import React from "react";

export enum Mode {
  FULL = "full",
  LIGHT = "light",
  PLACEHOLDER = "placeholder",
}

export interface Configuration {
  itemCount: number;
  mode: Mode;
}

const configurationContext = React.createContext<
  | [Configuration, React.Dispatch<React.SetStateAction<Configuration>>]
  | undefined
>(undefined);

export interface ConfigurationProviderProps {
  defaultMode?: Mode;
  defaultItemCount?: number;
  children?: React.ReactNode;
}

export const ConfigurationProvider = React.memo<ConfigurationProviderProps>(
  ({ children, defaultMode = Mode.FULL, defaultItemCount = 1000 }) => {
    const context = React.useState<Configuration>({
      mode: defaultMode,
      itemCount: defaultItemCount,
    });
    const [, setContext] = context;

    window.__setMode = (mode) => setContext((curr) => ({ ...curr, mode }));
    return (
      <configurationContext.Provider value={context}>
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
