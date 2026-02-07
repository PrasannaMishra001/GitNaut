const API_BASE = import.meta.env.VITE_API_BASE || '';

const buildQuery = (params: Record<string, string | number | undefined>) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      search.append(key, String(value));
    }
  });
  return search.toString();
};

const apiGet = async <T>(path: string, params: Record<string, string | number | undefined>) => {
  const query = buildQuery(params);
  const url = `${API_BASE}${path}?${query}`;
  const response = await fetch(url);
  if (!response.ok) {
    const text = await response.text();
    const contentType = response.headers.get('content-type') || '';
    const isHtml = contentType.includes('text/html') || text.trim().startsWith('<!DOCTYPE html');
    if (isHtml) {
      throw new Error('API unavailable. Start the backend or set VITE_API_BASE to your API URL.');
    }
    throw new Error(text || `Request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
};

export type RepoSummary = {
  name: string;
  full_name: string;
  description: string | null;
  size_kb: number;
  stars: number;
  forks: number;
  watchers: number;
  open_issues: number;
  default_branch: string;
  license: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  html_url: string;
  owner: string;
};

export type LanguageStats = {
  totalBytes: number;
  languages: Array<{ name: string; bytes: number; percent: number }>;
};

export type ContributorsResponse = {
  contributors: Array<{ login: string; avatar_url: string; contributions: number; html_url: string }>;
  page: number;
  perPage: number;
};

export type PrResponse = {
  counts: { open: number; closed: number; merged: number };
  recent: Array<{ number: number; title: string; state: string; created_at: string; updated_at: string; merged_at: string | null; user: string; html_url: string }>;
};

export type IssueResponse = {
  counts: { open: number; closed: number };
  recent: Array<{ number: number; title: string; state: string; created_at: string; updated_at: string; user: string; html_url: string }>;
};

export type TreeResponse = {
  branch: string;
  totalFiles: number;
  totalBytes: number;
  entries: Array<{ path: string; size: number; raw_url: string }>;
};

export type FileResponse = {
  path: string;
  size: number;
  encoding: string;
  download_url: string;
  html_url: string;
  isBinary: boolean;
  truncated: boolean;
  content: string | null;
};

export type TopicsResponse = {
  topics: string[];
};

export type PrAnalysisUser = {
  username: string;
  merged: number;
  open: number;
  total: number;
};

export type PrAnalysisResponse = {
  owner: string;
  repo: string;
  focusUser: string | null;
  scanned: {
    discoveryPages: number;
    closedPages: number;
    openPages: number;
  };
  totalTrackedUsers: number;
  users: PrAnalysisUser[];
};

export const gitnautApi = {
  repo: (owner: string, repo: string) => apiGet<RepoSummary>('/api/repo', { owner, repo }),
  languages: (owner: string, repo: string) => apiGet<LanguageStats>('/api/languages', { owner, repo }),
  contributors: (owner: string, repo: string) => apiGet<ContributorsResponse>('/api/contributors', { owner, repo, per_page: 30, page: 1 }),
  prs: (owner: string, repo: string) => apiGet<PrResponse>('/api/prs', { owner, repo }),
  issues: (owner: string, repo: string) => apiGet<IssueResponse>('/api/issues', { owner, repo }),
  tree: (owner: string, repo: string, branch?: string) => apiGet<TreeResponse>('/api/tree', { owner, repo, branch, limit: 200 }),
  file: (owner: string, repo: string, path: string, branch?: string) => apiGet<FileResponse>('/api/file', { owner, repo, path, branch, max_bytes: 200000 }),
  topics: (owner: string, repo: string) => apiGet<TopicsResponse>('/api/scrape/topics', { owner, repo }),
  prAnalysis: (
    owner: string,
    repo: string,
    focus?: string,
    discoveryPages?: number,
    closedPages?: number,
    openPages?: number,
    top?: number
  ) => apiGet<PrAnalysisResponse>('/api/pr-analysis', {
    owner,
    repo,
    focus,
    discovery_pages: discoveryPages,
    closed_pages: closedPages,
    open_pages: openPages,
    top
  })
};
