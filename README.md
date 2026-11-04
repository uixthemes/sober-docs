# Sober Docs

User documentation for the [Sober](https://themeforest.net/item/sober-woocommerce-wordpress-theme/18332889) WooCommerce WordPress theme by UIX Themes, built with [Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/).

Live site: `https://docs.uix.store/sober/`

## Setup

Requirements: **Node 22 LTS** and **pnpm**.

```bash
nvm use            # picks up Node 22 from .nvmrc
pnpm install
pnpm dev           # http://localhost:4321/sober/
```

## Useful scripts

| Script         | What it does                                            |
| -------------- | ------------------------------------------------------- |
| `pnpm dev`     | Start the local dev server                              |
| `pnpm build`   | Build the production site to `./dist` (validates links) |
| `pnpm preview` | Preview the built site                                  |
| `pnpm check`   | Run Astro type-checking                                 |

## Writing a page

Every page lives in `src/content/docs/<section>/`. The filename becomes the URL slug.

Required frontmatter:

```yaml
---
title: Install Sober Theme
description: Upload the Sober theme to WordPress and activate it from the dashboard or via FTP.
sidebar:
  order: 2 # position inside its sidebar section
---
```

`description` is the meta description — keep it specific and under ~160 characters.

### Links

Link to other pages with absolute paths that include the `/sober` base and a trailing slash, e.g. `[Display Settings](/sober/page/display-settings/)`. `pnpm build` fails on any broken link or missing heading anchor (via `starlight-links-validator`).

### Images

Images live in `src/assets/<section>/` (images used by several sections live in `src/assets/shared/`). Reference them relatively so Astro can optimize them:

```md
![Customize Header](../../../assets/theme-options/customize-header.png)
```

To float a screenshot beside the text (as the old docs did), add an alignment suffix: `#alignright`, `#alignleft`, `#alignrightfull` or `#alignleft50`. See `src/plugins/remark-image-align.mjs`.

### Callouts

Use Starlight asides:

```md
:::note
Text
:::

:::caution[Important]
Text
:::
```

## Quality gates

Pre-commit (husky + lint-staged) formats and lints staged files:

- **Prettier** — formats Markdown and config files.
- **Markdownlint** — catches broken Markdown.

To run them manually:

```bash
pnpm exec prettier --check .
pnpm exec markdownlint-cli2
```

## Deploying

`.github/workflows/deploy.yml` builds the site, `rsync`s `./dist/` to the VPS, and purges the Cloudflare cache for `/sober/*`. It is manual-only (`workflow_dispatch`) until these repo secrets are configured:

- `VPS_SSH_HOST`, `VPS_SSH_USER`, `VPS_SSH_KEY`, `VPS_DEPLOY_PATH`
- `VPS_SSH_PORT` (optional, defaults to 22)
- `CLOUDFLARE_ZONE_ID`, `CLOUDFLARE_API_TOKEN`

To deploy from your machine instead, use `./deploy.sh` (supports `--dry-run` and `--no-build`).

## Project structure

```text
.
├── astro.config.mjs            # site, base, sidebar, plugins
├── src/
│   ├── content.config.ts       # Starlight content collection schema
│   ├── content/docs/           # all docs pages
│   ├── assets/                 # screenshots (mirror docs sections)
│   ├── components/             # Starlight component overrides
│   ├── plugins/                # remark plugins
│   └── styles/custom.css       # brand overrides
├── .github/workflows/          # CI / deploy
└── deploy.sh                   # manual deploy script
```
