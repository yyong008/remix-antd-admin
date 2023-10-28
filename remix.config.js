/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  tailwind: true,
  serverDependenciesToBundle: ['remix-i18next', 'accept-language-parser', 'intl-parse-accept-language'],
  watchPaths: ['./tailwind.config.ts'],
  cacheDirectory: './node_modules/.cache/remix',
  future: {},
  browserNodeBuiltinsPolyfill: {
    modules: {
      path: true,
    }
  }
};
