import React from "react";
import { useVirtual } from "react-virtual";
import { Row, ROW_HEIGHT } from "../components/Row";
import { indexArray } from "../utils/configuration";

export const ReactVirtual = React.memo(() => {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtual({
    size: indexArray.length,
    parentRef,
    estimateSize: React.useCallback(() => ROW_HEIGHT, []),
  });

  return (
    <div
      ref={parentRef}
      className="List"
      style={{
        height: `100vh`,
        overflow: "auto",
      }}
    >
      <div
        className="ListInner"
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => (
          <Row
            key={virtualRow.index}
            index={virtualRow.index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
});

ReactVirtual.displayName = "ReactVirtual";
