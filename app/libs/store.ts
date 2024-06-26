import { auth } from "~/libs/features/apis/auth";
import { configureStore } from "@reduxjs/toolkit";
import { dashboard } from "./features/apis/dashboard";
import { signIn } from "./features/apis/signin";
import { userInfo } from "~/libs/features/apis/userinfo";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [userInfo.reducerPath]: userInfo.reducer,
      [auth.reducerPath]: auth.reducer,
      [dashboard.reducerPath]: dashboard.reducer,
      [signIn.reducerPath]: signIn.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        userInfo.middleware,
        dashboard.middleware,
        auth.middleware,
        signIn.middleware,
      ),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
