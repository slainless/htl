import type { Preview } from "@storybook/web-components"
import '../app/index.scss'
import '../app/index.js'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      return Story()
    },
  ],
}

export default preview
