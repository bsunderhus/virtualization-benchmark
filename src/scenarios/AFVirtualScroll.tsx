import React from "react";
import { List } from "af-virtual-scroll";
import "af-virtual-scroll/lib/style.css";
import { indexArray } from "../utils/configuration";
import { Row, ROW_HEIGHT } from "../components/Row";

const renderRow = (i: number) => <Row key={i} index={i} />;

export const AFVirtualScroll = React.memo(() => (
  <List
    fixed
    className="content"
    itemCount={indexArray.length}
    estimatedItemSize={ROW_HEIGHT}
  >
    {renderRow}
  </List>
));

AFVirtualScroll.displayName = "AFVirtualScroll";
