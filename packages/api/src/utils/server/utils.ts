import dayjs from "dayjs";

export function noop() {}

export function identity<T>(value: T): T {
  return value;
}

export function formatDate(time: string, format = "YYYY-MM-DD HH:mm:ss") {
  return dayjs(time).format(format);
}

export function genFileListByName(name: string) {
  if (!name) {
    return [];
  }
  return [
    {
      uid: "uid",
      name,
      status: "done",
      url: name,
      response: {
        data: {
          name,
        },
      },
    },
  ];
}

export function extname(str: string) {
  var slug = str.split(/\/|\\/).slice(-1)[0];
  var idx = slug.lastIndexOf(".");
  if (idx <= 0) return "";
  var ext = slug.slice(idx);
  return ext;
}

export function getSearchParams(request: Request, name: string) {
  const r = new URL(request.url).searchParams.get(name);
  return r;
}

export function getSearchParamsPage(request: Request) {
  return Number(getSearchParams(request, "page") ?? 1);
}

export function getSearchParamsPageSize(request: Request) {
  return Number(getSearchParams(request, "pageSize") ?? 10);
}

export function getSearchParams$(request: Request, name: string) {
  return getSearchParams(request, name);
}

export function requestToSearchParamsObj(request: Request) {
  const obj: any = {};
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  searchParams.forEach((value, key) => {
    obj[`${key}`] = value;
  });

  return obj;
}

const getTodayTime = () => {
  const today = new Date();
  const startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
  const endTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
  return { startTime, endTime };
};

const getYesterdayTime = () => {
  const now = new Date();
  const y = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0);
  const startTime = new Date(y.getFullYear(), y.getMonth(), y.getDate(), 0, 0, 0);
  const endTime = new Date(y.getFullYear(), y.getMonth(), y.getDate(), 23, 59, 59);
  return { startTime, endTime };
};

export { getTodayTime, getYesterdayTime };