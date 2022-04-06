import {
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Button,
  makeStyles,
} from "@fluentui/react-components";
import React, { Profiler } from "react";
import { Mode, useConfiguration } from "../utils/configuration";
import { ROW_HEIGHT } from "../utils/constants";
import { ChatListItem } from "./ChatListItem";

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

FullRow.displayName = "FullRow";

export const LightRow = React.forwardRef<HTMLDivElement, RowProps>(
  ({ index, ...rest }, ref) => {
    return (
      <div ref={ref} tabIndex={0} {...rest}>
        <Avatar color="colorful" name={`${index} UserName`} />{" "}
        <span> Test user {index}</span>
      </div>
    );
  }
);

LightRow.displayName = "LightRow";

const usePlaceholderStyles = makeStyles({
  placeholder: {
    lineHeight: `${ROW_HEIGHT}px`,
    height: `${ROW_HEIGHT}px`,
    backgroundColor: "grey",
  },
});

export const PlaceholderRow = React.forwardRef<HTMLDivElement, RowProps>(
  (props, ref) => {
    const styles = usePlaceholderStyles();
    return <div {...props} ref={ref} className={styles.placeholder} />;
  }
);

PlaceholderRow.displayName = "PlaceholderRow";

const Row = React.forwardRef<HTMLDivElement, RowProps>((props, ref) => {
  setRenders();
  const [configuration] = useConfiguration();
  switch (configuration.mode) {
    case Mode.FULL:
      return <FullRow ref={ref} {...props} />;
    case Mode.LIGHT:
      return <LightRow ref={ref} {...props} />;
    case Mode.PLACEHOLDER:
      return <PlaceholderRow ref={ref} {...props} />;
    case Mode.CHAT_LIST_ITEM:
      return <ChatListItem ref={ref} {...props} />;
  }
});

Row.displayName = "Row";

const RowWithProfiler = React.forwardRef<HTMLDivElement, RowProps>(
  (props, ref) => {
    const row = <Row {...props} ref={ref} />;
    if (import.meta.env.DEV) {
      return (
        <Profiler id="Row" onRender={handleProfiler}>
          {row}
        </Profiler>
      );
    }
    return row;
  }
);

RowWithProfiler.displayName = "RowWithProfiler";

export { RowWithProfiler as Row };

function setRenders() {
  if (!window.__renders) {
    window.__renders = 0;
  }
  ++window.__renders;
  window.__lastRender = window.performance.now();
}

(window as any).__durations = [];
const handleProfiler: React.ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) => {
  if (phase === "mount") {
    (window as any).__durations.push(actualDuration);
  }
};
