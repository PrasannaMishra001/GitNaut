# Resume Update Guide

Step-by-step instructions for updating the resume and syncing the PDF link everywhere.

---

## Step 1 — Edit the LaTeX Source on Overleaf

1. Open your Overleaf project (share it from: [overleaf.com](https://overleaf.com))
2. Make your edits in `main.tex`
3. Click **Recompile** and verify the PDF looks correct
4. Download the PDF: **Menu → Download PDF**

---

## Step 2 — Upload the New PDF to Google Drive (keeping the same link)

> **Important:** Use "Manage versions" — this replaces the file content while keeping the same file ID and shareable link. No code changes needed.

1. Go to [drive.google.com](https://drive.google.com) and find your `Resume.pdf`
2. Right-click it → **Manage versions**
3. Click **Upload new version** → select your new PDF
4. Done. The existing link (`https://drive.google.com/file/d/1azi86BgfU5daak5iSA-Z5VR6YqgsXRj3/view?usp=sharing`) now serves the new PDF automatically — **no link updates required**

> Only proceed to Step 3 if you accidentally deleted the old file and uploaded a fresh one with a different Drive ID.

---

## Step 3 — Update the Drive Link in This Repo

If you uploaded a **new file** (different Drive ID), update the link in these 5 places:

| File | Location | What to change |
|------|----------|---------------|
| `src/components/sections/WhoAmI.tsx` | Line ~40 | `href="https://drive.google.com/..."` |
| `README.md` | Badge row near top | `?url=https://drive.google.com/...` |

> If you replaced the same file on Drive (same link), skip this step.

---

## Step 4 — Update the Link in the Portfolio Site

File: `c:\Users\mishr\Downloads\prasannamishra\index.html`

Locations:
1. **Navbar** — `<a href="..." class="nav-resume">Resume</a>` (~line 27)
2. **Hero section** — `<a href="..." class="resume-link">` (~line 65)

Change the `href` in both places to the new Drive link.

---

## Step 5 — Update the Link in the LaTeX Header

File: `main.tex`

The `\website` command is already set to the portfolio URL — **do not change this**.  
The resume PDF link is **not** in the LaTeX header (by design, keeps it clean).

---

## Step 6 — Commit and Push Everything

```bash
# Push GitNaut repo
cd "c:\Users\mishr\Downloads\terminal-portfolio-main\GitNaut"
git add src/components/sections/WhoAmI.tsx README.md
git commit -m "chore: update resume PDF link"
git push

# Push portfolio site
cd "c:\Users\mishr\Downloads\prasannamishra"
git add index.html
git commit -m "chore: update resume PDF link in navbar and hero"
git push
```

---

## Step 7 — Verify Live

| Site | URL |
|------|-----|
| GitNaut terminal | [git-naut.vercel.app](https://git-naut.vercel.app) |
| Portfolio | [prasannamishra001.github.io/prasannamishra](https://prasannamishra001.github.io/prasannamishra/) |

Run `whoami` in GitNaut terminal and click the resume link to confirm it opens the correct PDF.

---

## Files That Contain the Drive Link (Quick Reference)

```
GitNaut/src/components/sections/WhoAmI.tsx
GitNaut/README.md
prasannamishra/index.html  (×2: navbar + hero)
```

---

## AI Assistant Prompt (paste this when updating links)

```
I have a new resume PDF Drive link: https://drive.google.com/file/d/NEW_ID/view?usp=sharing

Please update this link in:
1. GitNaut/src/components/sections/WhoAmI.tsx — the href for the Resume line
2. GitNaut/README.md — the resume badge URL
3. prasannamishra/index.html — the nav-resume href (line ~27) and the hero resume-link href (line ~65)

Replace the old link: https://drive.google.com/file/d/OLD_ID/view?usp=sharing
```

---

*Last updated: see git log*
