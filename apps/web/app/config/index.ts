export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL ?? "http://localhost:3002",
  },
  admin: {
    url: import.meta.env.VITE_ADMIN_URL ?? "http://localhost:3001",
  },
  blog: {
    pageSize: 9,
  },
  news: {
    pageSize: 9,
  },
};
