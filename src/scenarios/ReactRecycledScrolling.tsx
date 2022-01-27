import React from "react";
import RecycledList from "react-recycled-scrolling";
import { Row, ROW_HEIGHT } from "../components/Row";
import { useArray } from "../utils/useArray";

function SheepRow(no: number) {
  return <Row index={no} />;
}

export const ReactRecycledScrolling = React.memo(() => {
  const indexArray = useArray();
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
