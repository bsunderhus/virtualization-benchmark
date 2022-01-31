import React from "react";
import { Row } from "../components/Row";
import { useArray } from "../utils/useArray";

export const Native = React.memo(() => {
  const indexArray = useArray();
  return (
    <main className="content">
      {indexArray.map((_, index) => (
        <Row key={index} index={index} />
      ))}
    </main>
  );
});

Native.displayName = "Native";

export default Native;
