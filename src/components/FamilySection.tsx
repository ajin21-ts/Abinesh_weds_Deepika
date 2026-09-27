import { wedding } from "@/config/wedding";
import { Reveal } from "./Reveal";
import { JasmineStrand } from "./ornaments/Jasmine";

export function FamilySection() {
  const { family } = wedding;
  return (
    <section aria-labelledby="family-title" className="grain relative py-20 md:py-28">
      <div className="container-wedding flex flex-col items-center text-center">
        <Reveal className="text-gold/70">
          <JasmineStrand className="h-6 w-48" buds={9} />
        </Reveal>
        <Reveal delay={0.08}>
          <h2 id="family-title" className="mt-6 font-display text-3xl font-light italic text-maroon md:text-4xl">
            {family.title}
          </h2>
        </Reveal>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-16 gap-y-8">
          {family.members.map((m, i) => (
            <Reveal as="li" key={m.name} delay={0.12 + i * 0.08}>
              <p className="font-display text-3xl text-ink md:text-4xl">{m.name}</p>
              <p className="mt-1 text-sm text-ink-soft">{m.qualification}</p>
              <p className="mt-2 font-display text-lg italic text-gold-deep">{m.relation}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
