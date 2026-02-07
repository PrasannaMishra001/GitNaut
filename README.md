# 🚀 GitNaut x Portfolio

![GitNaut Logo](public/logo.png)

GitNaut is a terminal-first GitHub intelligence desk for fast repo insights, designed and maintained by **Prasanna Mishra** (`PrasannaMishra001`).

## 🎥 Demo Videos

0.

<video src="public/0.mp4" controls muted playsinline width="100%"></video>

1.

![Clip 1](public/1.png)

2.

![Clip 2](public/2.png)

3.

![Clip 3](public/3.png)

## 👋 About Prasanna

- Contributor to [omegaup](https://github.com/omegaup/omegaup)
- Focused on **problem solving**, **backend-heavy systems**, and **applied ML**
- Currently learning **Machine Learning & Deep Learning** with practical projects
- 📫 Reach me at: **prasanna.iiitm@gmail.com**

## ⚡ What GitNaut Does

- Repo summaries, language breakdowns, and quick stats
- Contributor and activity snapshots
- PR/issue counts plus recent items
- File tree inspection and file previews
- Terminal UX with history, autocomplete, and themes

## 🧩 Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express
- **Styling**: Tailwind CSS
- **APIs**: GitHub REST API

## 🚀 Quick Start

```bash
git clone https://github.com/PrasannaMishra001/gitnaut.git
cd gitnaut
npm install
cd server
npm install
cd ..
npm run dev:all
```

Open `http://localhost:5173` (Vite will pick the next port if 5173 is busy).

## 🔐 GitHub Token (Local Only)

To avoid GitHub API rate limits, copy [server/.env.example](server/.env.example) to `server/.env` and add:

```
GITHUB_TOKEN=your_token_here
```

`server/.env` is ignored by git.

## 🧭 Local Env Setup

### Backend (.env)

Create `server/.env` with:

```
GITHUB_TOKEN=your_token_here
GITNAUT_ALLOW_TOKEN_HEADER=false
GITNAUT_ALLOWED_ORIGINS=http://localhost:5173
GITNAUT_CACHE_TTL_MS=60000
PORT=4000
```

### Frontend (optional)

If you run the frontend separately from the backend, set:

```
VITE_API_BASE=https://your-backend-url
```

When using `npm run dev:all`, Vite proxies `/api` to `http://localhost:4000` via [vite.config.ts](vite.config.ts).

## ⌨️ Commands

| Command | Description | Example |
| --- | --- | --- |
| `help` | Show available commands | `help` |
| `gitnaut help` | GitNaut analytics help | `gitnaut help` |
| `gitnaut repo` | Repo summary | `gitnaut repo omegaup/omegaup` |
| `gitnaut languages` | Language breakdown | `gitnaut languages owner/repo` |
| `gitnaut contributors` | Top contributors | `gitnaut contributors owner/repo` |
| `gitnaut prs` | PR counts + recent | `gitnaut prs owner/repo` |
| `gitnaut issues` | Issue counts + recent | `gitnaut issues owner/repo` |
| `gitnaut tree` | Top file sizes | `gitnaut tree owner/repo main` |
| `gitnaut file` | File preview + copy | `gitnaut file owner/repo src/App.tsx` |
| `projects` | List projects | `projects` |
| `skills` | Skills matrix | `skills` |
| `contact` | Contact info | `contact` |
| `whoami` | About me | `whoami` |
| `history` | Command history | `history` |
| `theme [name]` | Switch theme | `theme blue` |
| `clear` / `cls` | Clear terminal | `clear` |
| `logout` / `exit` | Exit terminal | `logout` |
| `gitnaut pr-analysis` | PR analysis + graph | `gitnaut pr-analysis owner/repo --focus user` |

## 🔗 Links

- GitHub: https://github.com/PrasannaMishra001
- LeetCode: https://leetcode.com/u/Prasanna_Mishra/
- Codeforces: https://codeforces.com/profile/prasanna_mishra
- Kaggle: https://www.kaggle.com/prasannamishra
- Medium: https://medium.com/@mishra.prasanna838
- X: https://x.com/mishra_discover

## 🖼️ Screenshots

![Screenshot 1](public/1.png)
![Screenshot 2](public/2.png)
![Screenshot 3](public/3.png)

## 📚 Docs

- PR analysis: [docs/pr-analysis.md](docs/pr-analysis.md)

## 📜 License

MIT. See [LICENSE](LICENSE).
