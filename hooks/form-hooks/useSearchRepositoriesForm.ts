import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { getUsersByUsername } from '@/services/requests';
import { useAtom } from 'jotai';
import { usersAtom } from '@/state/users';
import { errorToast } from '@/utils/toasts';
import i18n from '@/lang/i18n';
import { Keyboard } from 'react-native';

interface SearchRepositoriesFormValues {
  search: string;
}

const formDefaultValues = {
  search: '',
};

export const useSearchRepositoriesForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { control, handleSubmit, reset, watch } = useForm<SearchRepositoriesFormValues>({
    defaultValues: formDefaultValues,
  });
  const [, setUsers] = useAtom(usersAtom);

  const isSearchEmpty = watch('search') === '';

  const onSubmit = async (data: SearchRepositoriesFormValues) => {
    try {
      setIsSubmitting(true);
      const response = await getUsersByUsername(data.search);
      setUsers(response.items);
    } catch (e) {
      errorToast(i18n.t('errorMessages.failedToFetchUsers'));
    } finally {
      Keyboard.dismiss();
      setIsSubmitting(false);
    }
  };

  return { control, submit: handleSubmit(onSubmit), reset, isSubmitting, isSearchEmpty };
};
