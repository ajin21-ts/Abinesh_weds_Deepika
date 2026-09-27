import { Reveal } from "./Reveal";
import { DecorativeDivider } from "./DecorativeDivider";

interface Props {
  title: string;
  /** Short line in Tamil or a quiet subtitle shown above the title */
  kicker?: string;
  kickerLang?: string;
  intro?: string;
  tone?: "dark" | "light";
  id?: string;
}

export function SectionTitle({ title, kicker, kickerLang, intro, tone = "dark", id }: Props) {
  const light = tone === "light";
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
      {kicker && (
        <p
          lang={kickerLang}
          className={`mb-3 ${kickerLang === "ta" ? "font-tamil text-sm" : "font-display text-lg italic"} ${
            light ? "text-gold-muted" : "text-gold-deep"
          }`}
        >
          {kicker}
        </p>
      )}
      <h2
        id={id}
        className={`text-[2.6rem] font-light leading-[1.05] sm:text-5xl md:text-6xl ${light ? "text-ivory" : "text-maroon"}`}
      >
        {title}
      </h2>
      <DecorativeDivider className="mt-6" tone={light ? "light" : "gold"} />
      {intro && (
        <p className={`mx-auto mt-6 max-w-xl text-base ${light ? "text-ivory/80" : "text-ink-soft"}`}>{intro}</p>
      )}
    </Reveal>
  );
}
