import { readdir } from 'node:fs/promises'
import { join, dirname, relative } from 'node:path'

export interface Page {
  source: string
  to: string
  mount: string
}

const rgxPageEnding = /page.ts$/

export function pathToPage(path: string, params: { root?: string; out?: string }): Page | undefined {
  if (rgxPageEnding.test(path) == false) return
  const rel = params.root != null ? relative(params.root, path) : path
  const to = rel.replace(rgxPageEnding, "index.html")
  return {
    mount: dirname(rel),
    to: params.out ? join(params.out, to) : to,
    source: path
  } satisfies Page
}

export async function collectPages(path: string, toDir?: string): Promise<Page[]> {
  const entries = await readdir(path, {
    withFileTypes: true,
    recursive: true,
  })

  return entries
    .filter(entry => entry.isDirectory() == false)
    .map(entry => pathToPage(join(path, entry.name), { root: path, out: toDir }) satisfies Page | undefined)
    .filter(entry => entry != null) as Page[]
}
