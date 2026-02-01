/// <reference types="@remix-run/node" />
import type packageJSON from '../package.json';

declare module 'js-export-excel';

declare global {
  const __APP_INFO__: {
    pkg: typeof packageJSON;
    lastBuildTime: string;
  };
}

