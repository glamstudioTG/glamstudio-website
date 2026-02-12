import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "@/src/service/api/auth.api";
import type { AuthUser } from "@/src/hooks/auth/type";

type LoginVars = {
  email: string;
  password: string;
};

export function useLoginMutation() {
  return useMutation<AuthUser | null, Error, LoginVars>({
    mutationFn: ({ email, password }) => AuthApi.login(email, password),
  });
}

export function useRegisterMutation() {
  return useMutation<
    void,
    Error,
    {
      name: string;
      email: string;
      phone: string;
      password: string;
    }
  >({
    mutationFn: async (payload) => {
      await AuthApi.register(payload);
    },
  });
}
