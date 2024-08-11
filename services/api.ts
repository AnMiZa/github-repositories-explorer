export const githubApi = async (endpoint: string, method = 'GET') =>
  await fetch(`https://api.github.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_GITHUB_ACCESS_TOKEN}`,
    },
    method,
  });
