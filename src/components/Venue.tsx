import { ExternalLink, MapPin, Navigation2 } from "lucide-react";
import { wedding, mapsLink, directionsLink } from "@/config/wedding";
import type { WeddingEvent } from "@/types/wedding";
import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";
import { KolamCorner } from "./ornaments/Kolam";

function VenueBlock({ label, event, configuredUrl, delay }: { label: string; event: WeddingEvent; configuredUrl: string; delay?: number }) {
  const query = `${event.venueName}, ${event.venueLines.join(", ")}`;
  return (
    <Reveal delay={delay} as="article" className="relative flex flex-col items-center px-4 py-12 text-center md:px-10">
      <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/50 text-maroon">
        <MapPin aria-hidden className="h-5 w-5" strokeWidth={1.3} />
      </span>
      <p className="mt-6 font-display text-lg italic text-gold-deep">{label}</p>
      <h3 className="mt-1 text-4xl font-light text-maroon md:text-5xl">{event.venueName}</h3>
      <address className="mt-3 not-italic text-ink-soft">
        {event.venueLines.map((l, i) => (
          <span key={l}>
            {l}
            {i < event.venueLines.length - 1 && <br />}
          </span>
        ))}
      </address>
      <p className="mt-4 text-sm text-ink-soft">
        {event.name}: {event.dayLabel}, {event.dateLabel}
      </p>
      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
        <a href={mapsLink(configuredUrl, query)} target="_blank" rel="noopener noreferrer" className="btn btn-line">
          <ExternalLink aria-hidden className="h-4 w-4" strokeWidth={1.5} />
          View on Google Maps
        </a>
        <a href={directionsLink(configuredUrl, query)} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
          <Navigation2 aria-hidden className="h-4 w-4" strokeWidth={1.5} />
          Get Directions
        </a>
      </div>
    </Reveal>
  );
}

export function Venue() {
  const { weddingEvent, receptionEvent, maps } = wedding;
  return (
    <section id="venue" aria-labelledby="venue-title" className="grain relative overflow-hidden section-pad">
      <KolamCorner flip="y" className="absolute bottom-0 left-0 h-32 w-32 text-gold/30 md:h-44 md:w-44" />
      <KolamCorner flip="xy" className="absolute bottom-0 right-0 h-32 w-32 text-gold/30 md:h-44 md:w-44" />
      <div className="container-wedding relative">
        <SectionTitle id="venue-title" title="Finding Your Way" kicker="Venues" />
        <div className="grid divide-y divide-gold/30 md:grid-cols-2 md:divide-x md:divide-y-0">
          <VenueBlock label="Wedding venue" event={weddingEvent} configuredUrl={maps.weddingMapUrl} />
          <VenueBlock label="Reception venue" event={receptionEvent} configuredUrl={maps.receptionMapUrl} delay={0.12} />
        </div>
      </div>
    </section>
  );
}
