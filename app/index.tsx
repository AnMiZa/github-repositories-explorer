import { Text, StyleSheet, SafeAreaView, View, Platform } from 'react-native';
import { Button, ControlledInput, UsersList, RateLimitChecker } from '@/components';
import { useSearchRepositoriesForm } from '@/hooks';
import i18n from '@/lang/i18n';
import { usersAtom } from '@/state/users';
import { useAtom } from 'jotai';

export default function Index() {
  const { control, isSubmitting, submit, isSearchEmpty } = useSearchRepositoriesForm();
  const [users] = useAtom(usersAtom);

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
        <UsersList users={users} />
      </View>
      <RateLimitChecker />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingVertical: Platform.OS === 'android' ? 25 : 0,
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
