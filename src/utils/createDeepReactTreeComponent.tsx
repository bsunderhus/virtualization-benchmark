import React from "react";

export function createDeepReactTreeComponent(
  lvl: number = 0,
  Container: React.ElementType<React.PropsWithChildren<{}>> = React.Fragment
): React.ElementType<React.PropsWithChildren<{}>> {
  const Component = React.memo((props) => (
    <Container>{props.children}</Container>
  ));
  Component.displayName = `ComponentLevel${lvl}`;
  return lvl === 0
    ? Component
    : createDeepReactTreeComponent(lvl - 1, Component);
}
