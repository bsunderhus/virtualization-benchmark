import {
  Avatar,
  Button,
  MenuList,
  MenuItem,
  Menu,
  MenuTrigger,
  MenuPopover,
  makeStyles,
  mergeClasses,
  Divider,
  PresenceBadgeStatus,
  Tooltip,
} from "@fluentui/react-components";
import {
  GlassesOff24Regular,
  Pin24Regular,
  SpeakerMute24Regular,
  EyeTrackingOff24Regular,
  ExpandUpRight24Regular,
  ExpandUpRightRegular,
  MoreHorizontalRegular,
} from "@fluentui/react-icons";
import React from "react";
import { ROW_WIDTH } from "../utils/constants";
import { createDeepReactTreeComponent } from "../utils/createDeepReactTreeComponent";

const status: PresenceBadgeStatus[] = [
  "available",
  "away",
  "busy",
  "do-not-disturb",
  "offline",
  "out-of-office",
];

export interface RowProps extends React.HTMLAttributes<HTMLElement> {
  index: number;
}

const useStyles = makeStyles({
  item: {
    width: `${ROW_WIDTH}px`,
    display: "grid",
    gridTemplateColumns: "16px 32px 12px minmax(0px, 1fr) minmax(0px, auto)",
    gridTemplateRows: "2px 32px 2px",
    gridTemplateAreas: `
      "... ...... . mainMedia ......."
      "dot avatar . mainMedia buttons"
      "... ...... . mainMedia ......."
    `,
  },
  moreButton: {
    minWidth: "unset",
  },
  buttons: {
    gridRowStart: "buttons",
    gridRowEnd: "buttons",
    gridColumnStart: "buttons",
    gridColumnEnd: "buttons",
  },
  mainMedia: {
    gridRowStart: "mainMedia",
    gridRowEnd: "mainMedia",
    gridColumnStart: "mainMedia",
    gridColumnEnd: "mainMedia",
  },
  mainMediaPreview: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflowX: "hidden",
  },
  avatar: {
    gridRowStart: "avatar",
    gridRowEnd: "avatar",
    gridColumnStart: "avatar",
    gridColumnEnd: "avatar",
  },
});

export const ChatListItem = React.forwardRef<HTMLDivElement, RowProps>(
  ({ index, ...props }, ref) => {
    const styles = useStyles();
    React.useMemo(() => {
      uselessIterator(1_900_000);
    }, []);
    const popover = (
      <MenuPopover>
        <MenuList>
          <MenuItem icon={<ExpandUpRight24Regular />} submenuIndicator={null}>
            Popout chat
          </MenuItem>
          <Divider />
          <MenuItem icon={<GlassesOff24Regular />} submenuIndicator={null}>
            Mark as unread
          </MenuItem>
          <MenuItem icon={<Pin24Regular />} submenuIndicator={null}>
            Pin
          </MenuItem>
          <MenuItem icon={<SpeakerMute24Regular />} submenuIndicator={null}>
            Mute
          </MenuItem>
          <MenuItem icon={<EyeTrackingOff24Regular />} submenuIndicator={null}>
            Hide
          </MenuItem>
        </MenuList>
      </MenuPopover>
    );
    return (
      <Menu openOnContext>
        <MenuTrigger>
          <div
            ref={ref}
            tabIndex={0}
            {...props}
            className={mergeClasses(styles.item, props.className)}
          >
            <ChatListContainerTreeLevel>
              <ChatListItemAvatar index={index} />
              <ChatListItemMainMedia index={index} />
              <ChatListItemButtons popover={popover} />
            </ChatListContainerTreeLevel>
          </div>
        </MenuTrigger>
        {popover}
      </Menu>
    );
  }
);

ChatListItem.displayName = "ChatListItem";

export const ChatListItemAvatar = React.forwardRef<HTMLElement, RowProps>(
  ({ index }, ref) => {
    const styles = useStyles();
    return (
      <AvatarTreeLevel>
        <Avatar
          className={styles.avatar}
          ref={ref}
          image={{
            src: `https://avatars.dicebear.com/api/micah/${index}.svg`,
          }}
          name="User Name"
          badge={{
            status: status[index % status.length],
          }}
        />
      </AvatarTreeLevel>
    );
  }
);

ChatListItemAvatar.displayName = "ChatListItemAvatar";

