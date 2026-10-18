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
        content: options.themeColorLight ?? "#f7f7f7",
      },
    },
    // Browser UI color when the user prefers dark mode
    {
      injectTo: "head",
      tag: "meta",
      attrs: {
        name: "theme-color",
        media: "(prefers-color-scheme: dark)",
        content: options.themeColorDark ?? "#0d0d0d",
      },
    },
    // Makes the web app capable of running in standalone mode on iOS.
    // iOS < 26 only honors the apple-prefixed name, so emit both.
    {
      injectTo: "head",
      tag: "meta",
      attrs: {
        name: "mobile-web-app-capable",
        content: "yes",
      },
    },
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
        href: "/assets/images/apple-icon-180.png",
      },
    },
    // Favicon — the 180px Apple icon doubles as the favicon; maskable icons
    // carry safe-zone padding that would render the favicon too small.
    {
      injectTo: "head",
      tag: "link",
      attrs: {
        rel: "icon",
        type: "image/png",
        href: "/assets/images/apple-icon-180.png",
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
      // Only iOS reads apple-touch-startup-image links (at home-screen launch),
      // so skip the canvas work elsewhere and never let a failure break the page.
      // iPadOS 13+ reports a "Macintosh" UA by default, so detect iPads via
      // platform + touch points.
      children: `(function(){var isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);if(isIOS&&typeof iosPWASplash==='function'){try{iosPWASplash('/assets/images/manifest-icon-512.maskable.png',${JSON.stringify(options.splashColor ?? "#3880ff")})}catch(e){}}})()`,
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
