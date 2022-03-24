import React from "react";
import {
  RecyclerListView as RecyclerListViewWeb,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview/web";
import { Row } from "../components/Row";
import { ROW_HEIGHT } from "../utils/constants";
import { useArray } from "../utils/useArray";

const layoutProvider = new LayoutProvider(
  () => 0,
  (_, dimensions) => {
    dimensions.width = window.innerWidth;
    dimensions.height = ROW_HEIGHT;
  }
);

const dataProvider = new DataProvider((r1, r2) => r1 !== r2);

function rowRenderer(_: any, data: number) {
  return <Row index={data} />;
}

export const RecyclerListView = React.memo(() => {
  const indexArray = useArray();
  return (
    <main style={{ overflow: "hidden" }}>
      <RecyclerListViewWeb
        useWindowScroll={true}
        layoutProvider={layoutProvider}
        dataProvider={dataProvider.cloneWithRows(indexArray)}
        rowRenderer={rowRenderer}
      />
    </main>
  );
});

RecyclerListView.displayName = "RecyclerListView";

export default RecyclerListView;
