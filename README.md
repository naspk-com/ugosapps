# NASPK Legal & Privacy Center

Source of <https://legal.naspk.com> — the compliance center for NASPK's UGOS Pro
cloud-drive apps. Every app keeps its own document directory (privacy policy,
license agreement, third-party notices and support), in Chinese and English.

Built with Vue 3 + Vite + TypeScript + vue-i18n. No router dependency, no CDN
script, no remote font — the whole site is static files.

## Why one directory per app

Apps differ in login flow, provider, optional AI features and bundled
components, so a single shared policy would be inaccurate. Each app therefore
owns the concrete URLs approved by the app center:

| URL | Content |
| --- | --- |
| `/` | Legal center (zh-CN) |
| `/en/index.html` | Legal center (English) |
| `/<app>/index.html` | App document hub |
| `/<app>/privacy.html` | Privacy policy |
| `/<app>/terms.html` | License agreement |
| `/<app>/third-party.html` | Third-party components and licenses |
| `/<app>/support.html` | Support and troubleshooting |
| `/<app>/en/<doc>.html` | English version of each document |

These `.html` paths are published as real files, so they work on any static
host without rewrite rules and keep working when JavaScript is disabled.

## Development

Node.js 20.19+ or 22.12+ (Vite 7 requirement).

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # vue-tsc --noEmit
npm run build      # typecheck + bundle + emit alias pages and sitemap
npm run preview    # serve dist/ locally
```

`npm run build` produces:

- `dist/assets/*` — hashed JS/CSS bundles
- 102 alias pages copied from `dist/index.html`, each with its own `<title>`,
  description, canonical and `hreflang` links
- `dist/sitemap.xml` with `xhtml:link` alternates for every URL
- `dist/404.html` (`noindex`)
- `dist/favicon.svg`, `dist/robots.txt`

## Deployment

Upload the contents of `dist/` (not the folder) to the site root of EdgeOne
Pages or ESA Pages:

- Build command: `npm run build`
- Output directory: `dist`
- No SPA rewrite rule is required — every public path exists as a file.

## Project structure

```
index.html                  Vite entry, shared <head> defaults
scripts/emit-static-pages.mjs  Post-build alias pages + sitemap
src/
  App.vue                   Route switch, title/canonical sync, scroll progress
  router.ts                 Minimal path parser (no vue-router)
  theme.ts                  auto / light / dark, persisted in localStorage
  i18n/
    index.ts                createI18n setup
    ui/{zh-CN,en-US}.ts     Interface strings
    docs/
      apps.ts               App metadata (slug, id, names, portal, login)
      types.ts              Block / DocPage / DocSet types
      {zh-CN,en-US}.ts      Document templates rendered per app
      index.ts              getDoc, docPath, homePath helpers
  components/               Header, footer, inline SVG icons
  views/                    Home, app hub, document, 404
  styles/main.css           Design tokens, light/dark themes, layout
public/                     favicon.svg, robots.txt
```

### How routing works

[`parsePath`](src/router.ts) turns a pathname into one of four route kinds
(`home`, `app`, `doc`, `notfound`) and understands `/`, `/index.html`,
`/en/index.html`, `/<app>/`, `/<app>/index.html`, `/<app>/<doc>.html` and
`/<app>/en/<doc>.html`. Internal links are intercepted and pushed with
`history.pushState`; `popstate` keeps back/forward working.

### How documents are generated

Documents are templates, not 100 hand-written pages: each `DocSet` exports four
functions that receive an `AppInfo` and return a `DocPage` (sections of text,
lists, notices and tables). Content that only applies to some apps — for
example the bundled Xunlei engine — is added conditionally inside the template.

### Adding an app

1. Append the app to [`src/i18n/docs/apps.ts`](src/i18n/docs/apps.ts) with a
   `slug` matching its directory name, and add its icon to `src/assets/apps/`
   (128 × 128 PNG, copied from the app project) so the home list shows the real
   logo.
2. If it needs provider-specific wording, branch inside the templates in
   `src/i18n/docs/{zh-CN,en-US}.ts`.
3. Add the slug to the `apps` array in `scripts/emit-static-pages.mjs` so alias
   pages and sitemap entries are emitted.
4. Update `index.html` `<noscript>` example links if a new canonical entry point
   is preferred.
5. Run `npm run build` and check the new directory in `dist/`.

The interface language packs in `src/i18n/ui/` are shared by all apps.

## License

Source code is released under the [MIT License](LICENSE). The legal texts
published on the site are not covered by the MIT grant — all rights reserved by
the app developer.
