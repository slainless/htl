import { logger } from '!logger/pino.ts'
import config from '../build.config.ts'
import { context, type BuildOptions, build } from 'esbuild'
import { sassPlugin } from 'esbuild-sass-plugin'

const isDev = process.env.ENV === 'development'
const outdir = isDev ? config.dev.outDir : config.build.outDir
const options: BuildOptions = {
  entryPoints: ['./app/index.ts'],
  outdir,
  format: "esm",
  bundle: true,
  minify: true,
  plugins: [sassPlugin()]
}

if (process.env.WATCH) {
  const ctx = await context(options)
  await ctx.watch()
  logger.info("(esbuild) Watching...")
} else {
  await build(options)
}