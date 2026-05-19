import { getAPI } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export const usePunchIn = () => {
  return useMutation({
    mutationKey: ['punch-in'],
    mutationFn: async (payload?: Record<string, any>) => {
      const { data } = await getAPI('user').post(
        '/attendance/punch-in',
        payload
      );

      return data;
    },
  });
};