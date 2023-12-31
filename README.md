# htl

Translation app to translate (for now) an entire page of document using outsourced LLM.

Developed with:

- Bun
- Lit & Lit SSR
- Sass
- Storybook
- IBM's Carbon Design System

## About the framework

This project is implemented using basic framework, making use of `lit` and `@lit-labs/ssr` as the
main front-end engine and HTML renderer.

While the framework is basically an SSG, it IS possible to transform it into an SSR.

## Project Structure

Main directories:

- `app`: Where the source code resides
- `app/pages`: Special directory that maps to html route, for example: `app/pages/about/page.ts` -> `${outDir}/about/index.html`
- `framework`: Where framework logic reside
- `static`: Static files that will be merged with dev/prod build directory

Generated directories:

- `.dev` and `public`: Where generated entrypoints and pages will be emitted to

Special files:

- `app/index.ts`: Main entrypoint of the app, will be emitted to `${outDir}/index.js`

## Development

Direct development can be done via:

```sh
bun run dev
# or
bun run dev:native
```

Both differs in their watch implementations. `dev` will run pages builder using `chokidar` as file watcher
while `dev:native` will making use of `Bun` `--watch` flag. `dev` will only re-render the changed page while
`dev:native` will re-render the entire `app/pages` tree.

Aside from that, both will also spawn 2 other processes:

- builder for entrypoint `index.ts`
- development web server that serves `.dev` and `static`
