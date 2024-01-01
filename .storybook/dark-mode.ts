import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode'
import { addons } from '@storybook/preview-api'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

const channel = addons.getChannel()

@customElement('theme-switcher')
export class ThemeSwitcher extends LitElement {
  setDark(isDark: boolean) {
    const h = document.querySelector("html")!
    if (isDark) h.classList.add('dark')
    else h.classList.remove('dark')
  }

  connectedCallback(): void {
    channel.on(DARK_MODE_EVENT_NAME, this.setDark)
  }

  disconnectedCallback(): void {
    channel.off(DARK_MODE_EVENT_NAME, this.setDark)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "htl-theme-switcher": ThemeSwitcher
  }
}