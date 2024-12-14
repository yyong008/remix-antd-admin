import { systemConfig } from "./config";
import { systemDeptApi } from "./dept";
import { systemDict } from "./dict";
import { systemDictItem } from "./dict-item";
import { systemMailTpl } from "./tools/mail-tpl";
import { systemMenu } from "./menu";
import { systemMenuRoleApi } from "./role/menu-role";
import { systemMonitorLoginlog } from "./monitor/login-log";
import { systemMonitorServe } from "./monitor/serve";
import { systemRoleApi } from "./role/role";
import { systemToolsStorage } from "./tools/storage";
import { systemUser } from "./user";

export const systemReducers = {
  [systemConfig.reducerPath]: systemConfig.reducer,
  [systemDeptApi.reducerPath]: systemDeptApi.reducer,
  [systemDict.reducerPath]: systemDict.reducer,
  [systemDictItem.reducerPath]: systemDictItem.reducer,
  [systemMailTpl.reducerPath]: systemMailTpl.reducer,
  [systemMenu.reducerPath]: systemMenu.reducer,
  [systemMenuRoleApi.reducerPath]: systemMenuRoleApi.reducer,
  [systemMonitorLoginlog.reducerPath]: systemMonitorLoginlog.reducer,
  [systemMonitorServe.reducerPath]: systemMonitorServe.reducer,
  [systemRoleApi.reducerPath]: systemRoleApi.reducer,
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
  systemMenuRoleApi.middleware,
  systemMonitorLoginlog.middleware,
  systemMonitorServe.middleware,
  systemRoleApi.middleware,
  systemToolsStorage.middleware,
  systemUser.middleware,
];
