import type { RenderItem } from "@resembli/react-virtualized-window";
import { List } from "@resembli/react-virtualized-window";
import React from "react";
import { useArray } from "../utils/useArray";
import { Row, ROW_HEIGHT } from "../components/Row";

const renderer: RenderItem<number> = ({ data, style }) => (
  <Row index={data} style={style}>
    {data}
  </Row>
);

export const Resembli = React.memo(() => {
  const array = useArray();
  return (
    <div style={{ width: "100%", height: window.innerHeight }}>
      <List overscan={1} defaultSize={ROW_HEIGHT} data={array}>
        {renderer}
      </List>
    </div>
  );
});

Resembli.displayName = "Resembli";

export default Resembli;
