import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: new URL('.env', import.meta.url) });

const app = express();
const port = Number(process.env.PORT || 4000);
const cache = new Map();

const defaultTtlMs = Number(process.env.GITNAUT_CACHE_TTL_MS || 60000);
const allowTokenHeader = process.env.GITNAUT_ALLOW_TOKEN_HEADER === 'true';
const allowedOrigins = (process.env.GITNAUT_ALLOWED_ORIGINS || 'http://localhost:5173,https://git-naut.vercel.app').split(',').map(item => item.trim()).filter(Boolean);

app.use(express.json({ limit: '1mb' }));
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('Not allowed by CORS'));
  }
}));

const getCache = (key) => {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > entry.ttlMs) {
    cache.delete(key);
    return null;
  }
  return entry.value;
};

const setCache = (key, value, ttlMs = defaultTtlMs) => {
  cache.set(key, { value, ttlMs, timestamp: Date.now() });
};

const safeNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const getToken = (req) => {
  const envToken = process.env.GITHUB_TOKEN || '';
  if (allowTokenHeader) {
    const headerToken = req.header('x-github-token');
    if (headerToken) return headerToken;
  }
  return envToken;
};

const githubFetch = async (req, url) => {
  const token = getToken(req);
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'GitNaut'
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(url, { headers });
  if (!response.ok) {
    const text = await response.text();
    const error = new Error(`GitHub API error ${response.status}`);
    error.status = response.status;
    error.details = text;
    throw error;
  }
  return response.json();
};

const requireParams = (req, res, keys) => {
  const missing = keys.filter(key => !req.query[key]);
  if (missing.length > 0) {
    res.status(400).json({ error: `Missing query params: ${missing.join(', ')}` });
    return false;
  }
  return true;
};

const normalizeRepoKey = (owner, repo, extra = '') => `${owner}/${repo}${extra}`;

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.get('/api/repo', async (req, res) => {
  if (!requireParams(req, res, ['owner', 'repo'])) return;
  const { owner, repo } = req.query;
  const cacheKey = `repo:${normalizeRepoKey(owner, repo)}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);

  try {
    const data = await githubFetch(req, `https://api.github.com/repos/${owner}/${repo}`);
    const response = {
      name: data.name,
      full_name: data.full_name,
      description: data.description,
      size_kb: data.size,
      stars: data.stargazers_count,
      forks: data.forks_count,
      watchers: data.subscribers_count,
      open_issues: data.open_issues_count,
      default_branch: data.default_branch,
      license: data.license?.spdx_id || null,
      topics: data.topics || [],
      created_at: data.created_at,
      updated_at: data.updated_at,
      html_url: data.html_url,
      owner: data.owner?.login
    };
    setCache(cacheKey, response);
    res.json(response);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message, details: error.details || null });
  }
});

app.get('/api/languages', async (req, res) => {
  if (!requireParams(req, res, ['owner', 'repo'])) return;
  const { owner, repo } = req.query;
  const cacheKey = `languages:${normalizeRepoKey(owner, repo)}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);

  try {
    const data = await githubFetch(req, `https://api.github.com/repos/${owner}/${repo}/languages`);
    const totalBytes = Object.values(data).reduce((sum, value) => sum + value, 0);
    const languages = Object.entries(data).map(([name, bytes]) => ({
      name,
      bytes,
      percent: totalBytes ? Math.round((bytes / totalBytes) * 1000) / 10 : 0
    })).sort((a, b) => b.bytes - a.bytes);

    const response = { totalBytes, languages };
    setCache(cacheKey, response);
    res.json(response);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message, details: error.details || null });
  }
});

app.get('/api/contributors', async (req, res) => {
  if (!requireParams(req, res, ['owner', 'repo'])) return;
  const { owner, repo } = req.query;
  const perPage = safeNumber(req.query.per_page, 30);
  const page = safeNumber(req.query.page, 1);
  const cacheKey = `contributors:${normalizeRepoKey(owner, repo)}:${perPage}:${page}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);

  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=${perPage}&page=${page}&anon=1`;
    const data = await githubFetch(req, url);
    const contributors = data.map(item => ({
      login: item.login || 'anonymous',
      avatar_url: item.avatar_url,
      contributions: item.contributions,
      html_url: item.html_url
    }));
    const response = { contributors, page, perPage };
    setCache(cacheKey, response, 60000);
    res.json(response);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message, details: error.details || null });
  }
});

