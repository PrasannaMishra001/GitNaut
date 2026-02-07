# PR Analysis

GitNaut can analyze pull requests for a repo and highlight a focus user, then render a chart and table in the terminal UI.

## Command

```
gitnaut pr-analysis owner/repo --focus username --discovery 15 --closed 30 --open 10 --top 30
```

### Flags

- `--focus` Focus username to highlight in chart and table. Default: PrasannaMishra001.
- `--discovery` Pages to scan for recent contributors (closed PRs). Default: 15.
- `--closed` Pages to scan for merged PR counts. Default: 30.
- `--open` Pages to scan for open PR counts. Default: 10.
- `--top` Top contributors to display. Default: 30.

## Output

- On-screen SVG chart with merged and open PR counts.
- Ranked table (merged/open/total).
- Download buttons for JSON and SVG.

## Example

```
gitnaut pr-analysis prometheus/prometheus --focus PrasannaMishra001 --top 20
```

## Notes

- PR analysis uses GitHub API calls. Add `GITHUB_TOKEN` to `server/.env` to avoid rate limits.
- For local dev, the frontend proxies `/api` to `http://localhost:4000`.
