/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_COUNTRIES_API_URL: string;
  readonly VITE_CITIES_API_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
