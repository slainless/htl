import { html, type TemplateResult } from 'lit'

export function TranslatePanel(inputPane?: any, outputPane?: any) {
  return html`
    <div class="translate-panel">
      <div class="translate-panel__input-pane">${inputPane}</div>
      <div class="translate-panel__output-pane">${outputPane}</div>
    </div>
  `
}