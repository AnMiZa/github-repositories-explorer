import { githubApi } from './api';

export const getUsersByUsername = async (userName: string) => {
  const response = await githubApi(`search/users?q=${userName}&per_page=5`);
  return await response.json();
};

export const getRateLimit = async () => {
  const response = await githubApi('rate_limit');
  return await response.json();
};
