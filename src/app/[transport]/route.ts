import { createMcpHandler } from "mcp-handler";
import { supabase } from "@/lib/supabase/server";
import { z } from "zod";

const Table = "Products";

const serverOptions = {
  serverInfo: {
    name: "supabase-mcp",
    version: "1.0.0",
  },
};

const handler = createMcpHandler(
  (server) => {
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
            **GitHub:** https://github.com/xwaleedahmad/
            **Twitter/X:** https://x.com/xwaleedahmad/
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
        title: z.string().min(1, "Title cannot be empty"),
        price: z.number().positive().describe("Price in USD, must be positive"),
        category: z
          .string()
          .min(1, "Category cannot be empty")
          .describe("E.g., Electronics, Clothing, Home, Video Games, etc."),
        quantity: z.number().int().nonnegative().default(1).optional(),
      },
      async ({ title, price, category, quantity }) => {
        try {
          // Additional validation
          if (!title || title.trim() === "") {
            return {
              content: [
                { type: "text", text: "Error: Product title cannot be empty" },
              ],
              isError: true,
            };
          }

          if (!category || category.trim() === "") {
            return {
              content: [
                { type: "text", text: "Error: Category cannot be empty" },
              ],
              isError: true,
            };
          }

          if (price <= 0) {
            return {
              content: [
                { type: "text", text: "Error: Price must be greater than 0" },
              ],
              isError: true,
            };
          }

          const { data, error } = await supabase
            .from(Table)
            .insert({
              title: title.trim(),
              price,
              category: category.trim(),
              quantity: quantity ?? 1,
            })
            .select()
            .single();

          if (error) {
            return {
              content: [
                {
                  type: "text",
                  text: `Error creating product: ${error.message}`,
                },
              ],
              isError: true,
            };
          }

          if (!data) {
            return {
              content: [
                {
                  type: "text",
                  text: "Error: Failed to create product (no data returned)",
                },
              ],
              isError: true,
            };
          }

          return {
            content: [
              {
                type: "text",
                text: `Success: Added '${data.title}' to ${data.category} for $${data.price}. Quantity: ${data.quantity} (ID: ${data.id})`,
              },
            ],
          };
        } catch (err) {
          return {
            content: [
              {
                type: "text",
                text: `Unexpected error: ${err instanceof Error ? err.message : String(err)}`,
              },
            ],
            isError: true,
          };
        }
      },
    );

    // --- TOOL 2: List Documents (Get All Products) ---
    server.tool(
      "list_documents",
      "List all products in the inventory. Optionally filter by column and value.",
      {
        tableName: z.string().default(Table),
        filterColumn: z
          .string()
          .optional()
          .describe("Optional column to filter by"),
        filterValue: z.string().optional().describe("Optional value to match"),
        limit: z
          .number()
          .int()
          .positive()
          .optional()
          .default(100)
          .describe("Maximum number of records to return (default: 100)"),
      },
      async ({ tableName, filterColumn, filterValue, limit }) => {
        try {
          let query = supabase.from(tableName).select("*").limit(limit!);

          if (filterColumn && filterValue) {
            query = query.eq(filterColumn, filterValue);
          }

          const { data, error } = await query;

          if (error) {
            return {
              content: [
                {
                  type: "text",
                  text: `Error fetching documents: ${error.message}`,
                },
              ],
              isError: true,
            };
          }

          if (!data || data.length === 0) {
            return {
              content: [
                { type: "text", text: "No documents found in the table." },
              ],
            };
          }

          return {
            content: [
              {
                type: "text",
                text: `Found ${data.length} document(s):\n\n${JSON.stringify(data, null, 2)}`,
              },
            ],
          };
        } catch (err) {
          return {
            content: [
              {
                type: "text",
                text: `Unexpected error: ${err instanceof Error ? err.message : String(err)}`,
              },
            ],
            isError: true,
          };
        }
      },
    );

    // --- TOOL 3: Get Document (Get Product based on exact value match) ---
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
        try {
          if (!filterColumn || !filterValue) {
            return {
              content: [
                {
                  type: "text",
                  text: "Error: filterColumn and filterValue are required",
                },
              ],
              isError: true,
            };
          }

          const { data, error } = await supabase
            .from(tableName)
            .select("*")
            .eq(filterColumn, filterValue);

          if (error) {
            return {
              content: [
                {
                  type: "text",
                  text: `Error fetching document: ${error.message}`,
                },
              ],
              isError: true,
            };
          }

          if (!data || data.length === 0) {
            return {
              content: [
                {
                  type: "text",
                  text: `No document found with ${filterColumn} = '${filterValue}'`,
                },
              ],
            };
          }

          return {
            content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
          };
        } catch (err) {
          return {
            content: [
              {
                type: "text",
                text: `Unexpected error: ${err instanceof Error ? err.message : String(err)}`,
              },
            ],
            isError: true,
          };
        }
      },
    );

    // --- TOOL 4: Update Document (Update Product) ---
    server.tool(
      "update_document",
      "Update a Product(e.g., change title, price, category, or quantity)",
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
        try {
          if (!data || data.trim() === "") {
            return {
              content: [
                { type: "text", text: "Error: data parameter cannot be empty" },
              ],
              isError: true,
            };
          }

          let parsedData;
          try {
            parsedData = JSON.parse(data);
          } catch (parseError) {
            return {
              content: [
                {
                  type: "text",
                  text: `Error: Invalid JSON format - ${parseError instanceof Error ? parseError.message : String(parseError)}`,
                },
              ],
              isError: true,
            };
          }

          if (Object.keys(parsedData).length === 0) {
            return {
              content: [
                { type: "text", text: "Error: No fields to update provided" },
              ],
              isError: true,
            };
          }

          const { data: result, error } = await supabase
            .from(tableName)
            .update(parsedData)
            .eq(filterColumn, filterValue)
            .select();

          if (error) {
            return {
              content: [
                {
                  type: "text",
                  text: `Error updating document: ${error.message}`,
                },
              ],
              isError: true,
            };
          }

          if (!result || result.length === 0) {
            return {
              content: [
                {
                  type: "text",
                  text: `No document found to update with ${filterColumn} = '${filterValue}'`,
                },
              ],
              isError: true,
            };
          }

          return {
            content: [
              {
                type: "text",
                text: `Successfully updated ${result.length} document(s):\n\n${JSON.stringify(result, null, 2)}`,
              },
            ],
          };
        } catch (err) {
          return {
            content: [
              {
                type: "text",
                text: `Unexpected error: ${err instanceof Error ? err.message : String(err)}`,
              },
            ],
            isError: true,
          };
        }
      },
    );

    // --- TOOL 5: Upsert Document (Create or Update) ---
    server.tool(
      "upsert_document",
      "Create or Update a row (Requires ID in data)",
      {
        tableName: z.string().default(Table),
        data: z
          .string()
          .describe("JSON string of the object. Must include primary key."),
      },
      async ({ tableName, data }) => {
        try {
          if (!data || data.trim() === "") {
            return {
              content: [
                { type: "text", text: "Error: data parameter cannot be empty" },
              ],
              isError: true,
            };
          }

          let parsedData;
          try {
            parsedData = JSON.parse(data);
          } catch (parseError) {
            return {
              content: [
                {
                  type: "text",
                  text: `Error: Invalid JSON format - ${parseError instanceof Error ? parseError.message : String(parseError)}`,
                },
              ],
              isError: true,
            };
          }

          if (!parsedData.id && tableName === Table) {
            return {
              content: [
                {
                  type: "text",
                  text: "Error: 'id' field is required for upsert operation",
                },
              ],
              isError: true,
            };
          }

          const { data: result, error } = await supabase
            .from(tableName)
            .upsert(parsedData)
            .select();

          if (error) {
            return {
              content: [
                {
                  type: "text",
                  text: `Error upserting document: ${error.message}`,
                },
              ],
              isError: true,
            };
          }

          return {
            content: [
              {
                type: "text",
                text: `Successfully upserted document:\n\n${JSON.stringify(result, null, 2)}`,
              },
            ],
          };
        } catch (err) {
          return {
            content: [
              {
                type: "text",
                text: `Unexpected error: ${err instanceof Error ? err.message : String(err)}`,
              },
            ],
            isError: true,
          };
        }
      },
    );

    // --- TOOL 6: Delete Document (Generic) ---
    server.tool(
      "delete_document",
      "Delete a row permanently",
      {
        tableName: z.string().default(Table),
        filterColumn: z.string(),
        filterValue: z.string(),
      },
      async ({ tableName, filterColumn, filterValue }) => {
        try {
          if (!filterColumn || !filterValue) {
            return {
              content: [
                {
                  type: "text",
                  text: "Error: filterColumn and filterValue are required",
                },
              ],
              isError: true,
            };
          }

          // First check if the document exists
          const { data: existing, error: checkError } = await supabase
            .from(tableName)
            .select("*")
            .eq(filterColumn, filterValue);

          if (checkError) {
            return {
              content: [
                {
                  type: "text",
                  text: `Error checking document: ${checkError.message}`,
                },
              ],
              isError: true,
            };
          }

          if (!existing || existing.length === 0) {
            return {
              content: [
                {
                  type: "text",
                  text: `No document found to delete with ${filterColumn} = '${filterValue}'`,
                },
              ],
              isError: true,
            };
          }

          const { error } = await supabase
            .from(tableName)
            .delete()
            .eq(filterColumn, filterValue);

          if (error) {
            return {
              content: [
                {
                  type: "text",
                  text: `Error deleting document: ${error.message}`,
                },
              ],
              isError: true,
            };
          }

          return {
            content: [
              {
                type: "text",
                text: `Successfully deleted ${existing.length} document(s) with ${filterColumn} = '${filterValue}'`,
              },
            ],
          };
        } catch (err) {
          return {
            content: [
              {
                type: "text",
                text: `Unexpected error: ${err instanceof Error ? err.message : String(err)}`,
              },
            ],
            isError: true,
          };
        }
      },
    );
  },
  serverOptions,
  {
    basePath: "",
  },
);

export { handler as GET, handler as POST };
