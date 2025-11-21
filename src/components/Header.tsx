import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Header = () => {
  return (
    <header className="border-border/50 backdrop-blur-xl fixed top-0 right-0 left-0 z-50 border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Image src="/favicon.png" width={32} height={32} alt="Logo" />
            MCP
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="#tools"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Tools
            </a>
            <a
              href="#video"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Video Overview
            </a>
          </nav>

          <Button
            variant="outline"
            className="bg-card/50 border-secondary/30 hover:bg-primary/5 hover:text-foreground text-foreground cursor-pointer transition-colors"
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
