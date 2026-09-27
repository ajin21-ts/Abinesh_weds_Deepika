import type { WeddingEvent } from "@/types/wedding";

const TZ = "Asia/Kolkata";

/** 2026-11-11T09:15:00+05:30 → 20261111T034500Z (UTC basic format) */
function toUtcStamp(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** 2026-11-11T09:15:00+05:30 → 20261111T091500 (local wall time, for TZID) */
function toLocalStamp(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
  if (!m) throw new Error(`Invalid event date: ${iso}`);
  return `${m[1]}${m[2]}${m[3]}T${m[4]}${m[5]}${m[6]}`;
}

function describe(event: WeddingEvent): string {
  return `${event.name}: ${event.dateLabel}, ${event.timeLabel}\n${event.venueName}, ${event.venueLines.join(", ")}\n\nWe look forward to celebrating with you.`;
}

export function googleCalendarUrl(event: WeddingEvent): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.calendarTitle,
    // UTC stamps are unambiguous on every device; ctz makes Google display IST.
    dates: `${toUtcStamp(event.start)}/${toUtcStamp(event.end)}`,
    details: describe(event),
    location: event.calendarLocation,
    ctz: TZ,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** RFC 5545 text escaping */
function esc(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/** RFC 5545 line folding: max 75 octets per line, never splitting a character */
function fold(line: string): string {
  const enc = new TextEncoder();
  const out: string[] = [];
  let current = "";
  let bytes = 0;
  for (const ch of line) {
    const size = enc.encode(ch).length;
    const limit = out.length === 0 ? 75 : 74; // continuation lines start with a space
    if (bytes + size > limit) {
      out.push(current);
      current = "";
      bytes = 0;
    }
    current += ch;
    bytes += size;
  }
  out.push(current);
  return out.join("\r\n ");
}

export function buildIcs(event: WeddingEvent, now: Date = new Date()): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Abinesh and Deepika//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VTIMEZONE",
    `TZID:${TZ}`,
    "BEGIN:STANDARD",
    "DTSTART:19700101T000000",
    "TZOFFSETFROM:+0530",
    "TZOFFSETTO:+0530",
    "TZNAME:IST",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `UID:${event.id}-${toUtcStamp(event.start)}@abinesh-deepika-wedding`,
    `DTSTAMP:${toUtcStamp(now.toISOString())}`,
    `DTSTART;TZID=${TZ}:${toLocalStamp(event.start)}`,
    `DTEND;TZID=${TZ}:${toLocalStamp(event.end)}`,
    `SUMMARY:${esc(event.calendarTitle)}`,
    `DESCRIPTION:${esc(describe(event))}`,
    `LOCATION:${esc(event.calendarLocation)}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${esc(event.calendarTitle)} is tomorrow`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(fold).join("\r\n") + "\r\n";
}

function isIOS(): boolean {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

/**
 * Saves the .ics file.
 * - iOS Safari: a text/calendar data URI opens the native "Add to Calendar" sheet.
 * - Android / desktop: a Blob download, which Calendar apps and Outlook open.
 */
export function downloadIcs(event: WeddingEvent): void {
  const ics = buildIcs(event);

  if (isIOS()) {
    window.location.href = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
    return;
  }

  const filename = `${event.calendarTitle.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.ics`;
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
