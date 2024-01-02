import type { Meta, StoryObj } from '@storybook/web-components'
import { MainPanel } from './main-panel.ts'
import { html } from 'lit'

const meta = {
  title: 'Components/Main Panel',
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {},
  argTypes: {}
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => MainPanel(
    html`This is translate panel`,
    html`This is settings panel`
  ),
}