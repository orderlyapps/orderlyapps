import type { PluginOption } from "vite-plus";
import { createHtmlPlugin } from "vite-plugin-html";

export interface HtmlInjectOptions {
  title: string;
  splashColor?: string;
  themeColorLight?: string;
  themeColorDark?: string;
  injectScript?: string;
  splashScriptSrc?: string;
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
    // Declares support for both light and dark color schemes
    {
      injectTo: "head",
      tag: "meta",
      attrs: {
        name: "color-scheme",
        content: "light dark",
      },
    },
    // Browser UI color when the user prefers light mode
    {
      injectTo: "head",
      tag: "meta",
      attrs: {
        name: "theme-color",
        media: "(prefers-color-scheme: light)",
        content: options.themeColorLight ?? "#0054e9",
      },
    },
    // Browser UI color when the user prefers dark mode
    {
      injectTo: "head",
      tag: "meta",
      attrs: {
        name: "theme-color",
        media: "(prefers-color-scheme: dark)",
        content: options.themeColorDark ?? "#eb445a",
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
        content: "black-translucent",
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
        src: options.splashScriptSrc ?? "/vendor/ios-pwa-splash.js",
      },
    },
    {
      injectTo: "head",
      tag: "script",
      children: `if (typeof iosPWASplash === 'function') iosPWASplash('/assets/images/icon.png', '${options.splashColor ?? "#3880ff"}');`,
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