export const ChatListItemMainMedia = React.forwardRef<HTMLDivElement, RowProps>(
  (props, ref) => {
    const styles = useStyles();
    return (
      <MainMediaTreeLevel>
        <div ref={ref} className={styles.mainMedia}>
          <div>User Name {props.index}</div>
          <div className={styles.mainMediaPreview}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis
            rem eaque neque ullam deserunt qui cum atque obcaecati ab, quas
            commodi praesentium architecto nesciunt hic possimus ut fugit quasi
            libero.
          </div>
        </div>
      </MainMediaTreeLevel>
    );
  }
);

ChatListItemMainMedia.displayName = "ChatListItemMainMedia";

export const ChatListItemButtons = React.forwardRef<
  HTMLDivElement,
  { popover: React.ReactElement }
>(({ popover }, ref) => {
  const styles = useStyles();
  return (
    <div ref={ref} className={styles.buttons}>
      <MenuButtonExpandIconTreeLevel>
        <Tooltip
          relationship="label"
          showDelay={0}
          hideDelay={0}
          content="Pop out chat"
        >
          <Button
            icon={<ExpandUpRightRegular />}
            className={styles.moreButton}
            appearance="transparent"
          />
        </Tooltip>
      </MenuButtonExpandIconTreeLevel>
      <MenuButtonMoreIconTreeLevel>
        <Menu>
          <MenuTrigger>
            <Tooltip
              relationship="label"
              showDelay={0}
              hideDelay={0}
              content="More options"
            >
              <Button
                icon={<MoreHorizontalRegular />}
                className={styles.moreButton}
                appearance="transparent"
              />
            </Tooltip>
          </MenuTrigger>
          {popover}
        </Menu>
      </MenuButtonMoreIconTreeLevel>
    </div>
  );
});

ChatListItemButtons.displayName = "ChatListItemButtons";

const ChatListContainerTreeLevel = createDeepReactTreeComponent(20);
const AvatarTreeLevel = createDeepReactTreeComponent(15);
const MainMediaTreeLevel = createDeepReactTreeComponent(0);
const MenuButtonMoreIconTreeLevel = createDeepReactTreeComponent(7);
const MenuButtonExpandIconTreeLevel = createDeepReactTreeComponent(5);

/**
 * 
  Anonymous
    Row
      Anonymous
        TreeItemMemo
          Anonymous
            MenuButton
              Popup
                Ref
                  RefFindNode
                    Ref
                      RefForward
                        TreeItem
                          Ref
                            RefFindNode
                              ChatItemTreeTitle
                                Ref
                                  RefForward
                                    TreeTitle
                                      ChatListItemContainer
                                        ChatListItemRendererLight
                                      Box
                Animation
                  Transition

ChatListItemRendererLight
  ChatListItemAvatar
    Anonymous
      ShowRealAvatarOnAtLeastPostCriticalPhase
        AvatarContainer
          AvatarContainer
            PersonaWithTelemetry
              Persona
                PersonaContainer
                  PersonaContainerInner
                    PersonaRenderer
                      ErrorBoundary
                        ErrorBoundaryInner
                          Anonymous
                            I
                              AvatarRenderer
                                Avatar
                                  AvatarImage
                                  PresenceContainer
                                    PresenceContainerInner
                                      PresenceRenderer
                                        AvatarStatus
  ChatListItemMainMediaRenderer
    ChatListItemMainMediaHeader
    ChatListItemMainMediaTimestamp
    ChatListItemMainMediaPreview
    ChatListItemBadge
  ChatListItemButtons
    ChatListPopoutButton
      Tooltip
        Ref
          RefFindNode
            Ref
              RefForward
                Button
                  Box
                    PopupIcon
        PortalInner
          Popper
            Ref
              RefFindNode
                Ref
                  RefForward
                    TooltipContent
    ChatListMenuButton
      MenuButton
        Ref
          RefFindNode
            Popup
              Ref
                RefFindNode
                  Ref
                    RefFindNode
                      Tooltip
                        Ref
                          RefFindNode
                            Ref
                              RefForward
                                Button
                                  Box
                                    MoreIcon
                        PortalInner
                          Popper
                            Ref
                              RefFindNode
                                Ref
                                  RefForward
                                    TooltipContent
              Animation
                Transition
 */

function uselessIterator(iterationsAmount: number) {
  for (let index = 0; index < iterationsAmount; index++) {
    continue;
  }
}
