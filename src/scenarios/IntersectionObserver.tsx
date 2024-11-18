/**
 * NOTE: After implementing this POC, I found a utility in VirtualList v1 that
 *       also uses IntersectionObserver in a similar way. We'll have to check
 *       if we should use this utility instead of the one implemented here.
 */

import * as React from "react";
import { unstable_batchedUpdates } from "react-dom";
import { makeStyles, shorthands } from "@fluentui/react-components";
import { Row } from "../components/Row";
import { useArray } from "../utils/useArray";
import { ROW_HEIGHT } from "../utils/constants";
import { useSetFirstRender } from "../utils/configuration";

const useStyles = makeStyles({
  container: {
    height: "100vh",
    overflowY: "auto",
    overflowX: "auto",
  },
});

type VisibilityCallback = (isVisible: boolean) => void;

const IntersectionObserverContext = React.createContext<
  | {
      registerObserver: (
        node: Element | null,
        visibilityCallback: VisibilityCallback,
        stopObservingOnceVisible: boolean
      ) => void;
      initiallyVisibleElements?: number;
    }
  | undefined
>(undefined);

/**
 * A React component that sets up an IntersectionObserver and provides a context
 * for descendant components to register their refs and receive state about the
 * visibility of the observed elements.
 *
 * This is useful for triggering any action once an element intersects with the
 * viewport or a specified root element.
 *
 * @note The wrapped component must have an element with `CSS overflow: auto`
 *       for positive `rootMargin` values to work correctly.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} [props.rootMargin] - The margin around the root. Can have values similar to the CSS margin property.
 * @param {number|number[]} [props.threshold] - A single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed.
 * @param {React.ReactElement<React.PropsWithRef<{}>>} props.children - The child component that will be observed.
 */
const IntersectionObserverProvider: React.FC<{
  rootMargin?: string;
  threshold?: number | number[];
  children: React.ReactElement<React.PropsWithRef<{}>>;
  initiallyVisibleElements?: number;
}> = ({ rootMargin, threshold, children, initiallyVisibleElements }) => {
  const observerRef = React.useRef<IntersectionObserver | null>(null);
  const observedNodes = React.useRef<
    Map<
      Element,
      {
        visibilityCallback: VisibilityCallback;
        stopObservingOnceVisible: boolean;
      }
    >
  >(new Map());
  const tempNodes = React.useRef<
    {
      node: Element;
      visibilityCallback: VisibilityCallback;
      stopObservingOnceVisible: boolean;
    }[]
  >([]);

  const registerObserver = React.useCallback(
    (
      node: Element | null,
      visibilityCallback: VisibilityCallback,
      stopObservingOnceVisible
    ) => {
      if (node) {
        // If the node is already being observed, do nothing
        if (observedNodes.current.has(node)) {
          return;
        }

        // If the observer is not ready, store the node in a temporary list
        if (!observerRef.current) {
          tempNodes.current.push({
            node,
            visibilityCallback,
            stopObservingOnceVisible,
          });
        } else {
          // Observe the new node
          observerRef.current.observe(node);
          observedNodes.current.set(node, {
            visibilityCallback,
            stopObservingOnceVisible,
          });
        }
      } else {
        // If the node is null, stop observing the specific node
        for (const [
          observedNode,
          observedNodeOptions,
        ] of observedNodes.current) {
          if (observedNodeOptions.visibilityCallback === visibilityCallback) {
            observerRef.current?.unobserve(observedNode);
            observedNodes.current.delete(observedNode);
            break; // Exit early once the node is found and removed
          }
        }
      }
    },
    []
  );

  const rootRef = React.useCallback(
    (node: HTMLElement | null) => {
      if (node) {
        // Check if the node has CSS overflow: auto
        // TODO: Only do this in development mode? Unsure of the cost.
        if (
          rootMargin &&
          rootMargin.split(" ").some((value) => parseFloat(value) > 0)
        ) {
          const computedStyle = window.getComputedStyle(node);
          if (
            computedStyle.overflow !== "auto" &&
            computedStyle.overflowY !== "auto" &&
            computedStyle.overflowX !== "auto"
          ) {
            throw new Error(
              "[IntersectionObserverProvider]: The root element should have CSS overflow: auto for positive rootMargin values to work correctly."
            );
          }
        }

        observerRef.current = new IntersectionObserver(
          (entries) => {
            unstable_batchedUpdates(() => {
              entries.forEach((entry) => {
                const observedNodeOptions = observedNodes.current.get(
                  entry.target
                );
                if (observedNodeOptions) {
                  observedNodeOptions.visibilityCallback(entry.isIntersecting);
                  if (
                    entry.isIntersecting &&
                    observedNodeOptions.stopObservingOnceVisible
                  ) {
                    observerRef.current?.unobserve(entry.target);
                    observedNodes.current.delete(entry.target);
                  }
                }
              });
            });
          },
          {
            root: node,
            rootMargin,
            threshold,
          }
        );

        // Observe all nodes stored in the temporary list
        tempNodes.current.forEach(
          ({ node, visibilityCallback, stopObservingOnceVisible }) => {
            observerRef.current?.observe(node);
            observedNodes.current.set(node, {
              visibilityCallback,
              stopObservingOnceVisible,
            });
          }
        );
        tempNodes.current = [];
      } else {
        observerRef.current?.disconnect();
        observerRef.current = null;
      }
    },
    [rootMargin, threshold]
  );

  React.useEffect(() => {
    return () => {
      // Clear tempNodes when the component unmounts
      tempNodes.current = [];
    };
  }, []);

  const context = React.useRef({
    registerObserver,
    initiallyVisibleElements: initiallyVisibleElements || 0,
  });

  const child = React.Children.only(children);

  return (
    <IntersectionObserverContext.Provider value={context.current}>
      {React.isValidElement(child)
        ? React.cloneElement(child, { ref: rootRef })
        : child}
    </IntersectionObserverContext.Provider>
  );
};

