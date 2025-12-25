"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github } from "lucide-react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

export default function Footer() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 1,
  });
  const { ref: cardRef, inView: cardInView } = useInView({
    triggerOnce: true,
    threshold: 0.6,
  });
  return (
    <section className="container mx-auto px-4">
      <div
        ref={ref}
        className={`mb-12 text-center ${inView ? "animate-fade-up opacity-100" : "opacity-0"}`}
      >
        <Badge className="bg-secondary/20 text-primary border-primary/30 mb-4">
          Open source
        </Badge>
        <h2 className="mb-4 text-4xl leading-tight font-bold md:mb-6 md:text-5xl">
          Ready to get started ?
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg text-balance md:text-xl">
          Explore the source code, contribute to the project, and start building
          with the Supabase MCP Server
        </p>
      </div>

      <div className="mx-auto max-w-lg">
        <Card
          ref={cardRef}
          className={`bg-card/50 border-primary/30 border ${cardInView ? "animate-fade-up opacity-100" : "opacity-0"} `}
        >
          <CardHeader className="pb-4! text-center">
            <CardTitle className="text-foreground flex items-center justify-center gap-2 text-xl md:text-2xl">
              <Github className="text-foreground size-5 md:size-6" />
              GitHub Repository
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-muted-foreground text-sm md:text-base">
              Access the complete source code integrate
              <br />
              MCP Server into your projects.
            </p>

            <div>
              <Link
                href="https://github.com/xwaleedahmad/supabase-mcp"
                target="_blank"
                rel="noopener noreferrer"
                className="focus:outline-none"
              >
                <Button className="hover:bg-accent text-background w-full cursor-pointer text-base transition-[scale,background-color] hover:scale-[102%] active:scale-95">
                  <Github className="text-background text-bold" />
                  View on GitHub
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
