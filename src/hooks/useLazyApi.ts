import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useState } from "react";

import axios, { AxiosError } from "axios";

import { env } from "@utils/env";

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export const api = axios.create({
  baseURL: env.API_URL,
});

export function useLazyApi<TData = unknown, TError = AxiosError>(
  endpoint: string,
  queryKey: string[]
): [() => void, UseQueryResult<TData, TError>] {
  const [enabled, setEnabled] = useState(false);

  const query = useQuery<TData, TError>({
    queryKey,
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<TData>>(endpoint);
      return data.data;
    },
    enabled,
  });

  const execute = () => {
    setEnabled(true);
  };

  return [execute, query];
}
