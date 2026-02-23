# Repository Guidelines

## Project Structure & Module Organization
This repository is a Jekyll-based personal site with a Gulp-driven asset pipeline.

- `index.html`, `404.html`: top-level pages.
- `_layouts/`, `_includes/`: Jekyll templates and reusable HTML partials.
- `_data/*.yml`: structured content (skills, experience, projects).
- `_scss/` and `_scss/partials/`: source stylesheets.
- `_scripts/`: source JavaScript files processed by Gulp.
- `css/`, `js/`: generated assets copied for local serving/deploy output.
- `build/`: Gulp task modules (`sass`, `scripts`, `images`, `browsersync`).
- `img/`, `fonts/`: static assets.

## Build, Test, and Development Commands
- `npm install`: install Node dependencies.
- `npm run start`: runs `gulp serve --watch`, builds Jekyll with `_config_dev.yml`, serves `_site/`, and watches SCSS/JS/templates.
- `npm run build`: runs `gulp build` for a production-style asset + Jekyll build.
- `jekyll build`: optional direct Jekyll build (used internally by Gulp tasks).

Note: `gulp serve` shells out to `jekyll`, so Ruby/Jekyll must be installed locally.

## Coding Style & Naming Conventions
- Use 2-space indentation in JS, SCSS, HTML, and YAML.
- Keep semicolons in JavaScript and prefer `const`/`let` over `var` (matches existing code).
- SCSS partials live under `_scss/partials/` and use underscore-prefixed filenames (for example, `_intro.scss`).
- Use kebab-case for CSS classes/IDs and asset filenames where practical.
- JavaScript in `_scripts/` is linted via `gulp-eslint` using the shared `@nuscout` config (`.eslintrc`).

## Testing Guidelines
There is no automated test suite in this repository today.

- Run `npm run build` before opening a PR to catch build/lint issues.
- Manually verify key pages locally with `npm run start` (home page, theme toggle, scroll interactions, responsive layout).
- If you change content in `_data/` or templates, confirm the rendered output in `_site/`.

## Commit & Pull Request Guidelines
- Follow the existing history style: short, imperative commit messages (for example, `Update resume`, `Change intro copy`).
- Keep commits focused on one change type (content, styles, build tooling, etc.).
- PRs should include: a brief summary, affected pages/sections, and screenshots/GIFs for UI changes.
- Link related issues/tasks when applicable and note any manual verification steps performed.
