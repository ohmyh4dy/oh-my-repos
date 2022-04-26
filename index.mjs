#!/usr/bin/env node

import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const userName = process.env.GITHUB_USERNAME;
const apiToken = process.env.GITHUB_API_TOKEN;

const REPOS_URL = `https://api.github.com/users/${userName}/repos`;

// Get all repos
const getUserRepos = async () => {
  const response = await fetch(REPOS_URL, {
    headers: {
      Authorization: `token ${apiToken}`,
    },
  });
  return await response.json();
};

// Get all repos names
const getReposNames = async () => {
  const repos = await getUserRepos();
  return repos.map((repo) => repo.name);
};

// Delete all repos
const deleteRepos = async () => {
  const reposNames = await getReposNames();
  const repos = reposNames.map((repoName) => `${userName}/${repoName}`);
  repos.forEach(async (repo) => {
    await fetch(`https://api.github.com/repos/${repo}`, {
      method: "DELETE",
      headers: {
        Authorization: `token ${apiToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });
  });
};

deleteRepos();
