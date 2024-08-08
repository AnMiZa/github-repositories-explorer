import { View, Text, FlatList } from 'react-native';
import { useGetUserRepositories } from '@/hooks/useGetUserRepositories';

interface RepositoriesListProps {
  repositoryUrl: string;
}

export function RepositoriesList({ repositoryUrl }: RepositoriesListProps) {
  const { repositories } = useGetUserRepositories(repositoryUrl);
  console.log('repositories', repositories);
  return (
    <FlatList
      data={repositories}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item }) => {
        return (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
          </View>
        );
      }}
    />
  );
}
