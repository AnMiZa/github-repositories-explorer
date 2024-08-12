import { StyleSheet, View } from 'react-native';
import { User } from '@/types';
import { useEffect, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { HEADER_HEIGHT, UsersListSectionHeader } from './UsersListSectionHeader';
import { Collapsible } from './Collapsible';
import { RepositoriesList } from './RepositoriesList';

interface RepositoriesListProps {
  users: User[];
}

export function UsersList({ users }: RepositoriesListProps) {
  const activeSectionIndex = useSharedValue(null);

  const [availableHeight, setAvailableHeight] = useState(0);
  const [maxCollapsibleHeight, setMaxCollapsibleHeight] = useState(0);

  const calculateMaxCollapsibleHeight = (data: User[], containerHeight: number) => {
    return containerHeight - data.length * (HEADER_HEIGHT + 16);
  };

  useEffect(() => {
    setMaxCollapsibleHeight(calculateMaxCollapsibleHeight(users, availableHeight));
  }, [users.length, availableHeight]);

  return (
    <View
      style={styles.wrapper}
      onLayout={(event) => {
        setAvailableHeight(event.nativeEvent.layout.height);
      }}>
      <View>
        {users.map((user, index) => {
          return (
            <View key={user.id}>
              <UsersListSectionHeader
                sectionIndex={index}
                title={user.login}
                activeSectionIndex={activeSectionIndex}
              />
              <Collapsible
                children={<RepositoriesList repositoryUrl={user.repos_url} />}
                sectionIndex={index}
                activeSectionIndex={activeSectionIndex}
                maxCollapsibleHeight={maxCollapsibleHeight}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
  },
});
