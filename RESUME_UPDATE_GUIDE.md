# Resume Update Guide

Source of truth for the resume is no longer this repo. It lives in:

```
C:\Users\mishr\Downloads\Prasanna_Mishra_Resume\
  current\Prasanna_Mishra_Resume.tex   <- edit this (or the Overleaf copy)
  current\iiitm.png                    <- logo used by the tex
  current\build.sh                     <- builds both PDFs locally and checks 1 page
  versions\                            <- every older PDF / tex, named by date
  README.md                            <- version log
```

`main.tex`, `iiitm.png` and `resume.pdf` in this repo are copies of `current\`.

---

## Step 1 — Edit and build

**Overleaf:** upload `Prasanna_Mishra_Resume.tex` and `iiitm.png`, set the compiler to pdfLaTeX, recompile, download the PDF.

**Locally (WSL has TeX Live installed):**

```powershell
cd C:\Users\mishr\Downloads\Prasanna_Mishra_Resume\current
wsl -d Ubuntu -- bash build.sh
```

This writes `Prasanna_Mishra_Resume.pdf` (college logo) and `Prasanna_Mishra_Resume_ATS.pdf` (no logo), and fails if either is more than one page.

Before replacing `current\`, copy the old PDF into `versions\pdf\` as `YYYY-MM-DD_<note>.pdf` and add a line to the README version log.

---

## Step 2 — Upload the new PDF to Google Drive (same link)

Use **Manage versions** so the file ID and link stay the same:

1. Open drive.google.com and find the resume PDF.
2. Right-click → **Manage versions** → **Upload new version** → pick the new PDF.

The link `https://drive.google.com/file/d/1azi86BgfU5daak5iSA-Z5VR6YqgsXRj3/view?usp=sharing` then serves the new PDF. No code changes are needed.

---

## Step 3 — Only if the Drive file ID changed

Update the link in:

| File | Where |
|------|-------|
| `GitNaut/src/components/sections/WhoAmI.tsx` | Resume line, ~line 130 |
| `GitNaut/README.md` | resume badge near the top |
| `D:\Study-Material\Sem 6\project\portfolio\prasannamishra\index.html` | navbar `nav-resume` (~line 27) and hero resume link (~line 80) |

---

## Step 4 — Sync copies into this repo

```powershell
$c = "C:\Users\mishr\Downloads\Prasanna_Mishra_Resume\current"
$g = "D:\Study-Material\Sem 6\project\portfolio\terminal-portfolio-main\GitNaut"
Copy-Item "$c\Prasanna_Mishra_Resume.pdf" "$g\resume.pdf"
Copy-Item "$c\Prasanna_Mishra_Resume.tex" "$g\main.tex"
Copy-Item "$c\iiitm.png" "$g\iiitm.png"
```

---

## Step 5 — Commit and push (by hand)

```bash
cd "D:/Study-Material/Sem 6/project/portfolio/terminal-portfolio-main/GitNaut"
git add resume.pdf main.tex iiitm.png README.md src/components/sections/WhoAmI.tsx
git commit -m "chore: update resume"
git push

cd "D:/Study-Material/Sem 6/project/portfolio/prasannamishra"
git add index.html
git commit -m "chore: update resume details"
git push
```

---

## Step 6 — Verify live

| Site | URL |
|------|-----|
| GitNaut terminal | https://git-naut.vercel.app |
| Portfolio | https://prasannamishra001.github.io/prasannamishra/ |

Run `whoami` in GitNaut and click the resume link.
