import { makeStaticStyles } from "@fluentui/react-components";
import React from "react";
import RecycledList from "react-recycled-scrolling";
import { Row } from "../components/Row";
import { ROW_HEIGHT } from "../utils/constants";
import { useArray } from "../utils/useArray";

function SheepRow(no: number) {
  return <Row index={no} />;
}

const useStaticStyles = makeStaticStyles({
  ".DefaultContainer.DefaultContainer": {
    height: "100vh",
  },
});

export const ReactRecycledScrolling = React.memo(() => {
  useStaticStyles();
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

export default ReactRecycledScrolling;
