import React from "react";
import { Row } from "../components/Row";
import { indexArray } from "../utils/configuration";

export const Native = React.memo(() => {
  return (
    <main className="content">
      {indexArray.map((_, index) => (
        <Row key={index} index={index} />
      ))}
    </main>
  );
});

Native.displayName = "Native";
