export const extractEndpointFromGithubApiURL = (url: string) =>
  url.split('https://api.github.com/')[1];
