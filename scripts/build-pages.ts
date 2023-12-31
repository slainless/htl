import { build, collectPages, pathToPage, watch } from '!framework/pages/index.js'
import { logger } from '!logger/pino.js'

import config from '../build.config.js'

const isDev = process.env.ENV == 'development'
const outDir = isDev ? config.dev.outDir : config.build.outDir

/* -------------------------------------------------------------------------- */
/*                                 Core logic                                 */
/* -------------------------------------------------------------------------- */

const initialPages = await collectPages(config.pagesDir, outDir)
async function initialBuild(): Promise<void> {
  const start = Date.now()

  logger.info(`Collected ${initialPages.length} page(s)`)
  const errors = await Promise.all(initialPages.map(page => build(page)))
    .then(errors => errors.filter(i => i != null))

  const end = Date.now()
  if (errors.length > 0)
    return logger.error(`Number of page(s) failed to render: ${errors.length}`)
  return logger.info({ elapsed: `${end - start}ms` }, `Successfully rendered ${Object.keys(initialPages).length} page(s)`)
}

/* -------------------------------------------------------------------------- */
/*                              Main instruction                              */
/* -------------------------------------------------------------------------- */

await initialBuild()
if (process.env.CHOKIDAR_WATCH) {
  const watcher = watch(config.pagesDir, outDir)

  await new Promise((res, rej) => {
    process.on("SIGINT", async (s) => {
      logger.info("SIGINT received, closing process...")
      await watcher.close()
      logger.info("Closed watcher")
      process.exit(0)
    })
  })
}