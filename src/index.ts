#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
  TextContent,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { Octokit } from "octokit";

// Initialize GitHub client
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

// Define tools
const tools: Tool[] = [
  {
    name: "get_repo_info",
    description: "Get information about a GitHub repository",
    inputSchema: {
      type: "object" as const,
      properties: {
        owner: {
          type: "string",
          description: "Repository owner (username or organization)",
        },
        repo: {
          type: "string",
          description: "Repository name",
        },
      },
      required: ["owner", "repo"],
    },
  },
  {
    name: "list_issues",
    description:
      "List issues in a repository with optional filtering by state",
    inputSchema: {
      type: "object" as const,
      properties: {
        owner: {
          type: "string",
          description: "Repository owner",
        },
        repo: {
          type: "string",
          description: "Repository name",
        },
        state: {
          type: "string",
          enum: ["open", "closed", "all"],
          description: "Filter by issue state",
        },
        limit: {
          type: "number",
          description: "Maximum number of issues to return",
        },
      },
      required: ["owner", "repo"],
    },
  },
  {
    name: "create_issue",
    description: "Create a new issue in a repository",
    inputSchema: {
      type: "object" as const,
      properties: {
        owner: {
          type: "string",
          description: "Repository owner",
        },
        repo: {
          type: "string",
          description: "Repository name",
        },
        title: {
          type: "string",
          description: "Issue title",
        },
        body: {
          type: "string",
          description: "Issue description",
        },
        labels: {
          type: "array",
          items: { type: "string" },
          description: "Labels to add to the issue",
        },
      },
      required: ["owner", "repo", "title"],
    },
  },
  {
    name: "list_pull_requests",
    description: "List pull requests in a repository",
    inputSchema: {
      type: "object" as const,
      properties: {
        owner: {
          type: "string",
          description: "Repository owner",
        },
        repo: {
          type: "string",
          description: "Repository name",
        },
        state: {
          type: "string",
          enum: ["open", "closed", "all"],
          description: "Filter by PR state",
        },
        limit: {
          type: "number",
          description: "Maximum number of PRs to return",
        },
      },
      required: ["owner", "repo"],
    },
  },
  {
    name: "get_user_info",
    description: "Get information about a GitHub user",
    inputSchema: {
      type: "object" as const,
      properties: {
        username: {
          type: "string",
          description: "GitHub username",
        },
      },
      required: ["username"],
    },
  },
  {
    name: "search_repositories",
    description: "Search for repositories on GitHub",
    inputSchema: {
      type: "object" as const,
      properties: {
        query: {
          type: "string",
          description: "Search query",
        },
        limit: {
          type: "number",
          description: "Maximum number of results",
        },
      },
      required: ["query"],
    },
  },
];

// Tool handlers
async function handleGetRepoInfo(
  owner: string,
  repo: string
): Promise<string> {
  const { data } = await octokit.rest.repos.get({ owner, repo });
  return JSON.stringify(
    {
      name: data.name,
      description: data.description,
      url: data.html_url,
      stars: data.stargazers_count,
      forks: data.forks_count,
      language: data.language,
      topics: data.topics,
      created_at: data.created_at,
      updated_at: data.updated_at,
    },
    null,
    2
  );
}

async function handleListIssues(
  owner: string,
  repo: string,
  state: string = "open",
  limit: number = 10
): Promise<string> {
  const { data } = await octokit.rest.issues.listForRepo({
    owner,
    repo,
    state: state as "open" | "closed" | "all",
    per_page: Math.min(limit, 100),
  });

  return JSON.stringify(
    data.map((issue) => ({
      number: issue.number,
      title: issue.title,
      state: issue.state,
      created_at: issue.created_at,
      labels: issue.labels.map((l) => (typeof l === "string" ? l : l.name)),
    })),
    null,
    2
  );
}

async function handleCreateIssue(
  owner: string,
  repo: string,
  title: string,
  body?: string,
  labels?: string[]
): Promise<string> {
  const { data } = await octokit.rest.issues.create({
    owner,
    repo,
    title,
    body,
    labels,
  });

  return JSON.stringify(
    {
      number: data.number,
      title: data.title,
      url: data.html_url,
      created_at: data.created_at,
    },
    null,
    2
  );
}

async function handleListPullRequests(
  owner: string,
  repo: string,
  state: string = "open",
  limit: number = 10
): Promise<string> {
  const { data } = await octokit.rest.pulls.list({
    owner,
    repo,
    state: state as "open" | "closed" | "all",
    per_page: Math.min(limit, 100),
  });

  return JSON.stringify(
    data.map((pr) => ({
      number: pr.number,
      title: pr.title,
      state: pr.state,
      created_at: pr.created_at,
      updated_at: pr.updated_at,
    })),
    null,
    2
  );
}

async function handleGetUserInfo(username: string): Promise<string> {
  const { data } = await octokit.rest.users.getByUsername({ username });
  return JSON.stringify(
    {
      name: data.name,
      login: data.login,
      bio: data.bio,
      followers: data.followers,
      following: data.following,
      public_repos: data.public_repos,
      url: data.html_url,
      created_at: data.created_at,
    },
    null,
    2
  );
}

async function handleSearchRepositories(
  query: string,
  limit: number = 10
): Promise<string> {
  const { data } = await octokit.rest.search.repos({
    q: query,
    per_page: Math.min(limit, 100),
  });

  return JSON.stringify(
    data.items.map((repo) => ({
      name: repo.name,
      owner: repo.owner?.login,
      url: repo.html_url,
      description: repo.description,
      stars: repo.stargazers_count,
    })),
    null,
    2
  );
}

// Process tool calls
async function processToolCall(
  toolName: string,
  toolInput: Record<string, unknown>
): Promise<string> {
  try {
    switch (toolName) {
      case "get_repo_info":
        return await handleGetRepoInfo(
          toolInput.owner as string,
          toolInput.repo as string
        );
      case "list_issues":
        return await handleListIssues(
          toolInput.owner as string,
          toolInput.repo as string,
          toolInput.state as string,
          toolInput.limit as number
        );
      case "create_issue":
        return await handleCreateIssue(
          toolInput.owner as string,
          toolInput.repo as string,
          toolInput.title as string,
          toolInput.body as string,
          toolInput.labels as string[]
        );
      case "list_pull_requests":
        return await handleListPullRequests(
          toolInput.owner as string,
          toolInput.repo as string,
          toolInput.state as string,
          toolInput.limit as number
        );
      case "get_user_info":
        return await handleGetUserInfo(toolInput.username as string);
      case "search_repositories":
        return await handleSearchRepositories(
          toolInput.query as string,
          toolInput.limit as number
        );
      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);
    throw new Error(`Tool execution failed: ${errorMessage}`);
  }
}

// Create MCP server
const server = new Server({
  name: "github-mcp-server",
  version: "1.0.0",
});

// Register handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools,
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const result = await processToolCall(
      request.params.name,
      request.params.arguments as Record<string, unknown>
    );
    return {
      content: [
        {
          type: "text",
          text: result,
        },
      ],
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: "text",
          text: `Error: ${errorMessage}`,
        },
      ],
      isError: true,
    };
  }
});

server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [],
}));

server.setRequestHandler(ReadResourceRequestSchema, async () => {
  throw new Error("Resources not supported");
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("GitHub MCP Server running on stdio");
}

main().catch(console.error);
