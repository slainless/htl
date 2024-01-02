import { html } from 'lit'

export function MainPanel(translatePanel?: any, settingsPanel?: any) {
  return html`
    <div class="main-panel">
      <cds-tabs class="main-panel__tabs" value="translate" type="contained">
        <cds-tab id="tab-translate" target="panel-translate" value="translate">Translate</cds-tab>
        <cds-tab id="tab-settings" target="panel-settings" value="settings">Settings</cds-tab>
      </cds-tabs>
      <div class="main-panel__panel">
        <div id="panel-translate" role="tabpanel" aria-labelledby="tab-translate">
          ${translatePanel}
        </div>
        <div id="panel-settings" role="tabpanel" aria-labelledby="tab-settings" hidden>
          ${settingsPanel}
        </div>
      </div>
    </div>
  `
}