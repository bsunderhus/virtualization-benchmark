import * as FluentUI from "@fluentui/react-components";
import React from "react";
import * as Router from "react-router-dom";

type LinkProps = FluentUI.LinkProps & Router.LinkProps;

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => {
    const linkState = FluentUI.useLink_unstable(props, ref);
    linkState.components = {
      root: Router.Link as unknown as "a",
    };
    linkState.root = {
      ...linkState.root,
      to: props.to,
      reloadDocument: props.reloadDocument,
      replace: props.replace,
      state: props.state,
    } as LinkProps;
    FluentUI.useLinkStyles_unstable(linkState);
    return FluentUI.renderLink_unstable(linkState);
  }
);
