import { Text, StyleSheet, SafeAreaView, View } from 'react-native';
import { Button, Collapsible, ControlledInput } from '@/components';
import { useSearchRepositoriesForm } from '@/hooks';
import i18n from '@/lang/i18n';
import { usersAtom } from '@/state/users';
import { useAtom } from 'jotai';
import { RepositoriesList } from '@/components/RepositoriesList';

export default function Index() {
  const { control, isSubmitting, submit, reset, error, isSearchEmpty } =
    useSearchRepositoriesForm();
  const [users] = useAtom(usersAtom);
  console.log('users from jotai', users);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.screenWrapper}>
        <Text style={styles.titleText}>{i18n.t('searchRepositoriesScreen.title')}</Text>
        <ControlledInput
          control={control}
          name="search"
          placeholder={i18n.t('searchRepositoriesScreen.searchPlaceholder')}
        />
        <Button
          onPress={submit}
          label={i18n.t('searchRepositoriesScreen.search')}
          isLoading={isSubmitting}
          isDisabled={isSearchEmpty}
        />
        {users.map((user) => (
          <Collapsible
            title={user.login}
            children={<RepositoriesList repositoryUrl={user.repos_url} />}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  screenWrapper: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
