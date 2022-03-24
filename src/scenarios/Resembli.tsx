import type { RenderItem } from "@resembli/react-virtualized-window";
import { List } from "@resembli/react-virtualized-window";
import React from "react";
import { useArray } from "../utils/useArray";
import { Row } from "../components/Row";
import { ROW_HEIGHT, ROW_WIDTH } from "../utils/constants";

const renderer: RenderItem<number> = ({ data, style }) => (
  <Row index={data} style={style}>
    {data}
  </Row>
);

export const Resembli = React.memo(() => {
  const array = useArray();
  return (
    <div style={{ width: ROW_WIDTH, height: window.innerHeight }}>
      <List overscan={1} defaultSize={ROW_HEIGHT} data={array}>
        {renderer}
      </List>
    </div>
  );
});

Resembli.displayName = "Resembli";

export default Resembli;
