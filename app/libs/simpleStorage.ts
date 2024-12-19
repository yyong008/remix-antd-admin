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
  clearAllToken() {
    this.removeToken();
    this.removeRefreshToken();
  }
}

export const simpleStorage = new SimpleStorage();
