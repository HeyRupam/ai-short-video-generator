import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://Ai-Video-Generator_owner:V2wJiSTKBx9R@ep-sparkling-voice-a1b6yldt.ap-southeast-1.aws.neon.tech/Ai-Video-Generator?sslmode=require",
  }
});
