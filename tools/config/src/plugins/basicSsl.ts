import type { PluginOption } from "vite-plus";
import basicSsl from "@vitejs/plugin-basic-ssl";

// Enable HTTPS so crypto.subtle (Web Crypto API) and PWA service workers work
// when accessing the dev server over the network (non-localhost). Required by
// RxDB's hashing and other secure-context-only browser APIs.
export const basicSslPlugin: PluginOption = basicSsl();
