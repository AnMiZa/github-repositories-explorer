import { useEffect, useState } from 'react';
import { Repository } from '@/types';
import { githubApi } from '@/services/api';
import { extractEndpointFromGithubApiURL } from '@/utils/stringUtils';
import { errorToast } from '@/utils/toasts';
import i18n from '@/lang/i18n';

export const useGetUserRepositories = (repositoryUrl: string) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await githubApi(extractEndpointFromGithubApiURL(repositoryUrl));
        const data = await response.json();
        setRepositories(data);
      } catch (e) {
        errorToast(i18n.t('errorMessages.failedToFetchUserRepository'));
      } finally {
        setLoading(false);
      }
    })();
  }, [repositoryUrl]);

  return { repositories, loading };
};
