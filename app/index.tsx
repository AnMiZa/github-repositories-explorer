import { Text, StyleSheet, SafeAreaView, View } from 'react-native';
import { Button, Collapsible, ControlledInput } from '@/components';
import { useSearchRepositoriesForm } from '@/hooks';
import i18n from '@/lang/i18n';

export default function Index() {
  const { control, isSubmitting, submit, reset, error, isSearchEmpty } =
    useSearchRepositoriesForm();
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
        <Collapsible title="User" children={<Text>Test</Text>} />
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
