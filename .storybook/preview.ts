import type { Preview } from "@storybook/web-components"
import { html } from 'lit'

import './dark-mode.js'

import '../app/index.ts'
import '../app/theme.scss'
import '../app/index.scss'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    }
  },
  decorators: [
    (Story) => {
      return html`<theme-switcher>
        ${Story()}
      </theme-switcher>`
    },
  ],
}

export default preview
