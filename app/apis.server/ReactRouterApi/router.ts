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
  private regexCache = new Map<
    string,
    { regex: RegExp; paramNames: string[] }
  >();

  findRoute(url: string, method: string, routes: RRoute[]) {
    const matched = [];
    for (const route of routes) {
      if (route.method !== method) {
        if (route.method === "ALL") {
          if (url.startsWith(route.path)) {
            matched.push({ handler: route.handler, params: {} });
          }
        }
        continue;
      }

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
