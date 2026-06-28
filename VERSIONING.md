# Versioning Policy

CS-Styles uses semantic versioning, with the following rules:

## Version format

Versions follow `MAJOR.MINOR.PATCH`.

- `MAJOR` changes are reserved for breaking changes.
- `MINOR` changes add backward-compatible functionality.
- `PATCH` changes fix bugs or make non-breaking adjustments.

## Release rules

1. A release must reflect the impact on the public CSS API.
2. Any change that breaks existing selectors, tokens, or entry points requires a `MAJOR` bump.
3. Backward-compatible additions to components, utilities, themes, or docs require a `MINOR` bump.
4. Fixes that do not change the public contract require a `PATCH` bump.
5. Experimental or internal changes stay in `Unreleased` until they are stable enough to ship.

## Breaking changes

Breaking changes include, but are not limited to:

- removal or rename of public CSS variables
- rename or removal of entry files
- selector changes that alter existing markup contracts
- behavior changes that require user migration

When a breaking change is introduced, document:

- what changed
- what breaks
- how to migrate

## Tagging

- Every published version should be tagged in git.
- Release notes should map directly to the version published in npm.
- `CHANGELOG.md` is the source of truth for release history.
