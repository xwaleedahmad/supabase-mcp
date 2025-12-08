import { createMcpHandler } from "mcp-handler";

const handler = createMcpHandler((server) => {
  // --- 1. CREATOR INFO ---
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

  // // --- 2. LIST TABLES ---
  // server.tool(
  //   "list_tables",
  //   "List all public tables in the database",
  //   {},
  //   async () => {
  //     const { data, error } = await supabase
  //       .from("information_schema.tables")
  //       .select("table_name")
  //       .eq("table_schema", "public");

  //     if (error)
  //       return { content: [{ type: "text", text: `Error: ${error.message}` }] };
  //     return {
  //       content: [
  //         { type: "text", text: JSON.stringify(data.map((t) => t.table_name)) },
  //       ],
  //     };
  //   },
  // );

  // // --- 3. GET SCHEMA (Fields) ---
  // server.tool(
  //   "get_table_schema",
  //   "Get column names and types for a specific table",
  //   { tableName: z.string() },
  //   async ({ tableName }) => {
  //     const { data, error } = await supabase
  //       .from("information_schema.columns")
  //       .select("column_name, data_type, is_nullable")
  //       .eq("table_schema", "public")
  //       .eq("table_name", tableName);

  //     if (error)
  //       return { content: [{ type: "text", text: `Error: ${error.message}` }] };
  //     return {
  //       content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
  //     };
  //   },
  // );

  // // --- 4. CREATE ROW ---
  // server.tool(
  //   "create_row",
  //   "Insert a new row into any table",
  //   {
  //     tableName: z.string(),
  //     data: z.string().describe("JSON string of object to insert"),
  //   },
  //   async ({ tableName, data }) => {
  //     let parsed;
  //     try {
  //       parsed = JSON.parse(data);
  //     } catch {
  //       return { content: [{ type: "text", text: "Invalid JSON data" }] };
  //     }

  //     const { data: res, error } = await supabase
  //       .from(tableName)
  //       .insert(parsed)
  //       .select()
  //       .single();
  //     if (error)
  //       return { content: [{ type: "text", text: `Error: ${error.message}` }] };
  //     return {
  //       content: [{ type: "text", text: `Created: ${JSON.stringify(res)}` }],
  //     };
  //   },
  // );

  // // --- 5. UPDATE ROW (Covers "Edit") ---
  // server.tool(
  //   "update_row",
  //   "Update specific fields of a row by ID",
  //   {
  //     tableName: z.string(),
  //     id: z.string(),
  //     data: z.string().describe("JSON string of fields to update"),
  //   },
  //   async ({ tableName, id, data }) => {
  //     let parsed;
  //     try {
  //       parsed = JSON.parse(data);
  //     } catch {
  //       return { content: [{ type: "text", text: "Invalid JSON data" }] };
  //     }

  //     const { data: res, error } = await supabase
  //       .from(tableName)
  //       .update(parsed)
  //       .eq("id", id)
  //       .select()
  //       .single();
  //     if (error)
  //       return { content: [{ type: "text", text: `Error: ${error.message}` }] };
  //     return {
  //       content: [{ type: "text", text: `Updated: ${JSON.stringify(res)}` }],
  //     };
  //   },
  // );

  // // --- 6. DELETE ROW ---
  // server.tool(
  //   "delete_row",
  //   "Delete a row permanently by ID",
  //   { tableName: z.string(), id: z.string() },
  //   async ({ tableName, id }) => {
  //     const { error } = await supabase.from(tableName).delete().eq("id", id);
  //     if (error)
  //       return { content: [{ type: "text", text: `Error: ${error.message}` }] };
  //     return {
  //       content: [
  //         { type: "text", text: `Deleted row ${id} from ${tableName}` },
  //       ],
  //     };
  //   },
  // );

  // // --- 7. UPSERT ROW ---
  // server.tool(
  //   "upsert_row",
  //   "Insert a row, or update if it already exists (based on ID)",
  //   { tableName: z.string(), data: z.string().describe("JSON string of data") },
  //   async ({ tableName, data }) => {
  //     let parsed;
  //     try {
  //       parsed = JSON.parse(data);
  //     } catch {
  //       return { content: [{ type: "text", text: "Invalid JSON data" }] };
  //     }

  //     const { data: res, error } = await supabase
  //       .from(tableName)
  //       .upsert(parsed)
  //       .select()
  //       .single();
  //     if (error)
  //       return { content: [{ type: "text", text: `Error: ${error.message}` }] };
  //     return {
  //       content: [{ type: "text", text: `Upserted: ${JSON.stringify(res)}` }],
  //     };
  //   },
  // );

  // // --- 8. READ ALL ROWS ---
  // server.tool(
  //   "read_all_rows",
  //   "List rows from a table with optional filter",
  //   {
  //     tableName: z.string(),
  //     limit: z.number().optional().default(20),
  //     filterCol: z.string().optional(),
  //     filterVal: z.string().optional(),
  //   },
  //   async ({ tableName, limit, filterCol, filterVal }) => {
  //     let query = supabase.from(tableName).select("*").limit(limit);
  //     if (filterCol && filterVal) query = query.eq(filterCol, filterVal);

  //     const { data, error } = await query;
  //     if (error)
  //       return { content: [{ type: "text", text: `Error: ${error.message}` }] };
  //     return {
  //       content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
  //     };
  //   },
  // );

  // // --- 9. READ ROW BY ID ---
  // server.tool(
  //   "read_row_by_id",
  //   "Get a single row by its ID",
  //   { tableName: z.string(), id: z.string() },
  //   async ({ tableName, id }) => {
  //     const { data, error } = await supabase
  //       .from(tableName)
  //       .select("*")
  //       .eq("id", id)
  //       .single();
  //     if (error)
  //       return { content: [{ type: "text", text: `Error: ${error.message}` }] };
  //     return {
  //       content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
  //     };
  //   },
  // );

  // // --- 10. RUN SQL (Bonus Suggestion) ---
  // server.tool(
  //   "run_sql_query",
  //   "Run a raw READ-ONLY SQL query for complex analysis",
  //   { query: z.string().describe("SELECT query only") },
  //   async ({ query }) => {
  //     if (!query.toLowerCase().trim().startsWith("select")) {
  //       return {
  //         content: [{ type: "text", text: "Error: Only SELECT allowed" }],
  //       };
  //     }
  //     // Requires 'exec_sql' RPC function in Supabase
  //     const { data, error } = await supabase.rpc("exec_sql", { query });

  //     if (error)
  //       return { content: [{ type: "text", text: `Error: ${error.message}` }] };
  //     return {
  //       content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
  //     };
  //   },
  // );
});

export { handler as GET, handler as POST };
