import { wedding } from "@/config/wedding";
import { Reveal } from "./Reveal";
import { Toranam } from "./ornaments/Toranam";

export function InvitationMessage() {
  return (
    <section aria-label="Invitation" className="grain relative overflow-hidden pb-20 pt-0 md:pb-28">
      <Toranam className="mx-auto block h-12 w-full max-w-3xl text-sage md:h-14" leaves={15} />
      <div className="container-wedding">
        <Reveal className="mx-auto mt-14 max-w-3xl text-center">
          <p className="font-display text-[clamp(1.6rem,4.4vw,2.6rem)] font-light italic leading-[1.35] text-maroon">
            {wedding.invitationMessage}
          </p>
          <p className="mt-8 font-display text-lg text-gold-deep">Abinesh &amp; Deepika</p>
        </Reveal>
      </div>
    </section>
  );
}
