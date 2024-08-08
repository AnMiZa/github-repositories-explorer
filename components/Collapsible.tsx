import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, View, Text } from 'react-native';

import { Colors } from '@/constants/Colors';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const height = useSharedValue(0);
  const isExpanded = useSharedValue(false);
  const onPress = () => {
    isExpanded.value = !isExpanded.value;
  };
  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded.value), {
      duration: 500,
    }),
  );
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  return (
    <>
      <TouchableOpacity style={styles.heading} onPress={onPress} activeOpacity={0.8}>
        <Text>{title}</Text>
        <Ionicons name={isExpanded.value ? 'chevron-down' : 'chevron-forward-outline'} size={18} />
      </TouchableOpacity>
      <Animated.View style={[styles.animatedView, bodyStyle]}>
        <View
          onLayout={(e) => {
            height.value = e.nativeEvent.layout.height;
          }}
          style={styles.wrapper}>
          {children}
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    borderRadius: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'rgba(11,84,116,0.16)',
    height: 40,
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
