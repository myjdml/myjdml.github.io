/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_LINE?: "domestic" | "overseas";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
