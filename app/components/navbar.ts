import { html } from 'lit'

export interface NavbarProps { }
export function Navbar(props?: NavbarProps) {
  return html`<div class="navbar">
    <div class="navbar-logo"></div>
    <nav class="navbar-list">
      <a>About</a>
    </nav>
    <div class="navbar-setting">
      <cds-button>S</cds-button>
    </div>
  </div>`
}