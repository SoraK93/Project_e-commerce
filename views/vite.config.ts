import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import mkcert from "vite-plugin-mkcert";
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), mkcert(), tailwindcss()],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  server: {
    https: {},
  },
});