const searchCount = async (req, query) => {
  const url = `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&per_page=1`;
  const data = await githubFetch(req, url);
  return data.total_count;
};

app.get('/api/prs', async (req, res) => {
  if (!requireParams(req, res, ['owner', 'repo'])) return;
  const { owner, repo } = req.query;
  const cacheKey = `prs:${normalizeRepoKey(owner, repo)}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);

  try {
    const repoQuery = `repo:${owner}/${repo}`;
    const [openCount, closedCount, mergedCount] = await Promise.all([
      searchCount(req, `${repoQuery} is:pr is:open`),
      searchCount(req, `${repoQuery} is:pr is:closed`),
      searchCount(req, `${repoQuery} is:pr is:merged`)
    ]);

    const recent = await githubFetch(req, `https://api.github.com/repos/${owner}/${repo}/pulls?state=all&per_page=20&sort=updated&direction=desc`);
    const recentItems = recent.map(item => ({
      number: item.number,
      title: item.title,
      state: item.state,
      created_at: item.created_at,
      updated_at: item.updated_at,
      merged_at: item.merged_at,
      user: item.user?.login,
      html_url: item.html_url
    }));

    const response = {
      counts: { open: openCount, closed: closedCount, merged: mergedCount },
      recent: recentItems
    };
    setCache(cacheKey, response, 90000);
    res.json(response);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message, details: error.details || null });
  }
});

app.get('/api/issues', async (req, res) => {
  if (!requireParams(req, res, ['owner', 'repo'])) return;
  const { owner, repo } = req.query;
  const cacheKey = `issues:${normalizeRepoKey(owner, repo)}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);

  try {
    const repoQuery = `repo:${owner}/${repo}`;
    const [openCount, closedCount] = await Promise.all([
      searchCount(req, `${repoQuery} is:issue is:open`),
      searchCount(req, `${repoQuery} is:issue is:closed`)
    ]);

    const recentData = await githubFetch(req, `https://api.github.com/search/issues?q=${encodeURIComponent(`${repoQuery} is:issue`)}&sort=updated&order=desc&per_page=20`);
    const recent = recentData.items.map(item => ({
      number: item.number,
      title: item.title,
      state: item.state,
      created_at: item.created_at,
      updated_at: item.updated_at,
      user: item.user?.login,
      html_url: item.html_url
    }));

    const response = {
      counts: { open: openCount, closed: closedCount },
      recent
    };
    setCache(cacheKey, response, 90000);
    res.json(response);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message, details: error.details || null });
  }
});

app.get('/api/tree', async (req, res) => {
  if (!requireParams(req, res, ['owner', 'repo'])) return;
  const { owner, repo } = req.query;
  const branch = req.query.branch || 'main';
  const limit = safeNumber(req.query.limit, 200);
  const cacheKey = `tree:${normalizeRepoKey(owner, repo, `:${branch}:${limit}`)}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);

  try {
    const branchData = await githubFetch(req, `https://api.github.com/repos/${owner}/${repo}/branches/${branch}`);
    const sha = branchData?.commit?.sha;

    const treeData = await githubFetch(req, `https://api.github.com/repos/${owner}/${repo}/git/trees/${sha}?recursive=1`);
    const entries = (treeData.tree || [])
      .filter(item => item.type === 'blob')
      .map(item => ({
        path: item.path,
        size: item.size || 0,
        raw_url: `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${item.path}`
      }))
      .sort((a, b) => b.size - a.size);

    const sliced = entries.slice(0, limit);
    const totalBytes = entries.reduce((sum, item) => sum + item.size, 0);

    const response = {
      branch,
      totalFiles: entries.length,
      totalBytes,
      entries: sliced
    };
    setCache(cacheKey, response, 120000);
    res.json(response);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message, details: error.details || null });
  }
});

app.get('/api/file', async (req, res) => {
  if (!requireParams(req, res, ['owner', 'repo', 'path'])) return;
  const { owner, repo, path } = req.query;
  const branch = req.query.branch || 'main';
  const maxBytes = safeNumber(req.query.max_bytes, 200000);
  const cacheKey = `file:${normalizeRepoKey(owner, repo, `:${branch}:${path}`)}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);

  try {
    const safePath = String(path)
      .split('/')
      .map(segment => encodeURIComponent(segment))
      .join('/');
    const data = await githubFetch(req, `https://api.github.com/repos/${owner}/${repo}/contents/${safePath}?ref=${branch}`);
    if (Array.isArray(data)) {
      res.status(400).json({ error: 'Path points to a directory.' });
      return;
    }

    const buffer = data.content ? Buffer.from(data.content, 'base64') : Buffer.from('');
    const isBinary = buffer.includes(0);
    const truncated = buffer.length > maxBytes;
    const content = !isBinary && !truncated ? buffer.toString('utf-8') : null;

    const response = {
      path: data.path,
      size: data.size,
      encoding: data.encoding,
      download_url: data.download_url,
      html_url: data.html_url,
      isBinary,
      truncated,
      content
    };
    setCache(cacheKey, response, 120000);
    res.json(response);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message, details: error.details || null });
  }
});

