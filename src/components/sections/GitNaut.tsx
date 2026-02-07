import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  gitnautApi,
  RepoSummary,
  LanguageStats,
  ContributorsResponse,
  PrResponse,
  IssueResponse,
  TreeResponse,
  FileResponse,
  TopicsResponse,
  PrAnalysisResponse
} from '../../api/gitnaut';

type GitNautData =
  | RepoSummary
  | LanguageStats
  | ContributorsResponse
  | PrResponse
  | IssueResponse
  | TreeResponse
  | FileResponse
  | TopicsResponse
  | PrAnalysisResponse
  | null;

type GitNautMode = 'help' | 'repo' | 'languages' | 'contributors' | 'prs' | 'issues' | 'tree' | 'file' | 'topics' | 'pr-analysis';

const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};

const formatDate = (value: string) => new Date(value).toLocaleDateString();

const parseRepo = (repoArg?: string) => {
  if (!repoArg) return null;
  const [owner, repo] = repoArg.split('/');
  if (!owner || !repo) return null;
  return { owner, repo };
};

export const GitNaut: React.FC<{ args: string[] }> = ({ args }) => {
  const mode = (args[0] || 'help').toLowerCase() as GitNautMode;
  const repoArg = args[1];
  const extraArgs = useMemo(() => args.slice(2), [args]);
  const repoInfo = useMemo(() => parseRepo(repoArg), [repoArg]);
  const chartRef = useRef<SVGSVGElement | null>(null);

  const [data, setData] = useState<GitNautData>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode !== 'languages' || !data) return;
    const bars = document.querySelectorAll<HTMLElement>('[data-language-percent]');
    bars.forEach((bar) => {
      const percent = bar.dataset.languagePercent || '0';
      bar.style.setProperty('--language-percent', `${percent}%`);
    });
  }, [mode, data]);

  useEffect(() => {
    const run = async () => {
      if (mode === 'help') return;
      if (!repoInfo) {
        setError('Please provide a repo in the format owner/repo.');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const branchFlagIndex = extraArgs.indexOf('--branch');
        const branchFromFlag = branchFlagIndex >= 0 ? extraArgs[branchFlagIndex + 1] : undefined;
        const cleanedArgs = branchFlagIndex >= 0
          ? extraArgs.filter((_, index) => index !== branchFlagIndex && index !== branchFlagIndex + 1)
          : extraArgs;

        const getFlagValue = (flag: string) => {
          const idx = cleanedArgs.indexOf(flag);
          return idx >= 0 ? cleanedArgs[idx + 1] : undefined;
        };

        let response: GitNautData = null;
        if (mode === 'file' && cleanedArgs.length === 0) {
          setError('Please provide a file path. Example: gitnaut file owner/repo src/index.ts');
          return;
        }

        switch (mode) {
          case 'repo':
            response = await gitnautApi.repo(repoInfo.owner, repoInfo.repo);
            break;
          case 'languages':
            response = await gitnautApi.languages(repoInfo.owner, repoInfo.repo);
            break;
          case 'contributors':
            response = await gitnautApi.contributors(repoInfo.owner, repoInfo.repo);
            break;
          case 'prs':
            response = await gitnautApi.prs(repoInfo.owner, repoInfo.repo);
            break;
          case 'issues':
            response = await gitnautApi.issues(repoInfo.owner, repoInfo.repo);
            break;
          case 'tree':
            response = await gitnautApi.tree(repoInfo.owner, repoInfo.repo, branchFromFlag || cleanedArgs[0]);
            break;
          case 'file':
            response = await gitnautApi.file(
              repoInfo.owner,
              repoInfo.repo,
              cleanedArgs.join('/'),
              branchFromFlag
            );
            break;
          case 'topics':
            response = await gitnautApi.topics(repoInfo.owner, repoInfo.repo);
            break;
          case 'pr-analysis': {
            const focus = getFlagValue('--focus') || 'PrasannaMishra001';
            const discoveryPages = Number(getFlagValue('--discovery') || 15);
            const closedPages = Number(getFlagValue('--closed') || 30);
            const openPages = Number(getFlagValue('--open') || 10);
            const top = Number(getFlagValue('--top') || 30);
            response = await gitnautApi.prAnalysis(
              repoInfo.owner,
              repoInfo.repo,
              focus,
              discoveryPages,
              closedPages,
              openPages,
              top
            );
            break;
          }
          default:
            response = null;
            break;
        }
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unexpected error.');
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [mode, repoInfo, extraArgs]);

  if (mode === 'help') {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-terminal-accent font-bold text-lg">GitNaut Commands</h2>
          <p className="text-terminal-muted">Usage: gitnaut &lt;command&gt; &lt;owner/repo&gt; [args]</p>
        </div>
        <div className="grid gap-2 text-sm">
          <div><span className="text-terminal-success">gitnaut repo owner/repo</span> - repo summary</div>
          <div><span className="text-terminal-success">gitnaut languages owner/repo</span> - language breakdown</div>
          <div><span className="text-terminal-success">gitnaut contributors owner/repo</span> - top contributors</div>
          <div><span className="text-terminal-success">gitnaut prs owner/repo</span> - PR counts + recent</div>
          <div><span className="text-terminal-success">gitnaut issues owner/repo</span> - issue counts + recent</div>
          <div><span className="text-terminal-success">gitnaut tree owner/repo [branch]</span> - top file sizes</div>
          <div><span className="text-terminal-success">gitnaut tree owner/repo --branch dev</span> - specify branch</div>
          <div><span className="text-terminal-success">gitnaut file owner/repo path/to/file</span> - file preview</div>
          <div><span className="text-terminal-success">gitnaut file owner/repo path/to/file --branch dev</span> - preview on branch</div>
          <div><span className="text-terminal-success">gitnaut topics owner/repo</span> - scrape repo topics</div>
          <div><span className="text-terminal-success">gitnaut pr-analysis owner/repo --focus user</span> - PR analysis + graph</div>
        </div>
        <div className="bg-terminal-hover p-3 rounded border border-terminal-border text-sm text-terminal-muted">
          Tip: use <span className="text-terminal-success">gitnaut repo omegaup/omegaup</span> to test quickly.
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="text-terminal-muted">Fetching data...</div>;
  }

  if (error) {
    return (
      <div className="text-terminal-error">
        {error}
        <div className="text-terminal-muted text-sm mt-2">Try: gitnaut help</div>
      </div>
    );
  }

  if (!data) {
    return <div className="text-terminal-muted">No data available.</div>;
  }

  if (mode === 'repo') {
    const repo = data as RepoSummary;
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-terminal-accent text-lg font-bold">{repo.full_name}</h2>
          <p className="text-terminal-muted">{repo.description || 'No description provided.'}</p>
        </div>
        <div className="grid gap-2 md:grid-cols-2 text-sm">
          <div>⭐ Stars: <span className="text-terminal-success">{repo.stars}</span></div>
          <div>🍴 Forks: <span className="text-terminal-success">{repo.forks}</span></div>
          <div>👀 Watchers: <span className="text-terminal-success">{repo.watchers}</span></div>
          <div>📦 Size: <span className="text-terminal-success">{formatBytes(repo.size_kb * 1024)}</span></div>
          <div>🌿 Default branch: <span className="text-terminal-success">{repo.default_branch}</span></div>
          <div>🐛 Open issues: <span className="text-terminal-success">{repo.open_issues}</span></div>
          <div>📄 License: <span className="text-terminal-success">{repo.license || 'n/a'}</span></div>
          <div>🕒 Updated: <span className="text-terminal-success">{formatDate(repo.updated_at)}</span></div>
        </div>
        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {repo.topics.map(topic => (
              <span key={topic} className="px-2 py-1 text-xs border border-terminal-border rounded text-terminal-accent">{topic}</span>
            ))}
          </div>
        )}
        <a className="text-terminal-accent underline text-sm" href={repo.html_url} target="_blank" rel="noreferrer">Open on GitHub</a>
      </div>
    );
  }

  if (mode === 'languages') {
    const stats = data as LanguageStats;
    return (
      <div className="space-y-4">
        <h2 className="text-terminal-accent text-lg font-bold">Language Breakdown</h2>
        <div className="text-terminal-muted text-sm">Total: {formatBytes(stats.totalBytes)}</div>
        <div className="space-y-2">
          {stats.languages.map(language => (
            <div key={language.name}>
              <div className="flex justify-between text-sm">
                <span>{language.name}</span>
                <span className="text-terminal-success">{language.percent}%</span>
              </div>
              <div className="w-full h-2 bg-terminal-border rounded">
                <div
                  className="h-2 bg-terminal-accent rounded language-bar-fill"
                  data-language-percent={language.percent}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (mode === 'contributors') {
    const contributors = data as ContributorsResponse;
    return (
      <div className="space-y-4">
        <h2 className="text-terminal-accent text-lg font-bold">Top Contributors</h2>
        <div className="grid gap-2">
          {contributors.contributors.map(contributor => (
            <div key={contributor.login} className="flex items-center justify-between text-sm bg-terminal-hover p-2 rounded border border-terminal-border">
              <div className="flex items-center gap-3">
                {contributor.avatar_url && (
                  <img src={contributor.avatar_url} alt={contributor.login} className="w-6 h-6 rounded-full" />
                )}
                <span>{contributor.login}</span>
              </div>
              <span className="text-terminal-success">{contributor.contributions} commits</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (mode === 'pr-analysis') {
    const analysis = data as PrAnalysisResponse;
    const topUsers = analysis.users;
    const maxMerged = Math.max(...topUsers.map((u) => u.merged), 1);
    const maxOpen = Math.max(...topUsers.map((u) => u.open), 1);
    const rowHeight = 22;
    const labelWidth = 180;
    const barWidth = 260;
    const chartHeight = topUsers.length * rowHeight + 40;
    const chartWidth = labelWidth + barWidth * 2 + 80;

    const downloadText = (filename: string, content: string, type: string) => {
      const blob = new Blob([content], { type });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = filename;
      anchor.click();
      URL.revokeObjectURL(url);
    };

    const handleDownloadJson = () => {
      downloadText(
        `${analysis.owner}-${analysis.repo}-pr-analysis.json`,
        JSON.stringify(analysis, null, 2),
        'application/json'
      );
    };

    const handleDownloadSvg = () => {
      if (!chartRef.current) return;
      const serializer = new XMLSerializer();
      const source = serializer.serializeToString(chartRef.current);
      downloadText(
        `${analysis.owner}-${analysis.repo}-pr-analysis.svg`,
        source,
        'image/svg+xml'
      );
    };

    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-terminal-accent text-lg font-bold">PR Analysis</h2>
          <p className="text-terminal-muted text-sm">
            {analysis.owner}/{analysis.repo} • tracked users: {analysis.totalTrackedUsers}
          </p>
          <p className="text-terminal-muted text-sm">
            Focus user: <span className="text-terminal-success">{analysis.focusUser || 'none'}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            className="px-3 py-1 bg-terminal-hover border border-terminal-border rounded text-xs hover:border-terminal-accent"
            onClick={handleDownloadJson}
          >
            Download JSON
          </button>
          <button
            className="px-3 py-1 bg-terminal-hover border border-terminal-border rounded text-xs hover:border-terminal-accent"
            onClick={handleDownloadSvg}
          >
            Download SVG
          </button>
        </div>

        <div className="overflow-x-auto">
          <svg
            ref={chartRef}
            width="100%"
            height={chartHeight}
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            role="img"
            aria-label="PR analysis chart"
          >
            <text x="0" y="18" fill="var(--terminal-muted)" fontSize="12">User</text>
            <text x={labelWidth} y="18" fill="var(--terminal-muted)" fontSize="12">Merged</text>
            <text x={labelWidth + barWidth + 40} y="18" fill="var(--terminal-muted)" fontSize="12">Open</text>

            {topUsers.map((user, index) => {
              const y = 30 + index * rowHeight;
              const mergedWidth = Math.round((user.merged / maxMerged) * barWidth);
              const openWidth = Math.round((user.open / maxOpen) * barWidth);
              const isFocus = analysis.focusUser === user.username;

              return (
                <g key={user.username}>
                  <text x="0" y={y + 10} fill="var(--terminal-text)" fontSize="12">
                    {user.username}
                  </text>
                  <rect
                    x={labelWidth}
                    y={y}
                    width={mergedWidth}
                    height={8}
                    rx={4}
                    fill={isFocus ? 'var(--terminal-success)' : 'var(--terminal-accent)'}
                  />
                  <text x={labelWidth + mergedWidth + 6} y={y + 7} fill="var(--terminal-muted)" fontSize="10">
                    {user.merged}
                  </text>

                  <rect
                    x={labelWidth + barWidth + 40}
                    y={y}
                    width={openWidth}
                    height={8}
                    rx={4}
                    fill="var(--terminal-muted)"
                    opacity="0.8"
                  />
                  <text x={labelWidth + barWidth + 40 + openWidth + 6} y={y + 7} fill="var(--terminal-muted)" fontSize="10">
                    {user.open}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-terminal-border">
            <thead className="bg-terminal-header">
              <tr>
                <th className="text-left px-2 py-1 border-b border-terminal-border">Rank</th>
                <th className="text-left px-2 py-1 border-b border-terminal-border">User</th>
                <th className="text-left px-2 py-1 border-b border-terminal-border">Merged</th>
                <th className="text-left px-2 py-1 border-b border-terminal-border">Open</th>
                <th className="text-left px-2 py-1 border-b border-terminal-border">Total</th>
              </tr>
            </thead>
            <tbody>
              {topUsers.map((user, index) => {
                const isFocus = analysis.focusUser === user.username;
                return (
                  <tr key={user.username} className={isFocus ? 'text-terminal-success' : 'text-terminal-text'}>
                    <td className="px-2 py-1 border-t border-terminal-border">{index + 1}</td>
                    <td className="px-2 py-1 border-t border-terminal-border">{user.username}</td>
                    <td className="px-2 py-1 border-t border-terminal-border">{user.merged}</td>
                    <td className="px-2 py-1 border-t border-terminal-border">{user.open}</td>
                    <td className="px-2 py-1 border-t border-terminal-border">{user.total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (mode === 'prs') {
    const prs = data as PrResponse;
    return (
      <div className="space-y-4">
        <h2 className="text-terminal-accent text-lg font-bold">Pull Requests</h2>
        <div className="grid gap-2 md:grid-cols-3 text-sm">
          <div>Open: <span className="text-terminal-success">{prs.counts.open}</span></div>
          <div>Closed: <span className="text-terminal-success">{prs.counts.closed}</span></div>
          <div>Merged: <span className="text-terminal-success">{prs.counts.merged}</span></div>
        </div>
        <div className="space-y-2">
          {prs.recent.map(item => (
            <div key={item.number} className="text-sm bg-terminal-hover p-2 rounded border border-terminal-border">
              <div className="flex justify-between">
                <span className="text-terminal-accent">#{item.number}</span>
                <span className="text-terminal-muted">{item.state}</span>
              </div>
              <div>{item.title}</div>
              <div className="text-terminal-muted">Updated: {formatDate(item.updated_at)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (mode === 'issues') {
    const issues = data as IssueResponse;
    return (
      <div className="space-y-4">
        <h2 className="text-terminal-accent text-lg font-bold">Issues</h2>
        <div className="grid gap-2 md:grid-cols-2 text-sm">
          <div>Open: <span className="text-terminal-success">{issues.counts.open}</span></div>
          <div>Closed: <span className="text-terminal-success">{issues.counts.closed}</span></div>
        </div>
        <div className="space-y-2">
          {issues.recent.map(item => (
            <div key={item.number} className="text-sm bg-terminal-hover p-2 rounded border border-terminal-border">
              <div className="flex justify-between">
                <span className="text-terminal-accent">#{item.number}</span>
                <span className="text-terminal-muted">{item.state}</span>
              </div>
              <div>{item.title}</div>
              <div className="text-terminal-muted">Updated: {formatDate(item.updated_at)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (mode === 'tree') {
    const tree = data as TreeResponse;
    return (
      <div className="space-y-4">
        <h2 className="text-terminal-accent text-lg font-bold">File Sizes ({tree.branch})</h2>
        <div className="text-terminal-muted text-sm">Total: {tree.totalFiles} files, {formatBytes(tree.totalBytes)}</div>
        <div className="space-y-2">
          {tree.entries.map(entry => (
            <div key={entry.path} className="text-sm flex justify-between bg-terminal-hover p-2 rounded border border-terminal-border">
              <span className="truncate max-w-[70%]">{entry.path}</span>
              <span className="text-terminal-success">{formatBytes(entry.size)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (mode === 'file') {
    const file = data as FileResponse;
    const canCopy = file.content && !file.isBinary;

    const handleCopy = async () => {
      if (!canCopy || !file.content) return;
      await navigator.clipboard.writeText(file.content);
    };

    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-terminal-accent text-lg font-bold">{file.path}</h2>
          <div className="text-terminal-muted text-sm">Size: {formatBytes(file.size)}</div>
        </div>
        <div className="flex gap-3 text-sm">
          {file.download_url && (
            <a className="text-terminal-accent underline" href={file.download_url} target="_blank" rel="noreferrer">Download</a>
          )}
          {canCopy && (
            <button className="text-terminal-success underline" onClick={handleCopy}>Copy content</button>
          )}
        </div>
        {file.isBinary && <div className="text-terminal-warning">Binary file detected. Preview disabled.</div>}
        {file.truncated && <div className="text-terminal-warning">File too large. Preview truncated.</div>}
        {file.content && (
          <pre className="text-terminal-text text-xs bg-terminal-hover p-3 rounded border border-terminal-border overflow-x-auto max-h-80">
            {file.content}
          </pre>
        )}
      </div>
    );
  }

  if (mode === 'topics') {
    const topics = data as TopicsResponse;
    return (
      <div className="space-y-3">
        <h2 className="text-terminal-accent text-lg font-bold">Repo Topics (Scraped)</h2>
        {topics.topics.length === 0 ? (
          <div className="text-terminal-muted">No topics found.</div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {topics.topics.map(topic => (
              <span key={topic} className="px-2 py-1 text-xs border border-terminal-border rounded text-terminal-accent">{topic}</span>
            ))}
          </div>
        )}
      </div>
    );
  }

  return <div className="text-terminal-muted">Command not implemented yet.</div>;
};
