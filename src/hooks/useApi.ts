import { useQuery, UseQueryResult } from "@tanstack/react-query";

import axios, { AxiosError } from "axios";

import { env } from "@utils/env";

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

const api = axios.create({
  baseURL: env.API_URL,
});

export function useApi<TData = unknown, TError = AxiosError>(
  endpoint: string,
  queryKey: string[]
): UseQueryResult<TData, TError> {
  return useQuery<TData, TError>({
    queryKey,
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<TData>>(endpoint);
      return data.data;
    },
  });
}
