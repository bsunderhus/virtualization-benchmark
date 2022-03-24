import React from "react";
import { Link } from "./Link";
import { Mode, useConfiguration } from "../utils/configuration";
import { scenarios } from "../utils/scenarios";
import { makeStyles, shorthands } from "@fluentui/react-components";

const useStyles = makeStyles({
  header: {
    display: "flex",
    flexDirection: "column",
    rowGap: "20px",
    columnGap: "20px",
    ...shorthands.padding("20px"),
  },
});

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

  const styles = useStyles();

  return (
    <header className={styles.header}>
      <nav>
        <ul>
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
            {Object.values(Mode).map((value, index) => (
              <option key={index} value={value}>
                {value.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </aside>
    </header>
  );
});
