import type { PluginOption } from "vite-plus";
import { createHtmlPlugin } from "vite-plugin-html";

export interface HtmlInjectOptions {
  title: string;
  themeColor?: string;
  injectScript?: string;
  tags?: Array<{
    injectTo: "head" | "body" | "head-prepend" | "body-prepend";
    tag: string;
    attrs?: Record<string, string>;
    children?: string;
  }>;
}

export const htmlInject = (options: HtmlInjectOptions): PluginOption[] => {
  const defaultTags: HtmlInjectOptions["tags"] = [
    // Controls the layout and scaling behavior on mobile devices
    {
      injectTo: "head",
      tag: "meta",
      attrs: {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no",
      },
    },
    // Sets the browser UI color (e.g. address bar) to match the app theme
    {
      injectTo: "head",
      tag: "meta",
      attrs: {
        name: "theme-color",
        content: options.themeColor ?? "#3880ff",
      },
    },
    // Makes the web app capable of running in standalone mode on iOS
    {
      injectTo: "head",
      tag: "meta",
      attrs: {
        name: "apple-mobile-web-app-capable",
        content: "yes",
      },
    },
    // Sets the status bar style on iOS when running as a standalone web app
    {
      injectTo: "head",
      tag: "meta",
      attrs: {
        name: "apple-mobile-web-app-status-bar-style",
        content: "default",
      },
    },
    // Sets the title shown on the iOS home screen
    {
      injectTo: "head",
      tag: "meta",
      attrs: {
        name: "apple-mobile-web-app-title",
        content: options.title,
      },
    },
    // Apple touch icon for iOS home screen
    {
      injectTo: "head",
      tag: "link",
      attrs: {
        rel: "apple-touch-icon",
        href: "/assets/images/icon-180.png",
      },
    },
    // Favicon
    {
      injectTo: "head",
      tag: "link",
      attrs: {
        rel: "icon",
        type: "image/png",
        href: "/assets/images/icon-196.png",
      },
    },
    // iOS PWA splash screen
    {
      injectTo: "head",
      tag: "script",
      attrs: {
        src: "https://cdn.jsdelivr.net/npm/ios-pwa-splash@1.0.0/cdn.min.js",
      },
    },
    {
      injectTo: "head",
      tag: "script",
      children: `iosPWASplash('/assets/images/icon.png', '${options.themeColor ?? "#3880ff"}');`,
    },
    {
      injectTo: "head",
      tag: "script",
      children: `console.log('Hello from htmlInject');`,
    },
  ];

  return [
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: options.title,
          injectScript: options.injectScript,
        },
        tags: [...defaultTags, ...(options.tags ?? [])],
      },
    }),
  ];
};
