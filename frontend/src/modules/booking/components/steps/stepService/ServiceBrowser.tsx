import ServiceFilters from "./ServiceFilter";
import ServiceList from "./ServiceList";

export default function ServiceBrowser({ booking }: any) {
  return (
    <div className="space-y-4">
      <ServiceFilters />
      <ServiceList booking={booking} />
    </div>
  );
}
