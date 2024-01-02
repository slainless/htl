import type { Meta, StoryObj } from '@storybook/web-components'
import { TranslatePanel } from './translate-panel.ts'
import { html } from 'lit'

const mockInput = html`
  <p>this is an input text</p>
  <p>another input text</p>
  <p>fin.</p>
`

const mockOutput = html`
  <p>this is an output text</p>
  <p>another output text</p>
  <p>fin.</p>
`

const meta = {
  title: 'Components/Translate Panel',
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  render: () => TranslatePanel(mockInput, mockOutput),
  parameters: {},
  argTypes: {},
  decorators: [
    (Story) => html`
      <div class="main-panel">
        <div class="main-panel__panel">
          ${Story()}
        </div>
      </div>
    `
  ]
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {
  },
}