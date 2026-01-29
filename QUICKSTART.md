# Quick Start Guide - GitHub MCP Server

## Setup Steps

### 1. Get a GitHub Token
1. Visit https://github.com/settings/tokens/new
2. Create a "Personal access token"
3. Select scopes: `repo` and `user`
4. Copy the token

### 2. Configure the Environment
Create a `.env` file in the project root with your token:
```
GITHUB_TOKEN=your_actual_token_here
```

Or set it as an environment variable:
```bash
# Windows (PowerShell)
$env:GITHUB_TOKEN='your_token_here'

# macOS/Linux
export GITHUB_TOKEN='your_token_here'
```

### 3. Install and Build
```bash
npm install
npm run build
```

### 4. Run the Server
```bash
npm run dev
```

You should see: "GitHub MCP Server running on stdio"

### 5. Test with MCP Inspector
```bash
npx @modelcontextprotocol/inspector npx node build/index.js
```

## Available Tools

### get_repo_info
Get information about a repository
```json
{
  "owner": "torvalds",
  "repo": "linux"
}
```

### list_issues
List issues in a repository
```json
{
  "owner": "nodejs",
  "repo": "node",
  "state": "open",
  "limit": 5
}
```

### create_issue
Create a new issue (requires write access)
```json
{
  "owner": "your-username",
  "repo": "your-repo",
  "title": "Bug: Something is broken",
  "body": "Description of the issue",
  "labels": ["bug", "urgent"]
}
```

### list_pull_requests
List pull requests
```json
{
  "owner": "facebook",
  "repo": "react",
  "state": "open"
}
```

### get_user_info
Get user information
```json
{
  "username": "torvalds"
}
```

### search_repositories
Search for repositories
```json
{
  "query": "machine learning language:python",
  "limit": 5
}
```

## Troubleshooting

**Token not recognized**: Make sure the token has proper scopes (repo, user) and hasn't expired.

**Rate limit errors**: GitHub API has rate limits. Unauthenticated: 60 req/hr, Authenticated: 5000 req/hr.

**Build fails**: Run `npm install` again to ensure all dependencies are installed.

## Development

### Watch TypeScript changes
```bash
npm run watch
```

### Debug in VS Code
Press F5 to start debugging (requires .env file with valid GITHUB_TOKEN)

### Build for production
```bash
npm run build
```

## Next Steps

- Integrate with your favorite LLM application
- Add more tools for GitHub API operations
- Create custom workflows using these tools
- Extend with GitHub Actions integration

For more info, check the [README.md](README.md)
