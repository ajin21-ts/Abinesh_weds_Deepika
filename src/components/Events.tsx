import { wedding, mapsLink } from "@/config/wedding";
import { SectionTitle } from "./SectionTitle";
import { EventCard } from "./EventCard";

export function Events() {
  const { weddingEvent, receptionEvent, maps } = wedding;
  return (
    <section id="events" aria-labelledby="events-title" className="section-pad bg-sandal/50">
      <div className="container-wedding">
        <SectionTitle
          id="events-title"
          title="Wedding Celebrations"
          kicker="Two days, two gatherings"
          intro="We would be honoured by your presence at both."
        />
        <div className="grid gap-16 md:grid-cols-2 md:gap-10 lg:gap-16">
          <EventCard
            event={weddingEvent}
            mapUrl={mapsLink(maps.weddingMapUrl, `${weddingEvent.venueName}, ${weddingEvent.venueLines.join(", ")}`)}
          />
          <EventCard
            event={receptionEvent}
            delay={0.12}
            mapUrl={mapsLink(maps.receptionMapUrl, `${receptionEvent.venueName}, ${receptionEvent.venueLines.join(", ")}`)}
          />
        </div>
      </div>
    </section>
  );
}
