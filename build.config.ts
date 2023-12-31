const config = {
  // modulesDir: "./app/modules",
  pagesDir: "./app/pages",

  build: {
    outDir: "./build"
  },
  dev: {
    outDir: "./.dev"
  }
} as const

export default config