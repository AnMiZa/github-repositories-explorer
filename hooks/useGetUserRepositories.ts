import { useEffect, useState } from 'react';
import { Repository } from '@/types';
import { githubApi } from '@/services/api';
import { extractEndpointFromGithubApiURL } from '@/utils/stringUtils';

export const useGetUserRepositories = (repositoryUrl: string) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await githubApi(extractEndpointFromGithubApiURL(repositoryUrl));
        const data = await response.json();
        setRepositories(data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [repositoryUrl]);

  return { repositories, loading, error };
};
