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
