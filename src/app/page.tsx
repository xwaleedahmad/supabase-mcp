import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ToolsShowcase from "@/components/ToolsShowcase";
import VideoShowcase from "@/components/VideoShowcase";

export default function Home() {
  return (
    <div className="bg-background relative mx-auto min-h-screen max-w-360">
      <AnimatedBackground />
      <main className="relative z-10 space-y-20 py-16 md:space-y-36 md:py-32">
        <Hero />
        <ToolsShowcase />
        <VideoShowcase />
        <Footer />
      </main>
    </div>
  );
}
