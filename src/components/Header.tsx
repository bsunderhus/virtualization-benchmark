import React, { ChangeEvent } from "react";
import { Link } from "./Link";
import { Mode, useConfiguration } from "../utils/configuration";
import { scenarios } from "../scenarios";

export const Header = React.memo(() => {
  const [configuration, setConfiguration] = useConfiguration();
  const handleSelectChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.currentTarget.value as Mode;
      setConfiguration((curr) => ({
        ...curr,
        mode: value,
      }));
    },
    [setConfiguration]
  );

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.currentTarget.value);
      setConfiguration((curr) => ({
        ...curr,
        itemCount: value || curr.itemCount,
      }));
    },
    []
  );

  return (
    <header className="header">
      <nav>
        <ul className="header_nav-list">
          {scenarios.map((scenario, index) => (
            <li key={index}>
              <Link to={scenario.path ?? "/"}>{scenario.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <aside>
        <div>
          <label htmlFor="size-input">Array size: </label>
          <input
            type="number"
            name="size-input"
            id="size-input"
            value={configuration.itemCount}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="mode-select">Row Mode: </label>
          <select
            id="mode-select"
            onChange={handleSelectChange}
            value={configuration.mode}
          >
            <option value={Mode.FULL}>{Mode.FULL.toUpperCase()}</option>
            <option value={Mode.LIGHT}>{Mode.LIGHT.toUpperCase()}</option>
            <option value={Mode.PLACEHOLDER}>
              {Mode.PLACEHOLDER.toUpperCase()}
            </option>
          </select>
        </div>
      </aside>
    </header>
  );
});
