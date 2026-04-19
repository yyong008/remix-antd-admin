export function getBaseUrl() {
  return import.meta.env.VITE_BASE_URL || "http://localhost:5173";
}
