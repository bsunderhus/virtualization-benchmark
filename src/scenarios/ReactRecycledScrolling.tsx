import React from "react";
import RecycledList from "react-recycled-scrolling";
import { Row, ROW_HEIGHT } from "../components/Row";
import { indexArray } from "../utils/configuration";

function SheepRow(no: number) {
  return <Row index={no} />;
}

export const ReactRecycledScrolling = React.memo(() => {
  return (
    <main>
      <RecycledList
        itemFn={SheepRow}
        attrList={indexArray}
        itemHeight={ROW_HEIGHT}
      />
    </main>
  );
});

ReactRecycledScrolling.displayName = "ReactRecycledScrolling";
