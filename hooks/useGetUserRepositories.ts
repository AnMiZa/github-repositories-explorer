import { useEffect, useState } from 'react';
import { Repository } from '@/types';

export const useGetUserRepositories = (repositoryUrl: string) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(repositoryUrl);
        const data = await response.json();
        setRepositories(data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { repositories, loading, error };
};
