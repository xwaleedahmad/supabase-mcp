import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ToolsShowcase from "@/components/ToolsShowcase";
import VideoShowcase from "@/components/VideoShowcase";

export default function Home() {
  return (
    <div className="bg-background relative max-w-360 mx-auto min-h-screen">
      <AnimatedBackground />
      <main className="relative z-10 space-y-20 py-32 md:space-y-36">
        <Hero />
        <ToolsShowcase />
        <VideoShowcase />
        <Footer />
      </main>
    </div>
  );
}
