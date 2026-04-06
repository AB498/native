import React from 'react';
import {Animated, StyleProp, StyleSheet, ViewStyle} from 'react-native';

type ShimmerPlaceholderProps = {
  style?: StyleProp<ViewStyle>;
};

export default function ShimmerPlaceholder({style}: ShimmerPlaceholderProps) {
  const opacity = React.useRef(new Animated.Value(0.45)).current;

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.9,
          duration: 850,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.45,
          duration: 850,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [opacity]);

  return <Animated.View style={[styles.block, style, {opacity}]} />;
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
});
