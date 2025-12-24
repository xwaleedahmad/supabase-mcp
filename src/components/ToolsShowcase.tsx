"use client";
import { Database, Search, Edit, Trash2, Plus, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useInView } from "react-intersection-observer";

const tools = [
  {
    icon: Plus,
    name: "Create Document",
    description: "Add new products",
    category: "Write",
  },
  {
    icon: Database,
    name: "List Documents",
    description: "Retrieve all products",
    category: "Query",
  },
  {
    icon: Search,
    name: "Get Document",
    description: "Find by criteria",
    category: "Query",
  },
  {
    icon: Edit,
    name: "Update Document",
    description: "Modify product details",
    category: "Write",
  },
  {
    icon: RefreshCw,
    name: "Upsert Document",
    description: "Create or update by ID",
    category: "Write",
  },
  {
    icon: Trash2,
    name: "Delete Document",
    description: "Remove products safely",
    category: "Write",
  },
];

const ToolsShowcase = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return (
    <section id="tools" className="container mx-auto px-6">
      <div className="mx-auto max-w-6xl">
        <div className="animate-fade-up mb-12 text-center">
          <Badge className="bg-secondary/20 text-primary border-primary/30 mb-4">
            {tools.length} Powerful Tools
          </Badge>
          <h2 className="mb-4 text-4xl leading-tight font-bold md:mb-6 md:text-5xl">
            Everything You Need
            <br />
            <span className="gradient-text">Build with Supabase</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg text-pretty md:text-xl">
            A comprehensive suite of tools to interact with your Supabase
            database through the Model Context Protocol.
          </p>
        </div>

        <div
          ref={ref}
          className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
        >
          {tools.map((tool, index) => (
            <Card
              key={index}
              className={`bg-card/50 ${inView ? `animate-fade-up opacity-100` : "opacity-0"} border-primary/30 group cursor-pointer p-5 transition-all duration-300 hover:scale-105`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary flex size-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
                  <tool.icon className="text-primary-foreground size-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="text-foreground font-semibold">
                      {tool.name}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsShowcase;
