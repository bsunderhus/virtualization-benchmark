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
AFVirtualScroll:

    Min: 11.684 fps (σ = 0.396)
    Max: 57.604 fps (σ = 0.831)
    Median: 52.957 fps (σ = 0.284)
    Mean: 45.604 fps (σ = 0.296)
    renders: 996.25 (σ = 4.918)
    duration: 1,890.5 (σ = 12.346)
    Memory: 159,355 (σ = 1,431.806)
    CPU: 33.5 (σ = 2.598)
    Frames: 1 (σ = 0)
    Nodes: 6,497.5 (σ = 5,102.54)
    LayoutCount: 99 (σ = 5.244)
    LayoutDuration: 0.197 (σ = 0.015)
    RecalcStyleCount: 97.25 (σ = 5.449)
    RecalcStyleDuration: 0.116 (σ = 0.006)

ContentVisibility:

    Min: 2.468 fps (σ = 0.039)
    Max: 57.069 fps (σ = 0.213)
    Median: 53.337 fps (σ = 0.317)
    Mean: 46.318 fps (σ = 0.28)
    renders: 1,000 (σ = 0)
    duration: 289.8 (σ = 13.744)
    Memory: 159,008 (σ = 3,785.155)
    CPU: 29.5 (σ = 3.571)
    Frames: 1 (σ = 0)
    Nodes: 14,034 (σ = 0)
    LayoutCount: 77.5 (σ = 3.041)
    LayoutDuration: 0.912 (σ = 0.014)
    RecalcStyleCount: 75.5 (σ = 3.041)
    RecalcStyleDuration: 0.15 (σ = 0.007)

Native:

    Min: 1.565 fps (σ = 0.178)
    Max: 57.6 fps (σ = 0.134)
    Median: 53.351 fps (σ = 0.121)
    Mean: 50.385 fps (σ = 0.61)
    renders: 1,000 (σ = 0)
    duration: 304.7 (σ = 29.279)
    Memory: 157,160 (σ = 1,680.578)
    CPU: 29 (σ = 2.121)
    Frames: 1 (σ = 0)
    Nodes: 14,034 (σ = 0)
    LayoutCount: 3.5 (σ = 0.5)
    LayoutDuration: 0.151 (σ = 0.033)
    RecalcStyleCount: 2 (σ = 0)
    RecalcStyleDuration: 0.057 (σ = 0.009)

ReactRecycledScrolling:

    Min: 9.9 fps (σ = 0.457)
    Max: 56.856 fps (σ = 0.271)
    Median: 52.696 fps (σ = 0.276)
    Mean: 45.444 fps (σ = 0.262)
    renders: 999 (σ = 1.732)
    duration: 1,881.675 (σ = 9.429)
    Memory: 156,620 (σ = 619.839)
    CPU: 30.5 (σ = 3.202)
    Frames: 1 (σ = 0)
    Nodes: 2,706.25 (σ = 272.915)
    LayoutCount: 99.5 (σ = 2.5)
    LayoutDuration: 0.204 (σ = 0.006)
    RecalcStyleCount: 97.5 (σ = 2.5)
    RecalcStyleDuration: 0.122 (σ = 0.003)

ReactVirtual:

    Min: 9.222 fps (σ = 0.208)
    Max: 57.063 fps (σ = 0.451)
    Median: 52.783 fps (σ = 0.245)
    Mean: 43.904 fps (σ = 0.212)
    renders: 2,101.75 (σ = 22.185)
    duration: 1,987.275 (σ = 12.61)
    Memory: 153,529 (σ = 1,272.797)
    CPU: 32.5 (σ = 4.387)
    Frames: 1 (σ = 0)
    Nodes: 3,370 (σ = 1,342.224)
    LayoutCount: 99.5 (σ = 1.5)
    LayoutDuration: 0.203 (σ = 0.008)
    RecalcStyleCount: 97.75 (σ = 1.09)
    RecalcStyleDuration: 0.114 (σ = 0.003)

ReactWindow:

    Min: 10.162 fps (σ = 1.194)
    Max: 57.091 fps (σ = 0.418)
    Median: 52.987 fps (σ = 0.4)
    Mean: 45.449 fps (σ = 0.368)
    renders: 986.5 (σ = 23.415)
    duration: 2,064.675 (σ = 5.923)
    Memory: 157,185 (σ = 1,243.596)
    CPU: 34 (σ = 4.583)
    Frames: 1 (σ = 0)
    Nodes: 6,825 (σ = 3,729.075)
    LayoutCount: 83.5 (σ = 9.605)
    LayoutDuration: 0.216 (σ = 0.008)
    RecalcStyleCount: 81.5 (σ = 9.605)
    RecalcStyleDuration: 0.124 (σ = 0.008)

RecyclerListView:

    Min: 7.902 fps (σ = 0.547)
    Max: 56.671 fps (σ = 0.336)
    Median: 52.968 fps (σ = 0.203)
    Mean: 46.612 fps (σ = 0.261)
    renders: 1,000 (σ = 0)
    duration: 1,841.475 (σ = 9.749)
    Memory: 157,368 (σ = 806.489)
    CPU: 32 (σ = 3)
    Frames: 1 (σ = 0)
    Nodes: 1,283 (σ = 2)
    LayoutCount: 88.25 (σ = 2.278)
    LayoutDuration: 0.154 (σ = 0.006)
    RecalcStyleCount: 86.25 (σ = 2.278)
    RecalcStyleDuration: 0.083 (σ = 0.006)
```
