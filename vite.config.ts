import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Wird für die Pfad-Aliase benötigt

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Das sorgt dafür, dass '@' auf deinen 'src'-Ordner verweist
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
