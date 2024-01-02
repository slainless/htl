import { html } from 'lit'
import logoSvg from '!assets/logo.svg?raw'

import Setting16 from '@carbon/web-components/es/icons/settings--adjust/16.js'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js'

export interface NavbarProps {
  contrast?: boolean
}
export function Navbar(props?: NavbarProps) {
  return html`<div class="navbar ${props?.contrast ? `htl--inline--g100 navbar--contrast` : ""}">
    <div class="navbar__logo">
      ${unsafeSVG(logoSvg)}
    </div>
    <div class="spacer"></div>
    <nav class="navbar__list">
      <!-- <cds-button kind="ghost" size="md" class="htl--link--mute">Translate</cds-button> -->
      <cds-button kind="ghost" size="md" class="htl--link--mute">About</cds-button>
    </nav>
    <!--
    <div class="navbar__setting">
      <cds-icon-button tooltip-alignment="bottom" size="md" kind="ghost">
        ${Setting16({ slot: 'icon' })}
        <span slot="tooltip-content"> Tooltip text </span>
      </cds-icon-button>
    </div>
    -->
  </div>`
}