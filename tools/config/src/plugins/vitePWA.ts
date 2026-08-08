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
    includeManifestIcons: false,
    manifest: {
      name: options.name,
      short_name: options.short_name,
      description: options.description,
      theme_color: options.theme_color,
      background_color: options.background_color,
      display: "standalone",
      display_override: ["window-controls-overlay", "standalone"],
      start_url: "/",
      icons: [
        {
          src: "/assets/images/manifest-icon-192.maskable.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/assets/images/manifest-icon-192.maskable.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "/assets/images/manifest-icon-512.maskable.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/assets/images/manifest-icon-512.maskable.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
      screenshots: [
        {
          src: "/assets/images/screenshot.png",
          sizes: "800x1440",
          type: "image/png",
          form_factor: "narrow",
          label: "Home screen on mobile",
        },
        {
          src: "/assets/images/screenshot.png",
          sizes: "800x1440",
          type: "image/png",
          form_factor: "wide",
          label: "Home screen on mobile",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      maximumFileSizeToCacheInBytes: 2 * 1024 * 1024,
    },
    devOptions: {
      enabled: true,
    },
  }),
];
