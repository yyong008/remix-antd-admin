import { systemConfig } from "./config";
import { systemDeptApi } from "./dept";
import { systemDict } from "./dict";
import { systemDictItem } from "./dict-item";
import { systemMailTpl } from "./tools/mail-tpl";
import { systemMenu } from "./menu";
import { systemMenuRole } from "./role/menu-role";
import { systemMonitorLoginlog } from "./monitor/login-log";
import { systemMonitorServe } from "./monitor/serve";
import { systemRole } from "./role/role";
import { systemToolsStorage } from "./tools/storage";
import { systemUser } from "./user";

export const systemReducers = {
  [systemConfig.reducerPath]: systemConfig.reducer,
  [systemDeptApi.reducerPath]: systemDeptApi.reducer,
  [systemDict.reducerPath]: systemDict.reducer,
  [systemDictItem.reducerPath]: systemDictItem.reducer,
  [systemMailTpl.reducerPath]: systemMailTpl.reducer,
  [systemMenu.reducerPath]: systemMenu.reducer,
  [systemMenuRole.reducerPath]: systemMenuRole.reducer,
  [systemMonitorLoginlog.reducerPath]: systemMonitorLoginlog.reducer,
  [systemMonitorServe.reducerPath]: systemMonitorServe.reducer,
  [systemRole.reducerPath]: systemRole.reducer,
  [systemToolsStorage.reducerPath]: systemToolsStorage.reducer,
  [systemUser.reducerPath]: systemUser.reducer,
};

export const systemMiddlewares = [
  systemConfig.middleware,
  systemDeptApi.middleware,
  systemDict.middleware,
  systemDictItem.middleware,
  systemMailTpl.middleware,
  systemMenu.middleware,
  systemMenuRole.middleware,
  systemMonitorLoginlog.middleware,
  systemMonitorServe.middleware,
  systemRole.middleware,
  systemToolsStorage.middleware,
  systemUser.middleware,
];
