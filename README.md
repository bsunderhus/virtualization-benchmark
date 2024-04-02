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
- react-virtuoso

## Running benchmark or site

- `pnpm`
- `pnpm build && mkdir results && pnpm benchmark ./results` - runs benchmark and store result in `results` directory
- `pnpm print-results ./results` - prints benchmark result
- `pnpm dev` - starts server, use http://localhost:3000

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
Native (no virtualization) :

    Min: 17.645 fps (σ = 2.36)
    Max: 55.891 fps (σ = 0.335)
    Median: 50.054 fps (σ = 1.354)
    Mean: 44.362 fps (σ = 0.668)
    renders: 0 (σ = 0)
    duration: -472.95 (σ = 21.328)
    Memory: 138,219 (σ = 649.501)
    CPU: 44.5 (σ = 5.545)
    CPU percentage usage: 1.337 (σ = 0.072)
    Frames: 1.25 (σ = 0.433)
    Nodes: 14,045.5 (σ = 12.99)
    LayoutCount: 4 (σ = 0)
    LayoutDuration: 0.265 (σ = 0.031)
    RecalcStyleCount: 2 (σ = 0)
    RecalcStyleDuration: 0.073 (σ = 0.001)
    WhitespaceAmount: 706,580.289 (σ = 734.166)

content-visibility (no virtualization) https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility:

    Min: 10.963 fps (σ = 1.81)
    Max: 56.905 fps (σ = 0.475)
    Median: 52.192 fps (σ = 0.206)
    Mean: 38.815 fps (σ = 1.354)
    renders: 0 (σ = 0)
    duration: -468.925 (σ = 43.765)
    Memory: 138,846 (σ = 1,804.121)
    CPU: 48.25 (σ = 5.403)
    CPU percentage usage: 1.412 (σ = 0.062)
    Frames: 1 (σ = 0)
    Nodes: 14,037 (σ = 1.732)
    LayoutCount: 36.75 (σ = 0.433)
    LayoutDuration: 0.706 (σ = 0.052)
    RecalcStyleCount: 35 (σ = 0.707)
    RecalcStyleDuration: 0.189 (σ = 0.008)
    WhitespaceAmount: 730,753.488 (σ = 28,365.472)

af-virtual-scroll https://github.com/nowaalex/af-virtual-scroll:

    Min: 14.422 fps (σ = 2.088)
    Max: 56.718 fps (σ = 0.434)
    Median: 53.449 fps (σ = 0.322)
    Mean: 45.027 fps (σ = 1.009)
    renders: 0 (σ = 0)
    duration: -285.85 (σ = 57.139)
    Memory: 139,446 (σ = 1,293.586)
    CPU: 42 (σ = 8.124)
    CPU percentage usage: 1.085 (σ = 0.023)
    Frames: 1 (σ = 0)
    Nodes: 14,040 (σ = 0)
    LayoutCount: 5.75 (σ = 0.433)
    LayoutDuration: 0.153 (σ = 0.026)
    RecalcStyleCount: 4 (σ = 0)
    RecalcStyleDuration: 0.101 (σ = 0.024)
    WhitespaceAmount: 706,589.112 (σ = 42,893.84)

react-recycled-scrolling https://github.com/sarons/react-recycled-scrolling:

    Min: 6.031 fps (σ = 0.31)
    Max: 55.745 fps (σ = 0.733)
    Median: 54.225 fps (σ = 0.518)
    Mean: 38.397 fps (σ = 0.829)
    renders: 609.5 (σ = 51.602)
    duration: 1,368.525 (σ = 28.364)
    Memory: 141,871 (σ = 248.618)
    CPU: 40.75 (σ = 8.814)
    CPU percentage usage: 1.337 (σ = 0.048)
    Frames: 1 (σ = 0)
    Nodes: 4,679.75 (σ = 527.285)
    LayoutCount: 25.5 (σ = 1.5)
    LayoutDuration: 0.176 (σ = 0.008)
    RecalcStyleCount: 23.5 (σ = 1.5)
    RecalcStyleDuration: 0.101 (σ = 0.003)
    WhitespaceAmount: 706,864.364 (σ = 869.178)

