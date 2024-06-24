export const setLocalStorageToken = (token: string) =>
  localStorage.setItem("token", token);
export const getLocalStorageToken = () => localStorage.getItem("token");
export const removeLocalStorageToken = () => localStorage.removeItem("token");

export const setLocalStorageRefreshToken = (refresh_token: string) =>
  localStorage.setItem("refresh_token", refresh_token);
export const getLocalStorageRefreshToken = () =>
  localStorage.getItem("refresh_token");
export const removeLocalStorageRefreshToken = () =>
  localStorage.removeItem("refresh_token");
