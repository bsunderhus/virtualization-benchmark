import {
  Virtualizer,
  useStaticVirtualizerMeasure,
} from "@fluentui/react-components/unstable";
import { makeStyles, shorthands } from "@fluentui/react-components";
import { Row } from "../components/Row";
import { useArray } from "../utils/useArray";
import { ROW_HEIGHT } from "../utils/constants";
import React from "react";

const useStyles = makeStyles({
  container: {
    height: "100vh",
    ...shorthands.overflow("auto"),
  },
});

export const FluentVirtualizer = React.memo(() => {
  const styles = useStyles();
  const array = useArray();

  const { virtualizerLength, bufferItems, bufferSize, scrollRef } =
    useStaticVirtualizerMeasure({
      defaultItemSize: ROW_HEIGHT,
    });

  return (
    <div
      aria-label="Virtualizer Example"
      className={styles.container}
      role={"list"}
      ref={scrollRef}
    >
      <Virtualizer
        numItems={array.length}
        virtualizerLength={virtualizerLength}
        bufferItems={bufferItems}
        bufferSize={bufferSize}
        itemSize={100}
      >
        {(index) => <Row key={index} index={index} />}
      </Virtualizer>
    </div>
  );
});

FluentVirtualizer.displayName = "FluentVirtualizer";

export default FluentVirtualizer;
