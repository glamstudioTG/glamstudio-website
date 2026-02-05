import { BookingDraft, BookingResponse } from "../../types/booking.types";
import { httpClient } from "@/src/lib/http/http-client";
import { minutesToTime } from "../../utils/time";

export const BookingApi = {
  create(draft: BookingDraft): Promise<BookingResponse> {
    if (
      !draft.date ||
      !draft.time ||
      !draft.selectedWorker ||
      !draft.userInfo
    ) {
      throw new Error("Booking incompleto");
    }

    return httpClient.request<BookingResponse>("booking", "POST", {
      workerId: draft.selectedWorker.id,
      serviceIds: draft.services.map((s) => s.id),
      date: draft.date.toISOString().slice(0, 10),
      startTime: draft.time,
      name: draft.userInfo.name,
      email: draft.userInfo.email,
      phone: draft.userInfo.phone,
      comment: draft.userInfo.note,
    });
  },

  cancel(id: string) {
    return httpClient.request(`booking/${id}/cancel`, "PATCH");
  },
};
