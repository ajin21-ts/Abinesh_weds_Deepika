import { wedding } from "@/config/wedding";
import { Reveal } from "./Reveal";
import { DecorativeDivider } from "./DecorativeDivider";
import { KolamCorner } from "./ornaments/Kolam";
import { Lamp } from "./ornaments/Lamp";
import { JasmineStrand } from "./ornaments/Jasmine";

export function Welcome() {
  return (
    <section id="welcome" aria-labelledby="welcome-title" className="grain relative overflow-hidden section-pad">
      <KolamCorner className="absolute left-0 top-0 h-28 w-28 text-gold/35 md:h-40 md:w-40" />
      <KolamCorner flip="x" className="absolute right-0 top-0 h-28 w-28 text-gold/35 md:h-40 md:w-40" />

      <div className="container-wedding relative flex flex-col items-center text-center">
        <Reveal className="flex items-end gap-10 text-gold">
          <Lamp className="hidden h-24 w-10 sm:block" />
          <p lang="ta" className="font-tamil text-base text-gold-deep">சுப முகூர்த்தம்</p>
          <Lamp className="hidden h-24 w-10 sm:block" />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 font-display text-2xl italic text-ink-soft md:text-3xl">
            With the blessings of our families
          </p>
          <p className="mx-auto mt-3 max-w-md text-base text-ink-soft md:text-lg">
            we joyfully invite you to celebrate the wedding of
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <h2 id="welcome-title" className="mt-10 font-display font-light text-maroon">
            <span className="block text-[clamp(2.6rem,9vw,5.5rem)] leading-none">{wedding.groom.firstName}</span>
            <span className="my-2 block font-display text-3xl italic text-gold md:text-4xl" aria-hidden>
              &amp;
            </span>
            <span className="sr-only">and</span>
            <span className="block text-[clamp(2.6rem,9vw,5.5rem)] leading-none">{wedding.bride.firstName}</span>
          </h2>
        </Reveal>

        <DecorativeDivider className="mt-10" />

        <Reveal delay={0.1} className="mt-10 text-gold/70">
          <JasmineStrand className="h-6 w-56" />
        </Reveal>
      </div>
    </section>
  );
}
