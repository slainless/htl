import config from '../../tsconfig.json' assert { type: "json" }

const slashAsteriskEnding = /\/\*$/
export function tsconfigImportMapper() {
  if (config.compilerOptions.paths == null) return
  const paths = config.compilerOptions.paths
  let regexps = Object.entries(paths).map(([key, v]) => {
    const main = v[0]
    if (main == null) return
    const dirType = key.endsWith("/*")
    return [
      new RegExp(`${key.replace(slashAsteriskEnding, "")}${dirType ? '/(.*)$' : ''}`),
      main.replace(slashAsteriskEnding, "")
    ]
  }).filter(reg => reg != null) as [RegExp, string][]
  regexps = [...regexps, [/^~(.*)/, '']
  ]
  return (path: string) => {
    for (const [reg, main] of regexps) {
      const matches = reg.exec(path)
      if (matches == null) continue
      if (matches.length === 1) return main
      return main + "/" + matches[1]
    }

    return path
  }
}