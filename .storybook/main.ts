import type { StorybookConfig } from "@storybook/web-components-vite"
import tsconfigPaths from 'vite-tsconfig-paths'
import sassPlugin from 'esbuild-sass-plugin'
// import { tsconfigImportMapper } from '../framework/plugins/import-mapper.js'

const config: StorybookConfig = {
  stories: [
    "../app/components/**/*.mdx",
    "../app/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "storybook-dark-mode"],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal(config, options) {
    config.plugins?.push(tsconfigPaths())
    config.assetsInclude = ['/sb-preview/runtime.js']
    return config
  },
}
export default config
