/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // NextAuth.js
  "next-auth": "^4.22.1",
  "@next-auth/prisma-adapter": "^1.0.5",

  // Prisma
  prisma: "^4.14.0",
  "@prisma/client": "^4.14.0",

  // TailwindCSS
  tailwindcss: "^3.3.0",
  autoprefixer: "^10.4.14",
  postcss: "^8.4.21",
  prettier: "^3.1.0",
  "prettier-plugin-tailwindcss": "^0.5.7",

  // tRPC
  "@trpc/client": "^10.26.0",
  "@trpc/server": "^10.26.0",
  "@trpc/react-query": "^10.26.0",
  "@trpc/next": "^10.26.0",
  "@tanstack/react-query": "^4.29.7",
  superjson: "1.12.2",

  // external Backend
  "react-query": "^3.39.3",
  // recoil
  recoil: "^0.7.7",
  //carbon
  "@carbon/icons-react": "^11.19.0",
  "@carbon/react": "^1.30.0",
  // proxy
  "http-proxy": "^1.18.1",
  "@types/http-proxy": "^1.17.11",
} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
