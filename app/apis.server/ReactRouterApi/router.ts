function compilePathToRegex(path: string) {
  const paramNames: string[] = [];
  const regexPath = path
    .replace(/:(\w+)\?/g, (_, paramName) => {
      paramNames.push(paramName);
      return "(?<" + paramName + ">[\\w-]*)?";
    }) // 可选参数
    .replace(/:(\w+)/g, (_, paramName) => {
      paramNames.push(paramName);
      return "(?<" + paramName + ">[^/]+)"; // 动态参数
    })
    .replace(/\*/g, ".*"); // 通配符
  return {
    regex: new RegExp(`^${regexPath}$`),
    paramNames,
  };
}

type RRoute = {
  path: string;
  handler: (...args: any[]) => any;
  method: string;
};

export class Router {
  name = "router";
  private regexCache = new Map<
    string,
    { regex: RegExp; paramNames: string[] }
  >();

  match(url: string, method: string, routes: RRoute[]) {
    const matched = [];

    // 首先根据静态路由和动态路由进行排序
    const sortedRoutes = routes.sort((a, b) => {
      // 静态路由（没有参数的）排在前面
      const isStaticA = !a.path.includes(":");
      const isStaticB = !b.path.includes(":");
      return isStaticA === isStaticB ? 0 : isStaticA ? -1 : 1;
    });

    for (const route of sortedRoutes) {
      if (route.method !== method) {
        // find all middleware route
        if (route.method === "ALL") {
          if (url.startsWith(route.path)) {
            matched.push({ handler: route.handler, params: {} });
          }
        }
        continue;
      }

      // match all normal route

      let compiled = this.regexCache.get(route.path);
      if (!compiled) {
        compiled = compilePathToRegex(route.path);
        this.regexCache.set(route.path, compiled);
      }

      const match = url.match(compiled.regex);
      if (match) {
        const params: any = {};
        if (compiled.paramNames) {
          compiled.paramNames.forEach((name) => {
            params[name] = match.groups?.[name] || null;
          });
        }
        matched.push({ handler: route.handler, params });
      }
    }
    return matched.length ? matched : null;
  }
}
