# Cobuild Docs

Documentation site for Cobuild, built with Vocs.

## Development

Install dependencies:

```bash
pnpm install
```

Run the docs site:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

## OpenAI File Search Upload

Upload docs files into an OpenAI vector store for file search:

```bash
OPENAI_API_KEY=... DOCS_VECTOR_STORE_ID=... pnpm upload-docs
```

Flags:

```bash
pnpm upload-docs -- --purge
pnpm upload-docs -- --vector-store-id=vs_...
```

## License

MIT. See `LICENSE`. Third-party licenses are in `licenses/`.
