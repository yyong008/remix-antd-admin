export function getBaseUrl() {
  return import.meta.env.VITE_BASE_URL || "http://localhost:3001";
}

export function getApiUrl() {
  return import.meta.env.VITE_API_URL || "/api";
}
