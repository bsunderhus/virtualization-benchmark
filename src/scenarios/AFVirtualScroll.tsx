import { VerticalList, useVirtual } from "af-virtual-scroll";
import React from "react";
import { Row } from "../components/Row";
import { ROW_HEIGHT } from "../utils/constants";
import { useArray } from "../utils/useArray";

const renderRow = (index: number) => <Row key={index} index={index} />;

export const AFVirtualScroll = React.memo(() => {
  const indexArray = useArray();
  const model = useVirtual({
    itemCount: indexArray.length,
    fixed: true,
    estimatedItemSize: ROW_HEIGHT,
    // overscanCount: 5
  });

  return <VerticalList model={model}>{renderRow}</VerticalList>;
});

AFVirtualScroll.displayName = "AFVirtualScroll";

export default AFVirtualScroll;
