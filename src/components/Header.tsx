import React from "react";
import { Link } from "./Link";
import { Mode, useConfiguration } from "../utils/configuration";
import { scenarios } from "../scenarios";

export const Header = React.memo(() => {
  const { mode, setMode } = useConfiguration();
  const handleChange = React.useCallback(
    (e) => setMode(e.currentTarget.value as Mode),
    [setMode]
  );

  return (
    <header className="header">
      <nav>
        <ul className="header_nav-list">
          {scenarios.map((scenario, index) => (
            <li key={index}>
              <Link to={scenario.path ?? "/"}>
                {scenario.component.displayName}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <aside>
        <label htmlFor="mode-select">Row Mode: </label>
        <select id="mode-select" onChange={handleChange} value={mode}>
          <option value={Mode.FULL}>{Mode.FULL.toUpperCase()}</option>
          <option value={Mode.LIGHT}>{Mode.LIGHT.toUpperCase()}</option>
          <option value={Mode.PLACEHOLDER}>
            {Mode.PLACEHOLDER.toUpperCase()}
          </option>
        </select>
      </aside>
    </header>
  );
});
