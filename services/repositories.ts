export const getUsersByUsername = async (userName: string) => {
  const data = await fetch(`https://api.github.com/search/users?q=${userName}&per_page=5`, {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
    method: 'GET',
  });
  return await data.json();
};

const x = [
  {
    avatar_url: 'https://avatars.githubusercontent.com/u/7748788?v=4',
    events_url: 'https://api.github.com/users/kacgrzes/events{/privacy}',
    followers_url: 'https://api.github.com/users/kacgrzes/followers',
    following_url: 'https://api.github.com/users/kacgrzes/following{/other_user}',
    gists_url: 'https://api.github.com/users/kacgrzes/gists{/gist_id}',
    gravatar_id: '',
    html_url: 'https://github.com/kacgrzes',
    id: 7748788,
    login: 'kacgrzes',
    node_id: 'MDQ6VXNlcjc3NDg3ODg=',
    organizations_url: 'https://api.github.com/users/kacgrzes/orgs',
    received_events_url: 'https://api.github.com/users/kacgrzes/received_events',
    repos_url: 'https://api.github.com/users/kacgrzes/repos',
    score: 1,
    site_admin: false,
    starred_url: 'https://api.github.com/users/kacgrzes/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/kacgrzes/subscriptions',
    type: 'User',
    url: 'https://api.github.com/users/kacgrzes',
  },
];
