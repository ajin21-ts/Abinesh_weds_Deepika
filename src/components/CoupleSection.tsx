import Image from "next/image";
import { wedding } from "@/config/wedding";
import type { Person } from "@/types/wedding";
import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";
import { Lotus } from "./ornaments/Lotus";

function Profile({ person, role, align }: { person: Person; role: string; align: "left" | "right" }) {
  const right = align === "right";
  return (
    <article className={`flex flex-col items-center text-center ${right ? "md:items-start md:text-left" : "md:items-end md:text-right"}`}>
      <Reveal className="relative w-[min(78vw,20rem)]">
        {/* Offset hairline arch behind the portrait */}
        <div aria-hidden className={`arch absolute inset-0 border border-gold/50 ${right ? "translate-x-3 translate-y-3" : "-translate-x-3 translate-y-3"}`} />
        <div className="arch relative aspect-[3/4] bg-sandal">
          <Image
            src={person.portrait}
            alt={`${person.fullName}, ${role.toLowerCase()}`}
            fill
            sizes="(min-width: 768px) 20rem, 78vw"
            className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-silk)] hover:scale-[1.04]"
          />
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 max-w-sm">
        <p className="font-display text-lg italic text-gold-deep">{role}</p>
        <h3 className="mt-1 text-5xl font-light text-maroon md:text-6xl">{person.fullName}</h3>
        <p className="mt-2 font-display text-xl tracking-wide text-ink-soft">{person.qualification}</p>

        <div className="mt-7 space-y-5 text-[0.98rem] leading-relaxed">
          {person.grandparents.length > 0 && (
            <div>
              <p className="font-display text-base italic text-gold-deep">{person.grandparentsLine}</p>
              {person.grandparents.map((g, i) => (
                <p key={g}>
                  {i > 0 && <span className="block font-display italic text-ink-soft/70">and</span>}
                  {g}
                </p>
              ))}
            </div>
          )}
          <div>
            <p className="font-display text-base italic text-gold-deep">{person.parentsLine}</p>
            <p className="font-medium text-ink">{person.parents}</p>
          </div>
          <address className="not-italic text-ink-soft">
            {person.address.map((line, i) => (
              <span key={line}>
                {line}
                {i < person.address.length - 1 && <br />}
              </span>
            ))}
            {person.phone && (
              <>
                <br />
                <a href={`tel:${person.phone.replace(/\s+/g, "")}`} className="mt-1 inline-block text-maroon underline decoration-gold/50 underline-offset-4 hover:decoration-maroon">
                  {person.phone}
                </a>
              </>
            )}
          </address>
        </div>
      </Reveal>
    </article>
  );
}

export function CoupleSection() {
  return (
    <section id="couple" aria-labelledby="couple-title" className="section-pad bg-champagne/60">
      <div className="container-wedding">
        <SectionTitle id="couple-title" title="The Bride & Groom" kicker="மணமக்கள்" kickerLang="ta" />

        <div className="grid items-start gap-20 md:grid-cols-[1fr_auto_1fr] md:gap-10 lg:gap-16">
          <Profile person={wedding.groom} role="The Groom" align="left" />
          <div aria-hidden className="hidden h-full flex-col items-center pt-24 text-gold md:flex">
            <span className="w-px flex-1 bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
            <Lotus className="my-5 h-6 w-10" />
            <span className="w-px flex-1 bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
          </div>
          <Profile person={wedding.bride} role="The Bride" align="right" />
        </div>
      </div>
    </section>
  );
}
