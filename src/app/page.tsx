import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { MastaweshaSection } from "@/components/album/MastaweshaSection";
import { SinglesSection } from "@/components/singles/SinglesSection";
import { ArtistrySection } from "@/components/artistry/ArtistrySection";
import { GallerySection } from "@/components/gallery/GallerySection";
import { ContactSection } from "@/components/contact/ContactSection";
import { GlobalAudioPlayer } from "@/components/common/GlobalAudioPlayer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#000000] selection:bg-white/20 selection:text-white overflow-x-hidden">
      {/* 1. Hero Section (with Parallax & Centered Mobile Face) */}
      <HeroSection />

      {/* 2. Biography & Background (With Verified Resume Facts & PDF Download) */}
      <AboutSection />

      {/* 3. Record-Breaking Singles (Ewedshalew, Enjori, Enja, Etu - 28M+ Impact) */}
      <SinglesSection />

      {/* 4. Featured Album Mastawesha (With Interactive 3D Three.js Vinyl & 14 Tracks) */}
      <MastaweshaSection />

      {/* 5. Triple-Threat Musicianship (3D Sound Sphere & Multi-Instrumental Stems) */}
      <ArtistrySection />

      {/* 6. Visual Archive & Live Performance Gallery (Curated Unique Moments & Lightbox) */}
      <GallerySection />

      {/* 7. Worldwide Booking & Representation Portal */}
      <ContactSection />

      {/* 8. Floating Persistent Global Player */}
      <GlobalAudioPlayer />
    </main>
  );
}
