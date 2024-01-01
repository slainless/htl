import { logger } from '!logger/pino.ts'
import config from '../build.config.ts'
import { context, type BuildOptions, build } from 'esbuild'
import { sassPlugin } from 'esbuild-sass-plugin'
import { tsconfigImportMapper } from '!framework/plugins/import-mapper.ts'
import { fixCssImportPlugin } from '!framework/plugins/css-import.ts'

const isDev = process.env.ENV === 'development'
const outdir = isDev ? config.dev.outDir : config.build.outDir
const options: BuildOptions = {
  entryPoints: ['./app/index.ts', './app/index.scss', './app/theme.scss'],
  outdir,
  format: "esm",
  bundle: true,
  minify: true,
  loader: {
    '.woff': "copy",
    '.woff2': "copy"
  },
  plugins: [
    sassPlugin({
      // importMapper: tsconfigImportMapper(),
      // cssImports: true,
    }),
    // fixCssImportPlugin()
  ]
}

if (process.env.WATCH) {
  const ctx = await context(options)
  await ctx.watch()
  logger.info("(esbuild) Watching...")
} else {
  await build(options)
}