import { wedding } from "@/config/wedding";
import { Monogram } from "./ornaments/Monogram";
import { Toranam } from "./ornaments/Toranam";
import { Lamp } from "./ornaments/Lamp";

export function Footer() {
  return (
    <footer className="kolam-dots relative overflow-hidden bg-maroon-deep pb-28 pt-0 text-ivory md:pb-20">
      <Toranam className="mx-auto block h-12 w-full max-w-4xl text-gold-muted/60" leaves={17} />
      <div className="container-wedding flex flex-col items-center pt-14 text-center">
        <Monogram className="h-16 w-14 text-2xl text-gold-muted" />
        <p className="mt-8 font-display font-light uppercase leading-[0.95] tracking-[0.08em]">
          <span className="block text-[clamp(2.4rem,8vw,4.5rem)]">{wedding.groom.firstName}</span>
          <span className="block font-display text-3xl normal-case italic text-gold-muted" aria-hidden>
            &amp;
          </span>
          <span className="sr-only">and</span>
          <span className="block text-[clamp(2.4rem,8vw,4.5rem)]">{wedding.bride.firstName}</span>
        </p>
        <p className="mt-6 font-display text-xl tracking-[0.3em] text-gold-muted">11 • 11 • 2026</p>
        <div className="mt-10 flex items-end gap-6 text-gold-muted/80">
          <Lamp className="h-14 w-6" />
          <p className="pb-1 font-display text-2xl italic">{wedding.footer.signOff}</p>
          <Lamp className="h-14 w-6" />
        </div>
        <p className="mt-12 text-xs text-ivory/55">{wedding.footer.note}</p>
      </div>
    </footer>
  );
}
