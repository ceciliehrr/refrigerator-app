import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@pkt": ["@oslokommune/punkt-css/dist"],
        "@pkt-assets": ["@oslokommune/punkt-assets/dist"],
        "~/*": ["./*"],
        "@/*": ["./*"],
        "~~/*": ["./*"],
        "@@/*": ["./*"]
      }
    }
  },
  integrations: [react(), vue()]
});