import {
  Database,
  Search,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Table,
  FileText,
  Shield,
  Zap,
  Code,
  Link,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tools = [
  {
    icon: Database,
    name: "List Tables",
    description: "Retrieve all tables and schemas",
    category: "Query",
  },
  {
    icon: Search,
    name: "Execute Query",
    description: "Run custom SQL queries with safety",
    category: "Query",
  },
  {
    icon: Plus,
    name: "Create Record",
    description: "Insert new records with validation",
    category: "Write",
  },
  {
    icon: Edit,
    name: "Update Record",
    description: "Modify existing records seamlessly",
    category: "Write",
  },
  {
    icon: Trash2,
    name: "Delete Record",
    description: "Remove records with safety checks",
    category: "Write",
  },
  {
    icon: RefreshCw,
    name: "Realtime Sync",
    description: "Subscribe changes in real-time",
    category: "Realtime",
  },
  {
    icon: Table,
    name: "Table Schema",
    description: "Get detailed schema information",
    category: "Query",
  },
  {
    icon: Shield,
    name: "RLS Policies",
    description: "Manage Row Level Security policies",
    category: "Security",
  },
  {
    icon: FileText,
    name: "Migrations",
    description: "Run and track database migrations",
    category: "Admin",
  },
];

const ToolsShowcase = () => {
  return (
    <section id="tools" className="container mx-auto px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
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

        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {tools.map((tool, index) => (
            <Card
              key={index}
              className="bg-card border-primary/30 group cursor-pointer p-5 transition-all duration-300 hover:scale-105"
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