react-virtual https://github.com/tannerlinsley/react-virtual:

    Min: 6.444 fps (σ = 0.509)
    Max: 54.798 fps (σ = 0.158)
    Median: 52.759 fps (σ = 0.204)
    Mean: 36.704 fps (σ = 0.622)
    renders: 536 (σ = 42.042)
    duration: 1,325.65 (σ = 22.365)
    Memory: 143,037 (σ = 1,878.019)
    CPU: 44.5 (σ = 7.632)
    CPU percentage usage: 1.302 (σ = 0.02)
    Frames: 1 (σ = 0)
    Nodes: 5,352 (σ = 1,106.864)
    LayoutCount: 29.25 (σ = 1.639)
    LayoutDuration: 0.18 (σ = 0.007)
    RecalcStyleCount: 27.5 (σ = 1.658)
    RecalcStyleDuration: 0.097 (σ = 0.007)
    WhitespaceAmount: 706,791.068 (σ = 851.088)

react-window https://github.com/bvaughn/react-window:

    Min: 7.161 fps (σ = 0.929)
    Max: 55.373 fps (σ = 0.333)
    Median: 53.003 fps (σ = 0.605)
    Mean: 39.424 fps (σ = 0.389)
    renders: 541 (σ = 52.521)
    duration: 1,368.2 (σ = 19.659)
    Memory: 142,027 (σ = 466.454)
    CPU: 39.5 (σ = 6.103)
    CPU percentage usage: 1.219 (σ = 0.026)
    Frames: 1 (σ = 0)
    Nodes: 4,112 (σ = 268.233)
    LayoutCount: 26.75 (σ = 2.046)
    LayoutDuration: 0.155 (σ = 0.007)
    RecalcStyleCount: 25 (σ = 2.121)
    RecalcStyleDuration: 0.089 (σ = 0.007)
    WhitespaceAmount: 778,973.388 (σ = 21,900.142)

recylerlistview https://github.com/Flipkart/recyclerlistview:

    Min: 4.439 fps (σ = 0.525)
    Max: 55.951 fps (σ = 0.84)
    Median: 53.608 fps (σ = 0.325)
    Mean: 41.491 fps (σ = 0.712)
    renders: 831.5 (σ = 59.252)
    duration: 1,258.625 (σ = 49.727)
    Memory: 141,869 (σ = 82.189)
    CPU: 50.75 (σ = 8.437)
    CPU percentage usage: 1.32 (σ = 0.133)
    Frames: 1 (σ = 0)
    Nodes: 1,281 (σ = 6.124)
    LayoutCount: 19.25 (σ = 0.829)
    LayoutDuration: 0.175 (σ = 0.011)
    RecalcStyleCount: 17.5 (σ = 1.118)
    RecalcStyleDuration: 0.086 (σ = 0.004)
    WhitespaceAmount: 751,938.714 (σ = 23,904.213)

Resembli https://www.resembli.com/docs/react-virtualized-window/list:

    Min: 7.27 fps (σ = 0.306)
    Max: 55.968 fps (σ = 0.507)
    Median: 53.727 fps (σ = 0.388)
    Mean: 37.221 fps (σ = 0.557)
    renders: 478.25 (σ = 26.864)
    duration: 1,330.475 (σ = 22.419)
    Memory: 141,959 (σ = 412.944)
    CPU: 43.75 (σ = 6.3)
    CPU percentage usage: 1.319 (σ = 0.025)
    Frames: 1 (σ = 0)
    Nodes: 6,484 (σ = 1,865.236)
    LayoutCount: 35.75 (σ = 1.479)
    LayoutDuration: 0.184 (σ = 0.005)
    RecalcStyleCount: 33.75 (σ = 1.479)
    RecalcStyleDuration: 0.1 (σ = 0.003)
    WhitespaceAmount: 706,834.817 (σ = 868.551)
```
