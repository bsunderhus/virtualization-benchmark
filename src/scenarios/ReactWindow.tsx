import React from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { Row, RowProps } from "../components/Row";
import { useSetFirstRender } from "../utils/configuration";
import { ROW_HEIGHT, ROW_WIDTH } from "../utils/constants";
import { useArray } from "../utils/useArray";

const renderRow = ({ index, style }: ListChildComponentProps<RowProps>) => (
  <Row index={index} style={style} />
);

export const ReactWindow = React.memo(() => {
  const indexArray = useArray();
  useSetFirstRender();
  return (
    <FixedSizeList<RowProps>
      height={window.innerHeight}
      width={ROW_WIDTH}
      itemCount={indexArray.length}
      itemSize={ROW_HEIGHT}
      overscanCount={3}
    >
      {renderRow}
    </FixedSizeList>
  );
});

ReactWindow.displayName = "ReactWindow";

export default ReactWindow;
