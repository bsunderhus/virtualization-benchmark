import React from "react";
import { Virtuoso } from "react-virtuoso";
import { Row } from "../components/Row";
import { useSetFirstRender } from "../utils/configuration";
import { ROW_WIDTH, ROW_HEIGHT } from "../utils/constants";
import { useArray } from "../utils/useArray";

export const ReactVirtuoso = React.memo(() => {
  const indexArray = useArray();
  useSetFirstRender();
  return (
    <Virtuoso
      style={{ height: window.innerHeight, width: ROW_WIDTH }}
      totalCount={indexArray.length}
      itemContent={(index) => <Row index={index} />}
      overscan={3}
      fixedItemHeight={ROW_HEIGHT}
    />
  );
});

ReactVirtuoso.displayName = "ReactVirtuoso";

export default ReactVirtuoso;
