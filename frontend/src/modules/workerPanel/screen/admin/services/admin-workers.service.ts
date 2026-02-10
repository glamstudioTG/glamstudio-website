import { httpClient } from "@/src/lib/http/http-client";

export const AdminWorkersService = {
  deactivate(workerId: string) {
    return httpClient.request<void>(
      `/admin/workers/${workerId}/desactive`,
      "PATCH",
    );
  },
};
