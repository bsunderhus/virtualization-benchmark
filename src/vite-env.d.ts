/// <reference types="vite/client" />

interface ImportMetaEnv {}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "af-virtual-scroll";

interface Window {
  __renders?: number;
  __fps?: number[];
  __start?: number;
  __firstRender?: number;
  __lastRender?: number;
  __setMode(mode?: any): void;
}

interface NumberConstructor {
  parseInt(string: string | number, radix?: number): number;
  parseFloat(value: number | string): number;
}
