import { AFVirtualScroll } from "./AFVirtualScroll";
import { ContentVisibility } from "./ContentVisibility";
import { Native } from "./Native";
import { ReactRecycledScrolling } from "./ReactRecycledScrolling";
import { ReactVirtual } from "./ReactVirtual";
import { ReactWindow } from "./ReactWindow";
import { RecyclerListView } from "./RecyclerListView";
import paths from "./paths.json";

export interface ScenarioModule {
  component: React.NamedExoticComponent;
  name?: string;
  path?: string;
  index?: boolean;
}

export const scenarios: ScenarioModule[] = [
  { path: paths.Native, component: Native },
  { path: paths.ContentVisibility, component: ContentVisibility },
  { path: paths.ReactVirtual, component: ReactVirtual },
  { path: paths.ReactWindow, component: ReactWindow },
  { path: paths.AFVirtualScroll, component: AFVirtualScroll },
  { path: paths.ReactRecycledScrolling, component: ReactRecycledScrolling },
  { path: paths.RecyclerListView, component: RecyclerListView },
];
