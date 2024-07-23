import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    VITE_APP_GOOGLE_MAPS_API_KEY: JSON.stringify(
      process.env.VITE_APP_GOOGLE_MAPS_API_KEY
    ),

    VITE_APP_GOOGLE_MAPS_MAP_ID: JSON.stringify(
      process.env.VITE_APP_GOOGLE_MAPS_MAP_ID
    ),

    VITE_APP_FIREBASE_API_KEY: JSON.stringify(
      process.env.VITE_APP_FIREBASE_API_KEY
    ),
  },
});
