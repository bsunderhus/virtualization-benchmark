import { makeStyles, shorthands } from "@fluentui/react-components";
import React from "react";
import { Row } from "../components/Row";
import { useSetFirstRender } from "../utils/configuration";
import { useArray } from "../utils/useArray";

const useStyles = makeStyles({
  content: {
    height: "100vh",
    ...shorthands.overflow("auto"),
  },
});

export const Native = React.memo(() => {
  const styles = useStyles();
  const indexArray = useArray();
  useSetFirstRender();
  return (
    <main className={styles.content}>
      {indexArray.map((_, index) => (
        <Row key={index} index={index} />
      ))}
    </main>
  );
});

Native.displayName = "Native";

export default Native;
