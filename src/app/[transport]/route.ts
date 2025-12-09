import { createMcpHandler } from "mcp-handler";
import { supabase } from "@/lib/supabase/server";
import { z } from "zod";

const Table = "Products";

const handler = createMcpHandler((server) => {
  // --- CREATOR INFO ---
  server.tool(
    "creator_info",
    "Get detailed information about the app creator",
    {},
    async () => {
      return {
        content: [
          {
            type: "text" as const,
            text: `# Waleed Ahmad
            🚀 Full Stack Web Developer

            ## About Me
            I craft interactive, scalable, and responsive web experiences fueled by curiosity, innovation, and modern technology.

            ## 🌐 Connect With Me
            **Website:** https://waleedahmad.online/
            **Resume:** https://waleedahmad.online/Waleed_Ahmad_Resume.pdf
            **GitHub:** https://github.com/mewaleedahmad/
            **Twitter/X:** https://x.com/mewaleedahmad/
            **Email:** waleedgondal57@gmail.com
            `,
          },
        ],
      };
    },
  );

  // --- TOOL 1: Create Document (Add Product) ---
  server.tool(
    "create_document",
    "Add a new product to inventory. Validates and ensures title, price,category and quantity exists.",
    {
      name: z.string(),
      price: z.number().positive().describe("Price in USD, must be positive"),
      category: z
        .string()
        .describe("E.g., Electronics, Clothing, Home, Video Games, etc."),
      quantity: z.number().int().nonnegative().default(1).optional(),
    },
    async ({ name, price, category, quantity }) => {
      const { data, error } = await supabase
        .from(Table)
        .insert({
          name,
          price,
          category,
          quantity,
        })
        .select()
        .single();

      if (error)
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };

      return {
        content: [
          {
            type: "text",
            text: `Success: Added '${data.name}' to ${data.category} for $${data.price}. (ID: ${data.id})`,
          },
        ],
      };
    },
  );

  // --- TOOL 2: Get Document (Get Product based on exact value match) ---
  server.tool(
    "get_document",
    "Find a Product by a specific column (e.g., find product by id,title,price or category)",
    {
      tableName: z.string().default(Table),
      filterColumn: z
        .string()
        .describe(
          "The column name to filter by e.g., find product by id,title,price or category)",
        ),
      filterValue: z.string().describe("The value to match"),
    },
    async ({ tableName, filterColumn, filterValue }) => {
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .eq(filterColumn, filterValue);

      if (error)
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    },
  );

  // --- TOOL 3: Update Document (Update Product) ---
  server.tool(
    "update_document",
    "Update a Product(e.g., change name, price, category, or quantity)",
    {
      tableName: z.string().default(Table),
      filterColumn: z.string(),
      filterValue: z.string(),
      data: z
        .string()
        .describe(
          "JSON string of fields to update (e.g. '{\"price\": 19.99}')",
        ),
    },
    async ({ tableName, filterColumn, filterValue, data }) => {
      const { data: result, error } = await supabase
        .from(tableName)
        .update(JSON.parse(data))
        .eq(filterColumn, filterValue)
        .select();

      if (error)
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  // --- TOOL 4: Delete Document (Generic) ---
  server.tool(
    "delete_document",
    "Delete a row permanently",
    {
      tableName: z.string().default(Table),
      filterColumn: z.string(),
      filterValue: z.string(),
    },
    async ({ tableName, filterColumn, filterValue }) => {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq(filterColumn, filterValue);

      if (error)
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      return {
        content: [{ type: "text", text: "Document deleted successfully" }],
      };
    },
  );
});

export { handler as GET, handler as POST };
