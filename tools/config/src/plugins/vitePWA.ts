import type { PluginOption } from "vite-plus";
import { VitePWA } from "vite-plugin-pwa";

export interface VitePWAOptions {
  name: string;
  short_name: string;
  description: string;
  theme_color: string;
  background_color: string;
}

export const vitePWA = (options: VitePWAOptions): PluginOption[] => [
  VitePWA({
    registerType: "autoUpdate",
    injectRegister: "auto",
    includeAssets: ["favicon.svg", "icons.svg"],
    manifest: {
      name: options.name,
      short_name: options.short_name,
      description: options.description,
      theme_color: options.theme_color,
      background_color: options.background_color,
      display: "standalone",
      start_url: "/",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
    },
    devOptions: {
      enabled: true,
    },
  }),
];
