import "../index.css";
import { Route, Routes } from "react-router-dom";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { Home } from "./Home";
import { ConfigurationProvider } from "../utils/configuration";
import { scenarios } from "../utils/scenarios";

export function App() {
  return (
    <ConfigurationProvider>
      <FluentProvider id="fluentui-provider" theme={webLightTheme}>
        <Routes>
          <Route path="/" element={<Home />} />
          {scenarios.map((scenario) => (
            <Route
              key={scenario.path}
              path={scenario.path}
              element={<scenario.component />}
            />
          ))}
        </Routes>
      </FluentProvider>
    </ConfigurationProvider>
  );
}
