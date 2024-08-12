import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useGetUserRepositories } from '@/hooks/useGetUserRepositories';
import Ionicons from '@expo/vector-icons/Ionicons';
import i18n from '@/lang/i18n';
import { Colors } from '@/constants';
import { Repository } from '@/types';
import { ExternalLink } from '@/components/ExternalLink';

interface RepositoriesListProps {
  repositoryUrl: string;
}

const ITEM_HEIGHT = 110;

const renderItem = ({ item }: { item: Repository }) => {
  return (
    <ExternalLink href={item.html_url} asChild>
      <TouchableOpacity style={styles.item}>
        <View style={styles.itemHeader}>
          <Text style={styles.title} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.starContainer}>
            <Text>{item.stargazers_count}</Text>
            <Ionicons name="star" size={16} />
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description} numberOfLines={3}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    </ExternalLink>
  );
};

const ListEmptyComponent = () => (
  <View style={styles.listEmptyComponent}>
    <Text>{i18n.t('searchRepositoriesScreen.userDoNotHaveRepositories')}</Text>
  </View>
);

const ItemSeparatorComponent = () => <View style={styles.itemSeparatorComponent} />;

const keyExtractor = ({ id }: { id: number }) => id.toString();

const getItemLayout = (_: unknown, index: number) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
});

export function RepositoriesList({ repositoryUrl }: RepositoriesListProps) {
  const { repositories, loading } = useGetUserRepositories(repositoryUrl);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlatList
      data={repositories}
      style={styles.flatList}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={ItemSeparatorComponent}
      getItemLayout={getItemLayout}
      ListEmptyComponent={ListEmptyComponent}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  flatList: {
    width: '100%',
    marginBottom: 16,
    flex: 1,
  },
  item: {
    padding: 16,
    backgroundColor: Colors.primaryOpacity,
    width: '100%',
    borderRadius: 6,
    height: ITEM_HEIGHT,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    flex: 1,
    flexWrap: 'wrap',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  descriptionContainer: {
    flexDirection: 'row',
  },
  listEmptyComponent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemSeparatorComponent: {
    height: 16,
  },
  loaderContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
