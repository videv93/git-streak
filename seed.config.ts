import { SeedPg } from "@snaplet/seed/adapter-pg";
import { defineConfig } from "@snaplet/seed/config";
import { Client } from "pg";

export default defineConfig({
  adapter: async () => {
    const client = new Client('postgresql://postgres:postgres@127.0.0.1:54322/postgres')
    await client.connect();
    return new SeedPg(client);
  },
});
