import { useMutation } from "@tanstack/react-query";
import { AdminUsersService } from "../../services/admin-users.service";
import type { AdminFoundUser } from "../../types/user.types";

export function useSearchUserByEmail() {
  return useMutation<AdminFoundUser[], Error, string>({
    mutationFn: (email) => AdminUsersService.findByEmail(email),
    retry: false,
  });
}
