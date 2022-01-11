import React from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { Row, RowProps, ROW_HEIGHT } from "../components/Row";
import { indexArray } from "../utils/configuration";

const renderRow = ({ index, style }: ListChildComponentProps<RowProps>) => (
  <Row index={index} style={style} />
);

export const ReactWindow = React.memo(() => {
  return (
    <FixedSizeList<RowProps>
      height={window.innerHeight}
      width={window.innerWidth}
      itemCount={indexArray.length}
      itemSize={ROW_HEIGHT}
      overscanCount={3}
    >
      {renderRow}
    </FixedSizeList>
  );
});

ReactWindow.displayName = "ReactWindow";