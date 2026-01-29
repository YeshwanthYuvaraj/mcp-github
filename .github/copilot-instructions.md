## GitHub MCP Server Project

### Overview
This project is a Model Context Protocol (MCP) server that provides GitHub integration capabilities for AI/LLM applications.

### Key Tools Implemented

1. **Repository Management**
   - `get_repo_info` - Retrieve repository details, stars, forks, language, and metadata
   - `search_repositories` - Search GitHub repositories by query

2. **Issue Management**
   - `list_issues` - List repository issues with filtering by state
   - `create_issue` - Create new issues with optional labels and description

3. **Pull Requests**
   - `list_pull_requests` - View PRs with state filtering

4. **User Management**
   - `get_user_info` - Get GitHub user profile information

### Project Setup & Development

#### Quick Start
1. **Install dependencies**: `npm install`
2. **Build project**: `npm run build`
3. **Set GitHub token**: `export GITHUB_TOKEN=your_token_here` (or use `.env`)
4. **Run server**: `npm run dev`

#### Development Workflow
- Use `npm run watch` for live TypeScript compilation
- Debug using VS Code's built-in debugger (F5)
- Test tools with MCP Inspector: `npx @modelcontextprotocol/inspector`

#### Configuration
- TypeScript configuration is in `tsconfig.json`
- MCP server configuration in `.vscode/mcp.json`
- Debug configuration in `.vscode/launch.json`
- Tasks defined in `.vscode/tasks.json`

### Architecture

The server implements the Model Context Protocol using:
- **Framework**: TypeScript + MCP SDK
- **Transport**: stdio for local communication
- **GitHub API**: Octokit library for GitHub API calls
- **Build**: TypeScript compiler to ES2020 JavaScript

### Authentication

- Requires a GitHub Personal Access Token (PAT)
- Token scopes needed: `repo` (for repository access) and `user` (for user info)
- Token is passed via `GITHUB_TOKEN` environment variable

### API Reference

See [README.md](../README.md) for detailed tool documentation and usage examples.

### Documentation References

- [MCP Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP Specification](https://modelcontextprotocol.io/specification/latest)
- [TypeScript SDK Repository](https://github.com/modelcontextprotocol/typescript-sdk)
- [Octokit Documentation](https://octokit.github.io/rest.js/)

### Troubleshooting

**Build Errors**: Ensure TypeScript is properly configured. Check `tsconfig.json` for correct compiler options.

**GitHub API Errors**: Verify your GitHub token has appropriate scopes and isn't rate-limited.

**Module Resolution**: Clear `node_modules` and reinstall if you encounter resolution issues.

### Next Steps to Extend

- Add more GitHub API operations (branches, commits, workflows, etc.)
- Implement resource streaming for large responses
- Add subscription/webhook support for real-time updates
- Create integration tests with GitHub's GraphQL API
- Add rate-limiting and caching strategies

### Support & Community

- Join MCP Discord for community support
- Check MCP documentation for protocol questions
- Refer to TypeScript SDK examples for implementation patterns
