# Deploy ESM Landing to Vercel

All code changes are complete. Run these commands from your Windows terminal (PowerShell or CMD) in the esm-landing folder.

## Step 1 — Build

```bash
npm run build
```

This generates the `dist/` folder with all the new pages:
- Research tab (MarketResearch.jsx)
- Ontrac Solutions dashboard
- Mylo dashboard
- TechBizGlobal dashboard
- 13 total companies in SmartProDS intel

## Step 2 — Deploy to Vercel (first time)

```bash
npm install -g vercel
vercel login
vercel --prod
```

Follow the prompts:
- Set up and deploy? → Y
- Which scope? → pick your account (team_WKHwCt9AQJODfs5lYoVa2avp)
- Link to existing project? → N (first time)
- Project name: esm-landing (or any name)
- Build command: npm run build
- Output directory: dist
- Development command: npm run dev

## Step 2 (alternative) — Push to GitHub → Vercel auto-deploys

```bash
git add .
git commit -m "Add Research tab, 3 new dashboards, 13 companies"
git push origin master
```

Then go to vercel.com → New Project → Import from GitHub → asizux2/SmartProDS
Vercel will auto-build and give you a live URL.

## Step 3 — NotebookLM (next session)

After getting the live Vercel URL, start a new Cowork session and run:
```
/notebooklm
```

The notebook already exists:
- **ID**: 65157c6d-d943-4e01-8118-7ed36c558b15
- **Title**: Ontrac Solutions — Telecom & Fintech BI Market Research Egypt 2026
- **URL**: https://notebooklm.google.com/notebook/65157c6d-d943-4e01-8118-7ed36c558b15

In a fresh Cowork session, notebooklm-py should install correctly from PyPI.
Then:
```bash
notebooklm use 65157c6d-d943-4e01-8118-7ed36c558b15
notebooklm source add ./setup_notebooklm.sh   # or /tmp/ontrac_market_research.txt
notebooklm generate audio "Focus on Telecom x Fintech BI opportunity in Egypt"
notebooklm generate infographic --orientation landscape --detail detailed
notebooklm download audio ./public/research/ontrac_audio.mp3
notebooklm download infographic ./public/research/ontrac_infographic.png
```

Then redeploy: `vercel --prod`

## Files ready in public/research/

The MarketResearch component already points to:
- `/research/ontrac_audio.mp3`
- `/research/ontrac_infographic.png`

Just drop those files in `public/research/` and redeploy.
