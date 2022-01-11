import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { Home } from "./Home";
import { ConfigurationProvider } from "./utils/configuration";
import { scenarios } from "./scenarios";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigurationProvider>
        <FluentProvider theme={webLightTheme}>
          <Routes>
            <Route path="/" element={<Home />} />
            {scenarios.map((scenario) => (
              <Route
                key={scenario.path}
                path={scenario.path}
                index={scenario.index}
                element={<scenario.component />}
              />
            ))}
          </Routes>
        </FluentProvider>
      </ConfigurationProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
