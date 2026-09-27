/**
 * ─────────────────────────────────────────────────────────────
 *  WEDDING CONFIGURATION — the only file you need to edit.
 *  Every component reads from here; nothing is duplicated.
 * ─────────────────────────────────────────────────────────────
 */

import type { WeddingConfig } from "@/types/wedding";

export const wedding: WeddingConfig = {
  site: {
    title: "Abinesh & Deepika | Wedding Invitation",
    description:
      "Join us in celebrating the wedding of Abinesh & Deepika on 11 November 2026.",
    ogImage: "/images/og-image.png",
    themeColor: "#701F2B",
    /** Show the "Open Invitation" cover screen before the site */
    enableIntroScreen: true,
    /** Start the song when a guest taps "Open Invitation" (a user gesture, so browsers allow it) */
    playMusicOnIntroOpen: true,
  },

  monogram: { first: "A", second: "D" },

  groom: {
    firstName: "Abinesh",
    fullName: "Abinesh M",
    qualification: "B.E",
    portrait: "/images/couple/groom.png",
    parentsLine: "Son of",
    parents: "Mr. Manikandan & Mrs. Bindhu Manikandan",
    grandparentsLine: "Grandson of",
    grandparents: [
      "Sri. Diwaharan & Smt. Ashoka",
      "Late Sri. Ganeshan & Late Smt. Sagunthala",
    ],
    address: ["Sai Bavan", "Monday Market", "Neyyoor (PO)", "Kanyakumari"],
    phone: "+91 9445864646",
  },

  bride: {
    firstName: "Deepika",
    fullName: "Deepika R",
    qualification: "B.Arch",
    portrait: "/images/couple/bride.png",
    parentsLine: "Daughter of",
    parents: "Mr. Ramesh & Mrs. Rama Ramesh",
    grandparentsLine: "",
    grandparents: [],
    address: ["Thirunagar", "Kalayarkovil PO", "Sivaganga"],
  },

  /** ISO strings with explicit +05:30 offset (India Standard Time) */
  weddingEvent: {
    id: "muhurtham",
    name: "Muhurtham",
    tamilName: "முகூர்த்தம்",
    calendarTitle: "Abinesh & Deepika Wedding",
    start: "2026-11-11T09:15:00+05:30",
    end: "2026-11-11T10:15:00+05:30",
    dayLabel: "Wednesday",
    dateLabel: "11 November 2026",
    timeLabel: "9:15 AM – 10:15 AM",
    venueName: "ABS Mahal",
    venueLines: ["Sivaganga"],
    calendarLocation: "ABS Mahal, Sivaganga, Tamil Nadu, India",
    note: "The sacred tying of the thali, blessed by elders and loved ones.",
  },

  receptionEvent: {
    id: "reception",
    name: "Reception",
    tamilName: "வரவேற்பு",
    calendarTitle: "Abinesh & Deepika Wedding Reception",
    start: "2026-11-13T18:30:00+05:30",
    /** Exact end time not given on the invitation — adjust if needed */
    end: "2026-11-13T21:30:00+05:30",
    dayLabel: "Friday",
    dateLabel: "13 November 2026",
    timeLabel: "6:30 PM onwards",
    venueName: "Xavier Community Hall",
    venueLines: ["Mankuzhy", "Monday Market"],
    calendarLocation:
      "Xavier Community Hall, Mankuzhy, Monday Market, Tamil Nadu, India",
    note: "An evening of dinner, music and celebration with family and friends.",
  },

  family: {
    title: "Sharing Happiness",
    members: [
      {
        name: "Dhivya M",
        qualification: "BSc. Nursing",
        relation: "Sister of the Groom",
      },
    ],
  },

  /**
   * Google Maps links. Paste exact share links when available
   * (Google Maps → Share → Copy link). Until then, these fall back
   * to a text search for the venue name — no invented coordinates.
   */
  maps: {
    weddingMapUrl: "",
    receptionMapUrl: "",
  },

  gallery: [
    {
      src: "/images/couple/couple-01.png",
      alt: "Abinesh and Deepika together",
      width: 1200,
      height: 1600,
    },
    {
      src: "/images/couple/couple-02.png",
      alt: "The couple smiling outdoors",
      width: 1600,
      height: 1067,
    },
    {
      src: "/images/couple/couple-03.png",
      alt: "A candid moment between Abinesh and Deepika",
      width: 1200,
      height: 1500,
    },
    {
      src: "/images/couple/couple-04.png",
      alt: "Abinesh and Deepika in traditional attire",
      width: 1600,
      height: 1067,
    },
    {
      src: "/images/couple/couple-05.png",
      alt: "The couple walking hand in hand",
      width: 1200,
      height: 1600,
    },
    {
      src: "/images/couple/couple-06.png",
      alt: "The couple walking hand in hand",
      width: 1200,
      height: 1600,
    },
    {
      src: "/images/couple/couple-07.png",
      alt: "The couple walking hand in hand",
      width: 1200,
      height: 1600,
    },
    {
      src: "/images/couple/couple-08.png",
      alt: "The couple walking hand in hand",
      width: 1200,
      height: 1600,
    },
    {
      src: "/images/couple/couple-09.png",
      alt: "The couple walking hand in hand",
      width: 1200,
      height: 1600,
    },
    {
      src: "/images/couple/couple-10.png",
      alt: "The couple walking hand in hand",
      width: 1200,
      height: 1600,
    },
    {
      src: "/images/couple/couple-11.png",
      alt: "The couple walking hand in hand",
      width: 1200,
      height: 1600,
    },
    {
      src: "/images/couple/couple-12.png",
      alt: "The couple walking hand in hand",
      width: 1200,
      height: 1600,
    },
    {
      src: "/images/couple/couple-13.png",
      alt: "The couple walking hand in hand",
      width: 1200,
      height: 1600,
    },
  ],

  hero: {
    image: "/images/couple/hero.png",
    imageAlt: "Abinesh and Deepika",
    /** CSS object-position — tune so both faces stay in frame on mobile */
    focalPoint: "50% 30%",
    tagline: "Two souls. One beautiful beginning.",
  },

  songs: {
    src: "/audio/wedding-song.mp3",
    title: "Our Song",
    loop: true,
    volume: 0.6,
  },

  invitationMessage:
    "With immense joy and the blessings of our families, we invite you to celebrate the beginning of our beautiful journey together.",

  footer: {
    signOff: "With Love & Blessings",
    note: "Made with love for our special day",
  },
};

/** Build a maps link from a configured URL or fall back to a name search. */
export function mapsLink(configuredUrl: string, query: string): string {
  if (configuredUrl.trim()) return configuredUrl.trim();
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function directionsLink(configuredUrl: string, query: string): string {
  // A share link already offers "Directions"; otherwise open route planning to the named venue.
  if (configuredUrl.trim()) return configuredUrl.trim();
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}
