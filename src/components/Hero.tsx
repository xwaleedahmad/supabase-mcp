"use client";
import { Copy, Check, Zap, Shield, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

const consoleCommands = [
  { command: "$ supabase-mcp --start", delay: 0 },
  { command: "> Connecting to Supabase instance...", delay: 1000 },
  {
    command: "> mcp.listTables({ schema: 'public' })",
    delay: 3000,
    color: "muted",
  },
  {
    command: "> mcp.createRecord({ table: 'users', data: {...} })",
    delay: 4000,
    color: "muted",
  },
  {
    command: "> mcp.query({ sql: 'SELECT * FROM users' })",
    delay: 5000,
    color: "muted",
  },
  { command: "✓ Processed successfully!", delay: 7000, color: "success" },
];

const Hero = () => {
  const [copied, setCopied] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const serverUrl = "https://mcp.supabase.io/server";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(serverUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const maxDelay = Math.max(...consoleCommands.map((cmd) => cmd.delay));
    const restartDelay = maxDelay + 2000;
    const activeTimeouts: Array<ReturnType<typeof setTimeout>> = [];
    let loopTimeout: ReturnType<typeof setTimeout> | null = null;

    const runSequence = () => {
      activeTimeouts.forEach(clearTimeout);
      activeTimeouts.length = 0;
      setVisibleLines(0);

      consoleCommands.forEach((cmd, index) => {
        const timeoutId = setTimeout(() => {
          setVisibleLines(index + 1);
        }, cmd.delay);
        activeTimeouts.push(timeoutId);
      });

      loopTimeout = setTimeout(runSequence, restartDelay);
    };

    runSequence();

    return () => {
      activeTimeouts.forEach(clearTimeout);
      if (loopTimeout) {
        clearTimeout(loopTimeout);
      }
    };
  }, []);

  return (
    <section className="container mx-auto px-6">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left side - Description */}
        <div className="animate-fade-right max-w-xl space-y-8">
          <div>
            <h1 className="mb-6 text-5xl leading-tight font-bold md:text-6xl lg:text-7xl">
              Supabase
              <br />
              <span className="gradient-text">MCP Server</span>{" "}
              <span className="wave inline-block">&#128075;</span>
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed text-balance">
              Seamlessly integrate powerful database operations into your
              applications with our Model Context Protocol server.
            </p>
          </div>

          <div>
            <label className="text-muted-foreground mb-3 block text-sm">
              Copy the server URL:
            </label>
            <div className="border-primary/30 bg-card/50 flex items-center gap-3 rounded-xl border py-2 ps-4 pe-2">
              <code className="text-foreground flex-1 font-mono text-sm break-all">
                {serverUrl}
              </code>
              <Button
                onClick={copyToClipboard}
                size="icon"
                variant="outline"
                className="hover:text-foreground shrink-0 cursor-pointer border-none bg-transparent transition-all hover:bg-transparent"
              >
                {copied ? (
                  <Check className="text-primary h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="bg-card/50 border-primary/30 flex cursor-default items-center gap-2 rounded-full border px-4 py-2 transition-transform duration-200 hover:scale-105">
              <Zap className="text-primary h-4 w-4" />
              <span className="text-foreground text-sm">Lightning Fast</span>
            </div>
            <div className="bg-card/50 border-primary/30 flex cursor-default items-center gap-2 rounded-full border px-4 py-2 transition-transform duration-200 hover:scale-105">
              <Shield className="text-primary h-4 w-4" />
              <span className="text-foreground text-sm">Secure</span>
            </div>
            <div className="bg-card/50 border-primary/30 flex cursor-default items-center gap-2 rounded-full border px-4 py-2 transition-transform duration-200 hover:scale-105">
              <Wrench className="text-primary h-4 w-4" />
              <span className="text-foreground text-sm">Easy Setup</span>
            </div>
          </div>
        </div>

        {/* Right side - Console demo */}
        <div className="animate-fade-left w-full max-w-2xl lg:ml-auto">
          <Card className="glass-card border-primary/30 bg-transparent py-4 md:p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  Database Operations
                </Badge>
                <span className="text-foreground text-sm font-semibold">
                  7 Tools
                </span>
              </div>
            </div>

            <Card className="bg-card/50 border-primary/20 mb-4 p-1">
              <div className="border-secondary/30 flex items-center justify-between border-b px-4 py-2">
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <span className="text-primary">❯</span> MCP Server Console
                </h3>
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="bg-primary h-3 w-3 rounded-full"></div>
                </div>
              </div>
              <div className="min-h-[250px] space-y-2 p-4 font-mono text-xs sm:text-sm">
                <div className="text-primary">$ mcp-server --live-demo</div>
                {consoleCommands.slice(0, visibleLines).map((cmd, index) => (
                  <div
                    key={index}
                    className={`animate-fade ${
                      cmd.color === "success"
                        ? "text-primary"
                        : cmd.color === "muted"
                          ? "text-muted-foreground"
                          : "text-foreground"
                    }`}
                  >
                    {cmd.command}
                  </div>
                ))}
                {visibleLines > 0 && visibleLines < consoleCommands.length && (
                  <div className="flex items-center gap-2 text-yellow-500">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-500"></div>
                    <span>Processing...</span>
                  </div>
                )}
              </div>
            </Card>

            <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
              <div className="flex items-center gap-2">
                <div className="bg-primary h-2 w-2 animate-pulse rounded-full"></div>
                <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                  Success Rate
                </Badge>
                <span className="gradient-text text-xl font-bold">99.9%</span>
              </div>
              <Badge variant="outline" className="border-primary/30 text-xs">
                <span className="text-primary mr-2">
                  <Zap className="size-3 fill-yellow-500 text-yellow-500 md:size-4" />
                </span>
                Response Time ~50ms
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;
