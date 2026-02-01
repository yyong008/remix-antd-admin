import { useMutation } from "@tanstack/react-query";

import { getApiClient } from "~/api-client";

export function useLogin() {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await getApiClient().api.auth.login.$post({ json: data });
      return res.json();
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await getApiClient().api.auth.register.$post({ json: data });
      return res.json();
    },
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const res = await getApiClient().api.auth.logout.$post();
      return res.json();
    },
  });
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await getApiClient().api.auth.refresh_token.$post({
        json: data,
      });
      return res.json();
    },
  });
}
