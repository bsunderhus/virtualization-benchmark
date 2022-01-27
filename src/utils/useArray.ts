import React from "react";
import { useConfiguration } from "./configuration";

export function useArray() {
  const [configuration] = useConfiguration();
  return React.useMemo(
    () => new Array(configuration.itemCount).fill(undefined).map((_, i) => i),
    [configuration.itemCount]
  );
}
