export interface Person {
  firstName: string;
  fullName: string;
  qualification: string;
  portrait: string;
  parentsLine: string;
  parents: string;
  grandparentsLine: string;
  grandparents: string[];
  address: string[];
  phone?: string;
}

export interface WeddingEvent {
  id: string;
  name: string;
  tamilName: string;
  calendarTitle: string;
  /** ISO 8601 with +05:30 offset */
  start: string;
  end: string;
  dayLabel: string;
  dateLabel: string;
  timeLabel: string;
  venueName: string;
  venueLines: string[];
  calendarLocation: string;
  note: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface FamilyMember {
  name: string;
  qualification: string;
  relation: string;
}

export interface WeddingConfig {
  site: {
    title: string;
    description: string;
    ogImage: string;
    themeColor: string;
    enableIntroScreen: boolean;
    playMusicOnIntroOpen: boolean;
  };
  monogram: { first: string; second: string };
  groom: Person;
  bride: Person;
  weddingEvent: WeddingEvent;
  receptionEvent: WeddingEvent;
  family: { title: string; members: FamilyMember[] };
  maps: { weddingMapUrl: string; receptionMapUrl: string };
  gallery: GalleryImage[];
  hero: { image: string; imageAlt: string; focalPoint: string; tagline: string };
  songs: { src: string; title: string; loop: boolean; volume: number };
  invitationMessage: string;
  footer: { signOff: string; note: string };
}

export interface WishPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}