app.get('/api/scrape/topics', async (req, res) => {
  if (!requireParams(req, res, ['owner', 'repo'])) return;
  const { owner, repo } = req.query;
  const cacheKey = `scrape-topics:${normalizeRepoKey(owner, repo)}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);

  try {
    const response = await fetch(`https://github.com/${owner}/${repo}`);
    if (!response.ok) {
      res.status(response.status).json({ error: 'Failed to fetch repo page' });
      return;
    }
    const html = await response.text();
    const matches = [...html.matchAll(/topic-tag[^>]*>([^<]+)</g)];
    const topics = matches.map(match => match[1].trim()).filter(Boolean);
    const unique = Array.from(new Set(topics));
    const payload = { topics: unique };
    setCache(cacheKey, payload, 300000);
    res.json(payload);
  } catch (error) {
    res.status(500).json({ error: 'Failed to scrape topics.' });
  }
});

app.get('/api/pr-analysis', async (req, res) => {
  if (!requireParams(req, res, ['owner', 'repo'])) return;

  const { owner, repo } = req.query;
  const focusUser = req.query.focus ? String(req.query.focus) : null;
  const discoveryPages = safeNumber(req.query.discovery_pages, 15);
  const closedPages = safeNumber(req.query.closed_pages, 30);
  const openPages = safeNumber(req.query.open_pages, 10);
  const top = safeNumber(req.query.top, 30);
  const cacheKey = `pr-analysis:${normalizeRepoKey(owner, repo)}:${focusUser}:${discoveryPages}:${closedPages}:${openPages}:${top}`;
  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);

  const fetchPrPage = async (state, page) => {
    const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=${state}&per_page=100&page=${page}`;
    return githubFetch(req, url);
  };

  try {
    const recentUsers = new Set();
    for (let page = 1; page <= discoveryPages; page += 1) {
      const prs = await fetchPrPage('closed', page);
      if (!Array.isArray(prs) || prs.length === 0) break;
      prs.forEach((pr) => {
        const author = pr.user?.login;
        if (author) recentUsers.add(author);
      });
    }

    const userStats = new Map();
    recentUsers.forEach((user) => userStats.set(user, { merged: 0, open: 0 }));

    for (let page = 1; page <= closedPages; page += 1) {
      const prs = await fetchPrPage('closed', page);
      if (!Array.isArray(prs) || prs.length === 0) break;
      prs.forEach((pr) => {
        const author = pr.user?.login;
        if (!author || !userStats.has(author)) return;
        if (pr.merged_at) {
          const stats = userStats.get(author);
          stats.merged += 1;
        }
      });
    }

    for (let page = 1; page <= openPages; page += 1) {
      const prs = await fetchPrPage('open', page);
      if (!Array.isArray(prs) || prs.length === 0) break;
      prs.forEach((pr) => {
        const author = pr.user?.login;
        if (!author || !userStats.has(author)) return;
        const stats = userStats.get(author);
        stats.open += 1;
      });
    }

    const users = Array.from(userStats.entries())
      .map(([username, stats]) => ({
        username,
        merged: stats.merged,
        open: stats.open,
        total: stats.merged + stats.open
      }))
      .sort((a, b) => b.merged - a.merged)
      .slice(0, Math.max(1, top));

    const payload = {
      owner,
      repo,
      focusUser,
      scanned: {
        discoveryPages,
        closedPages,
        openPages
      },
      totalTrackedUsers: userStats.size,
      users
    };

    setCache(cacheKey, payload, 120000);
    res.json(payload);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message, details: error.details || null });
  }
});

app.get('/api/rate', async (req, res) => {
  try {
    const data = await githubFetch(req, 'https://api.github.com/rate_limit');
    res.json(data);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message, details: error.details || null });
  }
});

app.listen(port, () => {
  console.log(`GitNaut API running on http://localhost:${port}`);
});

export default app;
