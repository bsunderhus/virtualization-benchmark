import {
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Button,
  makeStyles,
} from "@fluentui/react-components";
import React from "react";
import { Mode, useConfiguration } from "../utils/configuration";

export interface RowProps extends React.HTMLAttributes<HTMLElement> {
  index: number;
}

export const FullRow = React.forwardRef<HTMLDivElement, RowProps>(
  (props, ref) => {
    return (
      <Popover trapFocus openOnContext>
        <PopoverTrigger>
          <LightRow ref={ref} {...props} />
        </PopoverTrigger>
        <PopoverSurface>
          <div>
            <Button>Action</Button>
            <Button>Action</Button>
          </div>
        </PopoverSurface>
      </Popover>
    );
  }
);

export const LightRow = React.forwardRef<HTMLDivElement, RowProps>(
  ({ index, ...rest }, ref) => {
    return (
      <div ref={ref} tabIndex={0} {...rest}>
        <Avatar color="colorful" name="X Y" />{" "}
        <Avatar color="colorful" name={`${index} A`} />{" "}
        <Avatar color="colorful" name="X Y" /> Test user {index}
      </div>
    );
  }
);

const usePlaceholderStyles = makeStyles({
  placeholder: {
    lineHeight: "32px",
    height: "32px",
    backgroundColor: "grey",
  },
});

export const PlaceholderRow = React.forwardRef<HTMLDivElement, RowProps>(
  (props, ref) => {
    const styles = usePlaceholderStyles();
    return <div {...props} ref={ref} className={styles.placeholder} />;
  }
);

export const Row = React.forwardRef<HTMLDivElement, RowProps>((props, ref) => {
  setRenders();
  const [configuration] = useConfiguration();
  switch (configuration.mode) {
    case Mode.FULL:
      return <FullRow ref={ref} {...props} />;
    case Mode.LIGHT:
      return <LightRow ref={ref} {...props} />;
    case Mode.PLACEHOLDER:
      return <PlaceholderRow ref={ref} {...props} />;
  }
});

export const ROW_HEIGHT = 32;

function setRenders() {
  if (!window.__renders) {
    window.__renders = 0;
  }
  ++window.__renders;
  window.__lastRender = window.performance.now();
}
