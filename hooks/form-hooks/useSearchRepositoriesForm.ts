import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useGetUserRepositories } from '@/hooks/useGetUserRepositories';
import { getUsersByUsername } from '@/services/repositories';
import { useAtom } from 'jotai';
import { usersAtom } from '@/state/users';

interface SearchRepositoriesFormValues {
  search: string;
}

const formDefaultValues = {
  search: '',
};

export const useSearchRepositoriesForm = () => {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { control, handleSubmit, reset, watch } = useForm<SearchRepositoriesFormValues>({
    defaultValues: formDefaultValues,
  });
  const [_, setUsers] = useAtom(usersAtom);

  const isSearchEmpty = watch('search') === '';

  const onSubmit = async (data: SearchRepositoriesFormValues) => {
    try {
      setIsSubmitting(true);
      const response = await getUsersByUsername(data.search);
      setUsers(response.items);
      setError('');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { control, submit: handleSubmit(onSubmit), reset, error, isSubmitting, isSearchEmpty };
};
