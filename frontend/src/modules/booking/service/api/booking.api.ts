import { BookingDraft } from "../../types/booking.types";
import { httpClient } from "@/src/lib/http/http-client";

export const BookingApi = {
  create(draft: BookingDraft) {
    return httpClient.request<{ id: string }>("booking", "POST", {
      workerId: draft.selectedWorker?.id,
      services: draft.services.map((s) => s.id),
      date: draft.date,
      time: draft.time,
      userInfo: draft.userInfo,
    });
  },

  cancel(id: string) {
    return httpClient.request(`booking/${id}/cancel`, "PATCH");
  },
};
