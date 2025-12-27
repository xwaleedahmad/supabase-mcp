"use client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const VideoShowcase = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 1,
  });
  const { ref: refVideo, inView: inViewVideo } = useInView({
    triggerOnce: true,
    threshold: 0.6,
  });

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {

      if (e.key.toLowerCase() === "f") {
        if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
          return;
        }
        e.preventDefault(); // Prevent default browser behavior for 'f'

        if (!document.fullscreenElement) {
          if (videoRef.current && isVideoPlaying) {
            videoRef.current.requestFullscreen().catch((err) => {
              console.error(`Unable to enter fullscreen: ${err.message}`);
            });
          }
        } else {
          document.exitFullscreen();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isVideoPlaying]);

  return (
    <section id="video" className="container mx-auto px-6">
      <div className="mx-auto max-w-6xl">
        <div
          ref={ref}
          className={`mb-12 text-center ${inView ? "animate-fade-up opacity-100" : "opacity-0"}`}
        >
          <Badge className="bg-secondary/20 text-primary border-primary/30 mb-4">
            Video Demo
          </Badge>
          <h2 className="mb-4 text-4xl leading-tight font-bold md:mb-6 md:text-5xl">
            See It In
            <br />
            <span className="gradient-text">Real Action</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg text-pretty md:text-xl md:text-balance">
            Watch a comprehensive walkthrough of the Supabase MCP Server
            features and capabilities
          </p>
        </div>

        <Card
          ref={refVideo}
          className={`bg-card/50 ${inViewVideo ? "animate-fade-up opacity-100" : "opacity-0"} border-primary/30 glow-accent relative mx-auto aspect-video max-w-5xl overflow-hidden`}
        >
          {isVideoPlaying ? (
            <>
              <button
                className="absolute top-2 right-3 z-10 cursor-pointer transition-transform hover:scale-110 active:scale-100"
                onClick={() => setIsVideoPlaying(false)}
              >
                <X className="size-4 md:size-5" />
              </button>
              <video
                ref={videoRef}
                src="https://res.cloudinary.com/waleedahmad/video/upload/v1766851010/Projects/supabase-mcp/supabase-mcp-full-demo_stv1uq.mp4"
                className="relative h-full w-full rounded-xl object-cover"
                autoPlay
                controls
                onEnded={() => setIsVideoPlaying(false)}
              />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div
                  onClick={() => setIsVideoPlaying(true)}
                  className="bg-primary/20 border-primary mx-auto mb-4 flex size-16 cursor-pointer items-center justify-center rounded-full border-2 transition-transform hover:scale-110 active:scale-100 md:size-20"
                >
                  <Play className="text-primary ml-1 size-8 md:size-10" />
                </div>
                <p className="text-muted-foreground text-sm">
                  Click to play demo video
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default VideoShowcase;
