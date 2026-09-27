import { CalendarDays, Clock, MapPin } from "lucide-react";
import type { WeddingEvent } from "@/types/wedding";
import { AddToCalendar } from "./AddToCalendar";
import { Reveal } from "./Reveal";
import { Lotus } from "./ornaments/Lotus";

interface Props {
  event: WeddingEvent;
  mapUrl: string;
  delay?: number;
}

export function EventCard({ event, mapUrl, delay = 0 }: Props) {
  return (
    <Reveal delay={delay} as="article" className="relative">
      {/* Outer hairline, offset — a double frame like a temple doorway */}
      <div aria-hidden className="pointer-events-none absolute -inset-2.5 rounded-t-[999px] rounded-b-sm border border-gold/35" />
      <div className="relative flex h-full rounded-t-[999px] rounded-b-sm flex-col items-center bg-jasmine px-6 pb-10 pt-16 text-center shadow-[0_30px_60px_-40px_rgba(112,31,43,0.45)] sm:px-10 md:pt-20">
        <Lotus className="h-6 w-10 text-gold" />
        <p lang="ta" className="mt-5 font-tamil text-sm text-gold-deep">
          {event.tamilName}
        </p>
        <h3 className="mt-1 text-5xl font-light text-maroon md:text-6xl">{event.name}</h3>
        <p className="mx-auto mt-4 max-w-xs font-display text-lg italic text-ink-soft">{event.note}</p>

        <span aria-hidden className="my-8 h-px w-16 bg-gold/60" />

        <dl className="w-full max-w-xs space-y-5 text-left">
          <div className="flex gap-4">
            <dt className="pt-1 text-gold-deep">
              <CalendarDays aria-hidden className="h-5 w-5" strokeWidth={1.3} />
              <span className="sr-only">Date</span>
            </dt>
            <dd>
              <span className="block font-display text-2xl leading-tight text-ink">{event.dateLabel}</span>
              <span className="text-sm text-ink-soft">{event.dayLabel}</span>
            </dd>
          </div>
          <div className="flex gap-4">
            <dt className="pt-1 text-gold-deep">
              <Clock aria-hidden className="h-5 w-5" strokeWidth={1.3} />
              <span className="sr-only">Time</span>
            </dt>
            <dd className="font-display text-2xl leading-tight text-ink">{event.timeLabel}</dd>
          </div>
          <div className="flex gap-4">
            <dt className="pt-1 text-gold-deep">
              <MapPin aria-hidden className="h-5 w-5" strokeWidth={1.3} />
              <span className="sr-only">Venue</span>
            </dt>
            <dd>
              <span className="block font-display text-2xl leading-tight text-ink">{event.venueName}</span>
              <span className="text-sm text-ink-soft">{event.venueLines.join(", ")}</span>
            </dd>
          </div>
        </dl>

        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
          <AddToCalendar event={event} />
          <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-line">
            <MapPin aria-hidden className="h-4 w-4" strokeWidth={1.5} />
            View Location
          </a>
        </div>
      </div>
    </Reveal>
  );
}
