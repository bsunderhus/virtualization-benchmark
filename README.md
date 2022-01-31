# Virtualization benchmark

Deployed to https://virtualization-benchmark.netlify.app

Based on mui virtualization benchmark:

- https://github.com/mui-org/material-ui-x/issues/1933
- https://github.com/mui-org/material-ui-x/tree/next/benchmark

## Library comparison

- react-window
- react-virtual
- [https://engineering.monday.com/building-our-recycle-list-solution-in-react/](RecyclerListView)
- native (without virtualization)
- content-visibility (without virtualization)
- [https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility](content-visibility)
- (af-virtual-scroll)[https://github.com/nowaalex/af-virtual-scroll]

## Running benchmark or site

- `yarn`
- `yarn benchmark` - runs benchmark
- `yarn dev` - starts server, use http://localhost:3000

## Results

- measured fps is almost the same for each
- there are clear visual differences, even though they might be subjective and dependent on the hardware
- RecyclerListView approach has accessibility issues (tab order unstable)
- react-window and content-visibility have significant flickering on windows
- RecyclerListView, react-window, content-visibility and native show white when scroll difference is large
- react-virtual and react-recycler-scrolling and af-virtual-scroll seem to be equal

## Subjective visual assesment

### Windows

- react-virtual, react-recycled-scrolling and af-virtual-scroll perform the best
- recycle has the least amount of dropped frames (as shown in FPS monitor)
- stats are mostly the same for all virtualization libraries (CPU/memory not yet available on windows):

```
Native (no virtualization):

    Min: 12.774 fps (σ = 3.7)
    Max: 56.438 fps (σ = 0.579)
    Median: 52.593 fps (σ = 0.4)
    Mean: 47.334 fps (σ = 0.796)
    renders: 0 (σ = 0)
    duration: -1,514.625 (σ = 35.857)
    Memory: 134,107 (σ = 2,295.455)
    CPU: 29 (σ = 1.871)
    CPU percentage usage: 0.972 (σ = 0.044)
    Frames: 1.5 (σ = 0.866)
    Nodes: 14,108.5 (σ = 129.038)
    LayoutCount: 3.75 (σ = 0.433)
    LayoutDuration: 0.213 (σ = 0.017)
    RecalcStyleCount: 2 (σ = 0)
    RecalcStyleDuration: 0.1 (σ = 0.024)

content-visibility (no virtualization) https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility:

    Min: 11.61 fps (σ = 1.412)
    Max: 56.625 fps (σ = 0.375)
    Median: 52.908 fps (σ = 0.215)
    Mean: 45.964 fps (σ = 0.244)
    renders: 0 (σ = 0)
    duration: -1,262.65 (σ = 28.652)
    Memory: 133,174 (σ = 171.219)
    CPU: 27.75 (σ = 2.385)
    CPU percentage usage: 1.01 (σ = 0.037)
    Frames: 1 (σ = 0)
    Nodes: 14,035 (σ = 1.732)
    LayoutCount: 56.5 (σ = 3.5)
    LayoutDuration: 1.008 (σ = 0.05)
    RecalcStyleCount: 54.5 (σ = 3.5)
    RecalcStyleDuration: 0.245 (σ = 0.007)

af-virtual-scroll https://github.com/nowaalex/af-virtual-scroll:

    Min: 7.555 fps (σ = 0.877)
    Max: 56.439 fps (σ = 0.405)
    Median: 53.105 fps (σ = 0.715)
    Mean: 45.498 fps (σ = 0.687)
    renders: 824.25 (σ = 73.162)
    duration: 1,955.5 (σ = 36.732)
    Memory: 133,952 (σ = 1,016.102)
    CPU: 36 (σ = 1.581)
    CPU percentage usage: 0.92 (σ = 0.025)
    Frames: 1 (σ = 0)
    Nodes: 5,150 (σ = 4,966.282)
    LayoutCount: 58.25 (σ = 13.809)
    LayoutDuration: 0.259 (σ = 0.019)
    RecalcStyleCount: 57 (σ = 14.053)
    RecalcStyleDuration: 0.142 (σ = 0.01)

react-recycled-scrolling https://github.com/sarons/react-recycled-scrolling:

    Min: 6.637 fps (σ = 0.29)
    Max: 56.698 fps (σ = 0.32)
    Median: 53.016 fps (σ = 0.147)
    Mean: 45.481 fps (σ = 0.484)
    renders: 838 (σ = 37.39)
    duration: 1,985.8 (σ = 10.022)
    Memory: 132,670 (σ = 280.991)
    CPU: 35 (σ = 1.581)
    CPU percentage usage: 0.964 (σ = 0.008)
    Frames: 1 (σ = 0)
    Nodes: 601.5 (σ = 334.773)
    LayoutCount: 50.25 (σ = 6.978)
    LayoutDuration: 0.267 (σ = 0.01)
    RecalcStyleCount: 49 (σ = 6.819)
    RecalcStyleDuration: 0.15 (σ = 0.005)

react-virtual https://github.com/tannerlinsley/react-virtual:

    Min: 8.249 fps (σ = 0.86)
    Max: 55.792 fps (σ = 0.164)
    Median: 51.858 fps (σ = 0.276)
    Mean: 43.604 fps (σ = 0.67)
    renders: 1,262.75 (σ = 244.301)
    duration: 1,952.175 (σ = 19.748)
    Memory: 132,832 (σ = 401.368)
    CPU: 35.25 (σ = 2.861)
    CPU percentage usage: 0.954 (σ = 0.012)
    Frames: 1 (σ = 0)
    Nodes: 6,780 (σ = 6,420.16)
    LayoutCount: 61.25 (σ = 11.211)
    LayoutDuration: 0.247 (σ = 0.008)
    RecalcStyleCount: 60.25 (σ = 11.211)
    RecalcStyleDuration: 0.128 (σ = 0.006)

react-window https://github.com/bvaughn/react-window:

    Min: 6.426 fps (σ = 0.693)
    Max: 56.3 fps (σ = 0.581)
    Median: 53.265 fps (σ = 0.127)
    Mean: 45.897 fps (σ = 0.425)
    renders: 766 (σ = 32.311)
    duration: 2,156.1 (σ = 56.08)
    Memory: 135,741 (σ = 2,952.16)
    CPU: 31.75 (σ = 2.947)
    CPU percentage usage: 0.947 (σ = 0.019)
    Frames: 1 (σ = 0)
    Nodes: 4,343.5 (σ = 3,484.459)
    LayoutCount: 43.25 (σ = 2.487)
    LayoutDuration: 0.278 (σ = 0.009)
    RecalcStyleCount: 42 (σ = 2.449)
    RecalcStyleDuration: 0.152 (σ = 0.007)

recylerlistview https://github.com/Flipkart/recyclerlistview:

    Min: 32.083 fps (σ = 10.074)
    Max: 55.89 fps (σ = 0.199)
    Median: 53.199 fps (σ = 0.292)
    Mean: 53.086 fps (σ = 0.27)
    renders: 0 (σ = 0)
    duration: NaN (σ = NaN)
    Memory: 132,371 (σ = 134.145)
    CPU: 36.25 (σ = 1.479)
    CPU percentage usage: 0.151 (σ = 0.003)
    Frames: 1 (σ = 0)
    Nodes: 43 (σ = 0)
    LayoutCount: 3.25 (σ = 0.433)
    LayoutDuration: 0.001 (σ = 0)
    RecalcStyleCount: 2 (σ = 0)
    RecalcStyleDuration: 0.001 (σ = 0)
```
