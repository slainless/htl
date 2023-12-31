import { watch as _watch } from 'chokidar'
import { resolve } from 'node:path'
import { unlink } from 'node:fs/promises'

import { logger } from '!logger/pino.ts'

import { pathToPage } from './collect.ts'
import { build } from './build.ts'

export function watch(pagesDir: string, outDir: string) {
  const watcher = _watch(pagesDir, {
    ignoreInitial: true
  })

  const runBuild = (event: string) => (path: string) => {
    const log = logger.child({ event })
    const page = pathToPage(path, { root: pagesDir, out: outDir })
    if (page == null) return
    log.info(`Detected changes on ${page.source}`)
    build(page)
  }
  watcher.on("change", runBuild("changed"))
  watcher.on("add", runBuild("added"))
  watcher.on("unlink", async (path) => {
    const log = logger.child({ event: "deleted" })
    const page = pathToPage(path, { root: pagesDir, out: outDir })
    if (page == null) return
    log.info(`Detected changes on ${page.source}`)

    try {
      await unlink(page.to)
      log.info(`Deleted page: ${page.to}`)
    } catch (e) {
      log.error({ error: e as Error }, `Failed to delete page: ${page.to}`)
    }

    const absolute = resolve(page.source)
    delete require.cache[absolute]
    log.trace(`Deleted import cache: ${absolute}`)
  })

  return watcher
}