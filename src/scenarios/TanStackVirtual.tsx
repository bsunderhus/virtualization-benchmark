import React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Row } from "../components/Row";
import { useSetFirstRender } from "../utils/configuration";
import { ROW_WIDTH, ROW_HEIGHT } from "../utils/constants";
import { useArray } from "../utils/useArray";

export const TanStackVirtual = React.memo(() => {
  const indexArray = useArray();
  useSetFirstRender();

  // The scrollable element for your list
  const parentRef = React.useRef<HTMLDivElement>(null);

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: indexArray.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 3,
  });

  return (
    <div
      ref={parentRef}
      style={{
        height: window.innerHeight,
        width: ROW_WIDTH,
        overflow: "auto",
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <Row
            key={virtualItem.key}
            index={virtualItem.index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
});

TanStackVirtual.displayName = "TanStackVirtual";

export default TanStackVirtual;
