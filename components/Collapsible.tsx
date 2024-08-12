import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface CollapsibleProps extends PropsWithChildren {
  activeSectionIndex: SharedValue<number | null>;
  sectionIndex: number;
  maxCollapsibleHeight?: number;
}

const MAX_HEIGHT = 300;

export function Collapsible({
  children,
  activeSectionIndex,
  sectionIndex,
  maxCollapsibleHeight = MAX_HEIGHT,
}: CollapsibleProps) {
  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(activeSectionIndex.value === sectionIndex), {
      duration: 500,
    }),
  );
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  return (
    <Animated.View
      style={[styles.animatedView, bodyStyle]}
      onLayout={(_) => {
        height.value = maxCollapsibleHeight;
      }}>
      <View style={[styles.wrapper, { height: maxCollapsibleHeight }]}>{children}</View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedView: {
    width: '100%',
    overflow: 'hidden',
  },
  wrapper: {
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
