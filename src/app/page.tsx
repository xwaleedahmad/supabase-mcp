import AnimatedBackground from "@/components/AnimatedBackground";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="bg-background mx-auto min-h-screen">
      <div>
        <AnimatedBackground />
        <main>
          <Hero />
        </main>
      </div>
    </div>
  );
}