/**
 * A hook that uses the IntersectionObserver provided by the
 * IntersectionObserverProvider to register its ref and handle intersection
 * changes. It returns the visibility state and a ref callback to be used by
 * the component.
 *
 * @returns {Object} An object containing the visibility state and a ref callback
 * @returns {boolean} isVisible - The visibility state of the observed element
 * @returns {function} observeRef - The ref callback to be used by the component
 *
 * @example
 * ```tsx
 * const MyComponent: React.FC = () => {
 *   const { isVisible, observeRef } = useIntersectionObserver();
 *
 *   return (
 *     <div ref={observeRef}>
 *       {isVisible && <div>Component is now visible</div>}
 *     </div>
 *   );
 * };
 * ```
 */
const useIntersectionObserver = (
  stopObservingOnceVisible = false
): {
  isVisible: boolean;
  observeRef: (node: HTMLElement | null) => void;
} => {
  const context = React.useContext(IntersectionObserverContext);
  if (!context) {
    throw new Error(
      "useIntersectionObserver must be used within an IntersectionObserverProvider"
    );
  }

  // Check if the context has a positive `initiallyVisibleElements` value, in
  // which case the component should be considered visible initially. We only
  // want to check this once, when we initialize the ref.
  const isInitiallyVisible = React.useRef<boolean | undefined>();
  if (
    isInitiallyVisible.current === undefined &&
    context.initiallyVisibleElements
  ) {
    isInitiallyVisible.current = true;
    // Decrement the initiallyVisibleElements count, so that the next component
    // doesn't consider itself initially visible, if the count has reached 0.
    context.initiallyVisibleElements--;
  } else {
    isInitiallyVisible.current = false;
  }

  const [isVisible, setIsVisible] = React.useState(
    !!isInitiallyVisible.current
  );
  const observeRef = React.useCallback(
    (node) => {
      if (isInitiallyVisible.current && stopObservingOnceVisible) {
        // No need to even register when it's initially visible.
        return;
      }
      context.registerObserver(node, setIsVisible, stopObservingOnceVisible);
    },
    [context, isInitiallyVisible, setIsVisible, stopObservingOnceVisible]
  );

  return {
    isVisible,
    observeRef,
  };
};

export const DeferredRenderWrapper: React.FC<{}> = (props) => {
  const { isVisible, observeRef } = useIntersectionObserver(true);
  return (
    <div
      ref={observeRef}
      style={{
        height: ROW_HEIGHT,
      }}
    >
      {isVisible ? props.children : null}
    </div>
  );
};

export const IntersectionObserverExample = React.memo(() => {
  const styles = useStyles();
  const array = useArray();
  useSetFirstRender();

  return (
    <IntersectionObserverProvider
      rootMargin="1000px 0px"
      threshold={0}
      initiallyVisibleElements={50}
    >
      <div
        aria-label="IntersectionObserver Example"
        className={styles.container}
        role={"list"}
      >
        {array.map((_, index) => (
          <DeferredRenderWrapper key={index}>
            <Row index={index} style={{ height: ROW_HEIGHT }} />
          </DeferredRenderWrapper>
        ))}
      </div>
    </IntersectionObserverProvider>
  );
});

IntersectionObserverExample.displayName = "IntersectionObserverExample";

export default IntersectionObserverExample;
