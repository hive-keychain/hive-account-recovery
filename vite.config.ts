import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      buffer: "buffer",
      events: "events",
      util: "util",
      stream: "stream-browserify",
    },
  },
  optimizeDeps: {
    include: ["buffer", "events", "util", "stream-browserify"],
  },
});
