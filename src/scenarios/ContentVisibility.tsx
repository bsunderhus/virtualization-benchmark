import { makeStyles } from "@fluentui/react-components";
import React from "react";
import { Row } from "../components/Row";

import { useArray } from "../utils/useArray";

const useStyles = makeStyles({
  "content-visibility-content": {
    contain: "strict",
    height: "100vh",
    overflow: "auto",
  },
  "content-visibility-item": {
    height: "32px",
    contentVisibility: "auto",
    containIntrinsicSize: "0 32px",
  },
});

export const ContentVisibility = React.memo(() => {
  const styles = useStyles();
  const indexArray = useArray();
  return (
    <main className={styles["content-visibility-content"]}>
      {indexArray.map((index) => (
        <Row
          key={index}
          index={index}
          className={styles["content-visibility-item"]}
        />
      ))}
    </main>
  );
});

ContentVisibility.displayName = "ContentVisibility";

export default ContentVisibility;
