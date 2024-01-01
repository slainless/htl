import type { OnLoadResult, OnResolveResult, Plugin } from 'esbuild'
import { extname } from 'path'

export function fixCssImportPlugin(): Plugin {
  return {
    name: "fix-css-import",
    setup(build) {
      build.onResolve({ filter: /^~.*$/ }, async (args) => {
        if (args.kind != 'url-token') return
        if (args.importer == null) return
        if (['.scss', '.css', '.sass'].includes(extname(args.importer)) == false) return
        const result = {
          path: require.resolve(args.path.slice(1)),
          namespace: "file",
        } satisfies OnResolveResult
        return result
      })
    }
  }
}