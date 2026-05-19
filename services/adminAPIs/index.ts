import { useMutation } from "@tanstack/react-query"
import { SignInPayload } from "./type";
import { getAPI, setAuthTokens } from "../../lib/api";

export const useAdminLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (payload: SignInPayload) => {
      const { data } = await getAPI('user', false).post('/users/tokens/issue', payload);
      setAuthTokens(data.access_token, data.refresh_token);
      return data;
    },
  });
};