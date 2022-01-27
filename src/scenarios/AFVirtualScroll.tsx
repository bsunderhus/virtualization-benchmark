import { VerticalList, useVirtual } from "af-virtual-scroll";
import React from "react";
import { Row, ROW_HEIGHT } from "../components/Row";
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
