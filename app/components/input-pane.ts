import { LitElement, html, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'
import styles from './input-pane.scss?raw'

@customElement("input-pane")
export class InputPane extends LitElement {
  static styles = unsafeCSS(styles)

  render() {
    return html`
      <div class="input-pane">
        Hehe
      </div>
    `
  }
}