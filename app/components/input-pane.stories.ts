import type { Meta, StoryObj } from '@storybook/web-components'
import { InputPane } from './input-pane.js'

const meta = {
  title: 'Components/Input Pane',
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  render: (args) => new InputPane(),
  parameters: {},
  argTypes: {}
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {}