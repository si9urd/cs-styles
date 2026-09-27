# Commands

```bash
npm run build            # full pipeline: build:css -> build:autoprefix -> build:minify
npm run build:css        # compile scss/ to dist/ (expanded, no source maps)
npm run build:autoprefix # add vendor prefixes via PostCSS to dist/*.css (not *.min.css)
npm run build:minify     # minify dist/*.css to dist/*.min.css via clean-css
npm run watch            # rebuild build:css on any scss/**/*.scss change (nodemon)
npm run dev              # build:css once, then watch
npm run lint             # prettier --write + postcss (css-declaration-sorter) over scss/**/*.scss
npm run theme            # generate scss/themes/_themes_colors.scss from a material-theme*.json source
npm run generate-theme   # generate a Material color theme JSON from a seed hex color
```

There is no test suite. `npm run lint` is the closest thing to a check — run it, and `npm run build`, before considering SCSS changes done. There's no linked task/issue tracker to consult; VERSIONING.md and CHANGELOG.md are the source of truth for release intent.

Dist artifacts (`dist/cs-styles.css`, `dist/cs-styles.min.css`) are committed and generated — after editing `scss/`, run `npm run build` and include the resulting dist changes, don't hand-edit dist.
