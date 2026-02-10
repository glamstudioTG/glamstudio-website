import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminUsersService } from "../../services/admin-users.service";
import { adminQueryKeys } from "../queryKeys";

export function useChangeUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      role,
    }: {
      userId: string;
      role: "CLIENT" | "WORKER" | "ADMIN";
    }) => AdminUsersService.changeRole(userId, role),

    onSuccess: (_, variables) => {
      queryClient.setQueryData(adminQueryKeys.users, (old: any[]) =>
        old?.map((u) =>
          u.id === variables.userId ? { ...u, role: variables.role } : u,
        ),
      );
    },
  });
}
