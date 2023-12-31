import { Router, type ServeOptions } from '@stricjs/router'
import type { BunFile } from 'bun'

import { statSync, mkdirSync } from 'node:fs'
import { stat } from 'node:fs/promises'
import { join } from 'node:path'

const ErrorNotFound = new Error("Not found")
const ErrorIsDirectory = new Error("Index.html is directory WTF!")

export class UnionFS {
  cache: Record<string, BunFile> = {}

  constructor(private folders: string[]) {
    for (const folder of folders) {
      const stat = statSync(folder, { throwIfNoEntry: false })
      if (stat == null) {
        mkdirSync(folder, { recursive: true })
        continue
      }

      if (stat.isDirectory() == false)
        throw new Error(`${folder} is not a directory!`)
    }
  }

  async get(path: string): Promise<BunFile> {
    for (const folder of this.folders) {
      const _path = join(folder, path)
      try {
        const _stat = await stat(_path).catch(e => null)
        // if file is not exist, then continue
        if (_stat == null) continue
        // if file is directory
        if (_stat.isDirectory()) {
          const __path = join(_path, "index.html")
          // check directory/index.html
          const _stat = await stat(__path).catch(e => null)
          // if directory/index.html is null then continue
          if (_stat == null) continue
          // if directory/index.html is directory, throw error
          if (_stat.isDirectory()) throw ErrorIsDirectory
          // return existing file
          return Bun.file(__path)
        }
        return Bun.file(_path)
      } catch (e) {
        throw e
      }
    }
    throw ErrorNotFound
  }

  invalidate(path: string) {
    delete this.cache[path]
  }
}

export function serve(folders: string[], opts?: Partial<ServeOptions>) {
  const ufs = new UnionFS(folders)
  return new Router(opts).
    get('/*', async (ctx, opts) => {
      const path = ctx.params["*"]
      console.log(`Request: ${path}`)

      try {
        const file = await ufs.get(path)
        return new Response(file, { status: 200 })
      } catch (e) {
        if (e === ErrorNotFound) return new Response("Not found", { status: 404 })
        if (e instanceof Error) return new Response(e.stack, { status: 500 })
        else return new Response(`Unknown error: ${Bun.inspect(e)}`, { status: 500 })
      }
    })
}