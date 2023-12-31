import { render } from '@lit-labs/ssr'
import { logger } from '../logger/pino.ts'
import { pathToFileURL } from 'bun'
import { join, resolve } from 'node:path'
import { type Page, collectPages } from './collect.ts'
import { collectResult } from '@lit-labs/ssr/lib/render-result'

export async function build(page: Page): Promise<Error | undefined> {
  const start = Date.now()

  const absolute = resolve(page.source)
  if (process.env.CHOKIDAR_WATCH) {
    delete require.cache[absolute]
    logger.trace(`Deleted import cache: ${absolute}`)
  }

  const imported = await import(pathToFileURL(absolute).href)
  let err: Error | undefined
  while (true) {
    if (imported.default == null) {
      err = new Error("No default")
      break
    }

    try {
      const result = render(imported.default())
      const html = await collectResult(result)
      await Bun.write(page.to, html)
      break
    } catch (e) {
      if (e instanceof Error)
        err = e
      else err = new Error(Bun.inspect(e))
      break
    }
  }

  const end = Date.now()
  if (err == null) logger.debug({ mount: page.mount, elapsed: `${end - start}ms` }, `Rendered page: ${page.source} -> ${page.to}`)
  else logger.error({ error: err }, `Failed to render page: ${page.source}`)

  return err
}