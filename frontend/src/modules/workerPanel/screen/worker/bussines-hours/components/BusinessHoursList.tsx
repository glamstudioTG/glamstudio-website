"use client";

import { BusinessHour, DayOfWeek } from "../types/business-hours.types";
import BusinessHoursDay from "./BusinessHoursDay";
import { DAY_LABELS_ES } from "../utils/dayLabels";

const DAYS_ORDER: DayOfWeek[] = [
  DayOfWeek.MONDAY,
  DayOfWeek.TUESDAY,
  DayOfWeek.WEDNESDAY,
  DayOfWeek.THURSDAY,
  DayOfWeek.FRIDAY,
  DayOfWeek.SATURDAY,
  DayOfWeek.SUNDAY,
];

export default function BusinessHoursList({
  workerId,
  items,
}: {
  workerId: string;
  items: BusinessHour[];
}) {
  const grouped = items.reduce<Record<DayOfWeek, BusinessHour[]>>(
    (acc, item) => {
      acc[item.day] = acc[item.day] || [];
      acc[item.day].push(item);
      return acc;
    },
    {} as Record<DayOfWeek, BusinessHour[]>,
  );

  return (
    <div className="mt-6 flex flex-col items-center space-y-6">
      {DAYS_ORDER.map((day) => (
        <BusinessHoursDay
          key={day}
          day={day}
          items={grouped[day] ?? []}
          workerId={workerId}
        />
      ))}
    </div>
  );
}
