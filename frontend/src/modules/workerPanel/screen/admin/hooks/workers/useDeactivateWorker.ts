import { useMutation } from "@tanstack/react-query";
import { AdminWorkersService } from "../../services/admin-workers.service";

export function useDeactivateWorker() {
  return useMutation({
    mutationFn: AdminWorkersService.deactivate,
  });
}
