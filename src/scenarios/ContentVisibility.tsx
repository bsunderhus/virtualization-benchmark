import React from "react";
import { Row } from "../components/Row";
import { useArray } from "../utils/useArray";

export const ContentVisibility = React.memo(() => {
  const indexArray = useArray();
  return (
    <main className="content-visibility-content">
      {indexArray.map((index) => (
        <Row key={index} index={index} className="content-visibility-item" />
      ))}
    </main>
  );
});

ContentVisibility.displayName = "ContentVisibility";
