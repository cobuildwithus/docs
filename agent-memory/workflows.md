# Workflows

## 2026-02-13 - Open Infra docs updates

- Added a new self-hosted docs page for the Cobuild website interface based on the `interface` repo.
- Updated Open Infra navigation in `vocs.config.ts` and `pages/self-hosted/index.mdx` to include `/self-hosted/interface`.
- Source of truth for interface setup commands: `interface/README.md` and `interface/CONTRIBUTING.md`.
- Updated docs and interface README to require `cd apps/contracts && pnpm generate` before `pnpm dev:web`, including `postgenerate` sync targets for `abis.ts` and `addresses.ts`.
