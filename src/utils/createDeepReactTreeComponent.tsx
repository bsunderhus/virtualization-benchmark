import React from "react";

export function createDeepReactTreeComponent(
  lvl: number = 0,
  Container: React.ExoticComponent<React.PropsWithChildren<{}>> = React.Fragment
): React.ExoticComponent<React.PropsWithChildren<{}>> {
  const Component = React.memo((props) => (
    <Container>{props.children}</Container>
  ));
  Component.displayName = `ComponentLevel${lvl}`;
  return lvl === 0
    ? Component
    : createDeepReactTreeComponent(lvl - 1, Component);
}
