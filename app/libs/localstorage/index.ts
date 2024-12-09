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

class SimpleStorage {
  setToken(token: string) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  removeToken() {
    localStorage.removeItem("token");
  }
  setRefreshToken(refresh_token: string) {
    localStorage.setItem("refresh_token", refresh_token);
  }
  getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }
  removeRefreshToken() {
    localStorage.removeItem("refresh_token");
  }
}

export const simpleStorage = new SimpleStorage();
