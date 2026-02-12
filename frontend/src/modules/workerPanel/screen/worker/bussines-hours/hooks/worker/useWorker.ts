import { useQuery } from "@tanstack/react-query";
import { AdminWorkerService } from "../../services/worker.service";
import { adminQueryKeys } from "../queryKeys";
import { Worker } from "../../types/worker.types";

export function useWorker(workerId?: string) {
  return useQuery<Worker>({
    queryKey: workerId ? adminQueryKeys.worker(workerId) : [],
    queryFn: () => AdminWorkerService.getById(workerId!),
    enabled: !!workerId,

    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
}
