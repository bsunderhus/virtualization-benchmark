import React from "react";

export enum Mode {
  CHAT_LIST_ITEM = "chat-list-item",
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

    window.__setMode = (mode) => {
      window.__start = window.performance.now();
      window.__renders = 0;
      setContext((curr) => ({ ...curr, mode }));
    };
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

export function useSetRowRenders() {
  if (!window.__renders) {
    window.__renders = 0;
  }
  window.__renders++;
  // React.useEffect(() => {
  //   window.__lastRender = window.performance.now();
  // }, []);
}

export function useSetFirstRender() {
  const start = React.useRef(NaN);
  React.useEffect(() => {
    window.__firstRender = window.performance.now() - start.current;
  }, []);

  if (isNaN(start.current)) {
    start.current = window.performance.now();
  }
}
