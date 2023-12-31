// import { build, collectPages } from '../framework/pages/index.ts'
// import { logger } from '../framework/logger/pino.ts'

// import config from '../build.config.ts'
// import { join } from 'node:path'

// export interface BuildOptions {
//   outdir: string
//   entry: string

//   // modulesDir: string
//   pagesDir: string
// }

// /* -------------------------------------------------------------------------- */
// /*                                 Core logic                                 */
// /* -------------------------------------------------------------------------- */

// export async function buildJs(path: string) {
//   const start = Date.now()

//   const result = await Bun.build({
//     entrypoints: [path],
//     outdir: config.outdir,
//     root: "./app",
//     minify: true,
//   })

//   const end = Date.now()
//   if (result.success)
//     return logger.info({ elapsed: `${end - start}ms` }, `Successfully build: ${path}`)
//   return logger.error({ error: new AggregateError(result.logs) }, `Build failed`)
// }

// const initialPages = await collectPages(config.pagesDir)
// async function initialBuild(): Promise<void> {
//   const start = Date.now()

//   logger.info(`Collected ${Object.keys(initialPages).length} page(s)`)
//   const errors = await Promise.all(
//     Object.entries(initialPages)
//       .map(([k, page]) => build({
//         ...page,
//         to: join(config.outdir, page.to)
//       }))
//   ).then(errors => errors.filter(i => i != null))

//   const end = Date.now()
//   if (errors.length > 0)
//     return logger.error(`Number of page(s) failed to render: ${errors.length}`)
//   return logger.info({ elapsed: `${end - start}ms` }, `Successfully rendered ${Object.keys(initialPages).length} page(s)`)
// }

// /* -------------------------------------------------------------------------- */
// /*                              Main instruction                              */
// /* -------------------------------------------------------------------------- */

// await Promise.all([
//   initialBuild(),
//   buildJs(config.entry)
// ])