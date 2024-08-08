import { useForm } from 'react-hook-form';
import { useState } from 'react';

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

  const isSearchEmpty = watch('search') === '';

  const onSubmit = async (data: SearchRepositoriesFormValues) => {
    try {
      setIsSubmitting(true);
      setError('');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { control, submit: handleSubmit(onSubmit), reset, error, isSubmitting, isSearchEmpty };
};
