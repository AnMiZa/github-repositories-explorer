import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const MAX_HEIGHT = 300;

export function Collapsible({
  children,
  activeSectionIndex,
  sectionIndex,
  maxCollapsibleHeight = MAX_HEIGHT,
}: PropsWithChildren & {
  activeSectionIndex: SharedValue<number | null>;
  sectionIndex: number;
  maxCollapsibleHeight?: number;
}) {
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
    <>
      <Animated.View
        style={[styles.animatedView, bodyStyle]}
        onLayout={(_) => {
          height.value = maxCollapsibleHeight;
        }}>
        <View style={[styles.wrapper, { height: maxCollapsibleHeight }]}>{children}</View>
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
    alignItems: 'center',
    overflow: 'hidden',
  },
});
