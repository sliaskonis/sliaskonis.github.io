# My personal website

My personal website forked from [bchiang7](https://github.com/bchiang7/bchiang7.github.io)

## Overview

This repository contains a Jekyll-based personal website with a Gulp pipeline for compiling styles/scripts, optimizing images, and running local development with BrowserSync.

## Tech Stack

- Jekyll (Ruby static site generator)
- Gulp 4 (task runner)
- Sass (via `gulp-sass` + Dart Sass)
- BrowserSync (local dev server/reload)
- ESLint (JavaScript linting through the shared `@nuscout` config)

## Dependencies / Prerequisites

You need the following installed locally:

- Node.js and npm
- Ruby and Jekyll (the Gulp tasks shell out to `jekyll`)

Node version notes:

- `.nvmrc` is included (`v10.13.0`) for the original project setup
- The Sass toolchain in this repo has been updated to use Dart Sass, which avoids the old `node-sass` install issue on newer Node versions

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start local development (build + serve + watch):

```bash
npm run start
```

3. Build a production-style output:

```bash
npm run build
```

## Available npm Scripts

- `npm run start`: runs `gulp serve --watch`, builds Jekyll with `_config_dev.yml`, serves `_site/`, and watches SCSS/JS/templates
- `npm run build`: runs `gulp build` (assets + Jekyll production-style build)

## Project Structure

- `index.html`, `404.html`: top-level pages
- `_layouts/`, `_includes/`: Jekyll templates and reusable partials
- `_data/*.yml`: structured content (skills, experience, projects)
- `_scss/`, `_scss/partials/`: source stylesheets
- `_scripts/`: source JavaScript files processed by Gulp
- `css/`, `js/`: generated assets for local serving/deploy output
- `build/`: Gulp task modules (`sass`, `scripts`, `images`, `browsersync`)
- `img/`, `fonts/`: static assets

## Troubleshooting

### `npm install` fails with `EACCES` in `~/.npm`

This is a local npm cache permission issue (usually caused by previous `sudo npm` usage), not a website code issue. Fix it with:

```bash
sudo chown -R "$(id -u)":"$(id -g)" ~/.npm
```

### `jekyll` command not found

Install Jekyll in your Ruby environment, then rerun `npm run start` or `npm run build`.
