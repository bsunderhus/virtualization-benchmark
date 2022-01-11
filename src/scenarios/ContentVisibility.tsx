import React from "react";
import { Row } from "../components/Row";
import { indexArray } from "../utils/configuration";

export const ContentVisibility = React.memo(() => {
  return (
    <main className="content-visibility-content">
      {indexArray.map((index) => (
        <Row key={index} index={index} className="content-visibility-item" />
      ))}
    </main>
  );
});

ContentVisibility.displayName = "ContentVisibility";
