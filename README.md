# Portfolio

React + Vite + TypeScript portfolio.

## Hosting on GitHub Pages
Follow these steps to host this portfolio on GitHub Pages.

### 1. Initialize Git and create repository
```powershell
git init
git add .
git commit -m "feat: initial portfolio"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/portfolio.git
git push -u origin main
```

### 2. Adjust Vite base path
`vite.config.ts` sets `base` to `/portfolio/` automatically on GitHub Actions. If your repository name differs, change it. For a user site repo named `<YOUR_USERNAME>.github.io`, set `base: '/'` permanently.

### 3. Enable GitHub Pages
Settings → Pages → Use the GitHub Actions workflow (already included).

### 4. Deployment workflow
`.github/workflows/deploy.yml` builds and deploys on every push to `main`.

### 5. Access URL
`https://<YOUR_USERNAME>.github.io/portfolio/`

### 6. Troubleshooting
- 404 assets: ensure `base` matches repo name.
- Stale deploy: re-run workflow via Actions tab (workflow_dispatch).

### 7. Local build test
```powershell
npm install
npm run build
npx serve dist   # or any static server to preview
```

Replace `<YOUR_USERNAME>` before using commands.
