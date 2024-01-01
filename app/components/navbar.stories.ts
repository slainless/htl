import type { Meta, StoryObj } from '@storybook/web-components'
import { Navbar, type NavbarProps } from './navbar.ts'

const meta = {
  title: 'Components/Header',
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  render: () => Navbar(),
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<NavbarProps>

export default meta
type Story = StoryObj<NavbarProps>

export const Default: Story = {
  args: {
  },
}