import { Route, Routes } from "react-router-dom";
import {
  FluentProvider,
  webLightTheme,
  makeStaticStyles,
} from "@fluentui/react-components";
import { Home } from "./Home";
import { ConfigurationProvider, Mode } from "../utils/configuration";
import { scenarios } from "../utils/scenarios";

const useStaticStyles = makeStaticStyles({
  body: {
    margin: 0,
  },
});

export function App() {
  useStaticStyles();
  return (
    <ConfigurationProvider defaultMode={Mode.CHAT_LIST_ITEM}>
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
