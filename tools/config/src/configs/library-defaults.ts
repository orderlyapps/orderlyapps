import type { UserConfig } from "vite-plus";

export const libraryDefaults: UserConfig = {
  pack: {
    dts: true,
    exports: true,
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
};
