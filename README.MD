# Hive Account Recovery App

Simple toolset to find information about recovery accounts and change account keys.

## Development

```bash
npm install
npm run dev
```

## Building for Production

```bash
npm run build
```

## Deployment to GitHub Pages

This app is configured for static deployment to GitHub Pages. The build process generates a static SPA (Single Page Application) that works properly on GitHub Pages.

### Automatic Deployment

```bash
npm run deploy
```

This command will:

1. Build the app for production
2. Deploy to the `gh-pages` branch
3. Set up proper routing for client-side navigation

### Manual Deployment

If you prefer to deploy manually:

1. Build the app: `npm run build`
2. The static files will be in `build/client/`
3. Deploy the contents of `build/client/` to your GitHub Pages branch

## Configuration

The app is configured for GitHub Pages with:

- SPA mode (no SSR) for static hosting
- Root-relative paths for assets and routing
- Client-side routing support with 404.html fallback
- Custom domain support via CNAME file

## Local Development vs Production

- **Local**: Runs with SSR enabled for better development experience
- **Production**: Built as static SPA for GitHub Pages compatibility

The configuration automatically switches between these modes based on the build target.
