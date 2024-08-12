const githubAuthorizedApi = async (endpoint: string, method = 'GET') =>
  await fetch(`https://api.github.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_GITHUB_ACCESS_TOKEN}`,
    },
    method,
  });

const githubUnauthorizedApi = async (endpoint: string, method = 'GET') =>
  await fetch(`https://api.github.com/${endpoint}`, {
    method,
  });

export const githubApi =
  process.env.EXPO_PUBLIC_USE_AUTHENTICATED_REQUESTS === 'true'
    ? githubAuthorizedApi
    : githubUnauthorizedApi;
