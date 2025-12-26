# Supabase MCP - Model Context Protocol Server

A powerful **Model Context Protocol (MCP)** server that enables seamless interaction with **Supabase databases**. This project provides a comprehensive suite of CRUD operations through the MCP interface, allowing AI assistants and tools to manage your Supabase data effortlessly.

## 🌟 About The Project

**Supabase MCP** is a Next.js-powered MCP server that bridges the gap between AI assistants and Supabase databases. It exposes a set of standardized tools that enable AI models to perform database operations through the Model Context Protocol, making it easy to build AI-powered applications with persistent data storage.

The project features a beautiful landing page showcasing the available tools and provides a production-ready MCP server endpoint that can be integrated with Claude Desktop, AI agents, or any MCP-compatible client.

## ✨ Key Features

- **🔌 MCP Server Integration** - Full Model Context Protocol server implementation with SSE and HTTP transport support
- **📊 Complete CRUD Operations** - Create, Read, Update, Delete operations for Supabase tables
- **🎯 Type-Safe** - Built with TypeScript and Zod validation for robust type safety
- **⚡ Real-time Ready** - Powered by Supabase's real-time capabilities
- **🎨 Modern UI** - Beautiful, responsive landing page with animated components
- **🔒 Secure** - Environment-based configuration with Supabase Row Level Security support
- **🚀 Production Ready** - Optimized Next.js build with error handling and validation

## 🛠️ Available Tools

The MCP server provides **7 powerful tools** for database interaction:

### 1. **Creator Info**

Get detailed information about the app creator - contact information, website, social links, and professional background.

### 2. **Create Document**

Add new products to your inventory with comprehensive validation for title, price, category, and quantity. Automatically validates data types and constraints before insertion.

### 3. **List Documents**

Retrieve all products from the database with optional filtering by any column and customizable pagination support (default: 100 records).

### 4. **Get Document**

Find specific products by any column (ID, title, price, category, etc.) with exact value matching.

### 5. **Update Document**

Modify existing product details with flexible JSON-based updates. Supports partial updates of any field.

### 6. **Upsert Document**

Create or update records intelligently based on primary key (ID). Perfect for bulk operations and synchronization tasks.

### 7. **Delete Document**

Safely remove products from the inventory with existence verification before deletion.

## 🏗️ Tech Stack

### **Frontend**

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with React Compiler
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### **Backend & Database**

- **[Supabase](https://supabase.com/)** - PostgreSQL database with real-time capabilities
- **[@supabase/supabase-js](https://github.com/supabase/supabase-js)** - Supabase client library
- **[MCP SDK](https://github.com/modelcontextprotocol/sdk)** - Model Context Protocol implementation
- **[mcp-handler](https://www.npmjs.com/package/mcp-handler)** - MCP server handler for Next.js

### **Validation & Utilities**

- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[clsx](https://github.com/lukeed/clsx)** - Conditional className utility
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge Tailwind classes

### **Development Tools**

- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm/yarn/pnpm
- A **Supabase** account and project ([Create one here](https://supabase.com/))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/xwaleedahmad/supabase-mcp.git
   cd supabase-mcp
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   Get your Supabase credentials from:
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Select your project
   - Navigate to **Settings** → **API**
   - Copy the **Project URL** and **anon/public key**

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the landing page.

## 🗄️ Database Table Schema

Create the following table in your Supabase database:

### **Products Table**

```sql
CREATE TABLE "Products" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "title" TEXT NOT NULL,
  "price" NUMERIC NOT NULL CHECK (price > 0),
  "category" TEXT NOT NULL,
  "quantity" INTEGER DEFAULT 1 CHECK (quantity >= 0),
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

Run this SQL in your Supabase SQL Editor:

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Paste the SQL above and click **Run**

## 📁 Project Structure

```
supabase-mcp/
├── public/                      # Static assets
├── src/
│   ├── app/
│   │   ├── [transport]/
│   │   │   └── route.ts        # MCP server endpoint (SSE/HTTP)
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   └── card.tsx
│   │   ├── AnimatedBackground.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── ToolsShowcase.tsx
│   │   └── VideoShowcase.tsx
│   └── lib/
│       ├── utils.ts            # Utility functions
│       └── supabase/
│           └── server.ts       # Supabase client configuration
├── .env.local                   # Environment variables (create this)
├── components.json              # shadcn/ui configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🔧 Configuration

### MCP Client Configuration

**Configuration:**

```json
{
  "mcpServers": {
    "supabase-mcp": {
      "url": "http://localhost:3000/sse"
    }
  }
}
```

For production:

```json
{
  "mcpServers": {
    "supabase-mcp": {
      "url": "https://your-production-domain.com/sse"
    }
  }
}
```

## 📡 API Endpoints

### **MCP Server Endpoint**

- **SSE:** `http://localhost:3000/sse` (recommended for Claude Desktop)
- **HTTP:** `http://localhost:3000/server` (for custom integrations)

Both endpoints support:

- `GET` - Server-Sent Events transport
- `POST` - HTTP JSON-RPC transport

## 🎯 Usage Examples

Once configured with an MCP client, you can interact with your database using natural language:

```
"Who created this application?"
→ Uses creator_info tool

"Add a new laptop to the inventory priced at $999 in the Electronics category"
→ Uses create_document tool

"Show me all products in the Electronics category"
→ Uses list_documents tool with filtering

"Find the product with ID abc-123"
→ Uses get_document tool

"Update the price of product with ID abc-123 to $899"
→ Uses update_document tool

"Upsert a product with ID xyz-456, title 'Gaming Mouse', price $59.99, category 'Electronics', quantity 25"
→ Uses upsert_document tool

"Delete the product with title 'Old Laptop'"
→ Uses delete_document tool
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Ensure these are set in your deployment platform:

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Waleed Ahmad**

- 🌐 Website: [waleedahmad.online](https://waleedahmad.online/)
- 💻 GitHub: [@xwaleedahmad](https://github.com/xwaleedahmad/)
- 🐦 Twitter/X: [@xwaleedahmad](https://x.com/xwaleedahmad/)
- 📧 Email: waleedgondal57@gmail.com

## 🙏 Acknowledgments

- [Model Context Protocol](https://modelcontextprotocol.io/) - For the amazing protocol
- [Supabase](https://supabase.com/) - For the powerful backend platform
- [Next.js](https://nextjs.org/) - For the incredible React framework
- [Vercel](https://vercel.com/) - For seamless deployment

## 📝 Additional Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Built with ❤️ using Model Context Protocol and Supabase**
