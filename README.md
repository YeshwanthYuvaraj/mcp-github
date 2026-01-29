# GitHub MCP Server

A Model Context Protocol (MCP) server for GitHub integration. This server provides tools for interacting with GitHub repositories, issues, pull requests, and users.

## Features

- **Repository Information**: Get detailed information about any public GitHub repository
- **Issue Management**: List, create, and manage issues in repositories
- **Pull Requests**: View and manage pull requests
- **User Information**: Get GitHub user profiles and statistics
- **Repository Search**: Search for repositories on GitHub

## Prerequisites

- Node.js 18+
- GitHub Token (for authenticated requests)

## Installation

```bash
npm install
npm run build
```

## Configuration

Set the `GITHUB_TOKEN` environment variable with your GitHub personal access token:

```bash
export GITHUB_TOKEN=your_token_here
```

To create a GitHub token:
1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Create a new token with `repo` and `user` scopes
3. Copy the token and set it as `GITHUB_TOKEN`

## Usage

### Running the Server

```bash
npm run dev
```

### Available Tools

#### `get_repo_info`
Get information about a repository.

**Parameters:**
- `owner` (string, required): Repository owner
- `repo` (string, required): Repository name

**Example:**
```json
{
  "owner": "facebook",
  "repo": "react"
}
```

#### `list_issues`
List issues in a repository.

**Parameters:**
- `owner` (string, required): Repository owner
- `repo` (string, required): Repository name
- `state` (string): Issue state - "open", "closed", or "all" (default: "open")
- `limit` (number): Maximum issues to return (default: 10)

#### `create_issue`
Create a new issue in a repository.

**Parameters:**
- `owner` (string, required): Repository owner
- `repo` (string, required): Repository name
- `title` (string, required): Issue title
- `body` (string): Issue description
- `labels` (array): Labels to add to the issue

#### `list_pull_requests`
List pull requests in a repository.

**Parameters:**
- `owner` (string, required): Repository owner
- `repo` (string, required): Repository name
- `state` (string): PR state - "open", "closed", or "all" (default: "open")
- `limit` (number): Maximum PRs to return (default: 10)

#### `get_user_info`
Get information about a GitHub user.

**Parameters:**
- `username` (string, required): GitHub username

#### `search_repositories`
Search for repositories on GitHub.

**Parameters:**
- `query` (string, required): Search query
- `limit` (number): Maximum results (default: 10)

## Development

### Watch Mode
```bash
npm run watch
```

### Building
```bash
npm run build
```

## Debugging

You can use the MCP Inspector tool to test this server locally:

1. Install the MCP Inspector:
```bash
npx @modelcontextprotocol/inspector
```

2. Point it to this server and test individual tools

## Project Structure

```
.
├── src/
│   └── index.ts          # Main server implementation
├── build/                # Compiled JavaScript (generated)
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## Error Handling

The server includes error handling for:
- Invalid repository/user names
- API rate limits
- Missing GitHub tokens
- Network errors

## Documentation

For more information about the Model Context Protocol, visit:
- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification](https://modelcontextprotocol.io/specification/latest)
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

## License

MIT

## Support

For issues or questions:
1. Check the [MCP Discord community](https://discord.gg/modelcontextprotocol)
2. Open an issue on GitHub
3. Refer to the MCP documentation
