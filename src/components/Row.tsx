import {
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Button,
} from "@fluentui/react-components";
import React from "react";
import { Mode, useConfiguration } from "../utils/configuration";

export interface RowProps extends React.HTMLAttributes<HTMLElement> {
  index: number;
}

export const Row = React.memo(({ index, ...rest }: RowProps) => {
  if (!window.__renders) {
    window.__renders = 0;
  }
  ++window.__renders;
  window.__lastRender = window.performance.now();
  const item = (
    <div tabIndex={0} {...rest}>
      <Avatar color="colorful" name="X Y" />{" "}
      <Avatar color="colorful" name={`${index} A`} />{" "}
      <Avatar color="colorful" name="X Y" /> Test user {index}
    </div>
  );

  const { mode } = useConfiguration();

  switch (mode) {
    case Mode.LIGHT:
      return item;
    case Mode.PLACEHOLDER:
      return (
        <div className="placeholder" tabIndex={0} {...rest}>
          <span>X Y</span> <span>{index} A</span> <span>Test user {index}</span>
        </div>
      );
    case Mode.FULL:
      return (
        <Popover trapFocus openOnContext>
          <PopoverTrigger>{item}</PopoverTrigger>
          <PopoverSurface>
            <div>
              <Button>Action</Button>
              <Button>Action</Button>
            </div>
          </PopoverSurface>
        </Popover>
      );
  }
});

export const ROW_HEIGHT = 32;
