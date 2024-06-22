import { configureStore } from "@reduxjs/toolkit";
import { dashboard } from "./features/apis/dashboard";
import { userInfo } from "~/lib/features/apis/userinfo";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [userInfo.reducerPath]: userInfo.reducer,
      [dashboard.reducerPath]: dashboard.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userInfo.middleware, dashboard.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
