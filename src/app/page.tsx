import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Welcome } from "@/components/Welcome";
import { CoupleSection } from "@/components/CoupleSection";
import { Countdown } from "@/components/Countdown";
import { InvitationMessage } from "@/components/InvitationMessage";
import { Events } from "@/components/Events";
import { Venue } from "@/components/Venue";
import { Gallery } from "@/components/Gallery";
import { FamilySection } from "@/components/FamilySection";
import { WishesForm } from "@/components/WishesForm";
import { Footer } from "@/components/Footer";
import { MusicPlayer } from "@/components/MusicPlayer";
import { IntroScreen } from "@/components/IntroScreen";
import { CursorRing } from "@/components/CursorRing";

export default function HomePage() {
  return (
    <>
      <IntroScreen />
      <Navigation />
      <main id="main">
        <Hero />
        <Welcome />
        <CoupleSection />
        <Countdown />
        <InvitationMessage />
        <Events />
        <Venue />
        <Gallery />
        <FamilySection />
        <WishesForm />
      </main>
      <Footer />
      <MusicPlayer />
      <CursorRing />
    </>
  );
}
