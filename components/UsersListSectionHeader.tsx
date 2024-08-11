import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';

interface UsersListSectionHeaderProps {
  sectionIndex: number;
  title: string;
  activeSectionIndex: SharedValue<number | null>;
}

const HEADER_HEIGHT = 40;

export function UsersListSectionHeader({
  title,
  activeSectionIndex,
  sectionIndex,
}: UsersListSectionHeaderProps) {
  const chevronStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withTiming(`${activeSectionIndex.value === sectionIndex ? '90deg' : '0deg'}`, {
          duration: 200,
        }),
      },
    ],
  }));

  const handlePress = () => {
    if (activeSectionIndex.value === sectionIndex) {
      activeSectionIndex.value = null;
      return;
    }
    activeSectionIndex.value = sectionIndex;
  };

  return (
    <TouchableOpacity style={styles.header} onPress={handlePress} activeOpacity={0.8}>
      <Text>{title}</Text>
      <Animated.View style={[chevronStyle]}>
        <Ionicons name={'chevron-forward-outline'} size={18} />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    borderRadius: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'rgba(11,84,116,0.16)',
    height: HEADER_HEIGHT,
    marginBottom: 16,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
  animatedView: {
    width: '100%',
    overflow: 'hidden',
  },
  wrapper: {
    width: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
  },
});
