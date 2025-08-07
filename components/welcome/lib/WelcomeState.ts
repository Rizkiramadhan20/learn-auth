// router will be passed as a parameter from the parent component
import { useEffect } from "react";

import { Dimensions } from "react-native";

import { Gesture } from "react-native-gesture-handler";

import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const SLIDER_WIDTH = width - 64;
const HANDLE_SIZE = 56;

export function useWelcomeState(onComplete: () => void) {
  const translateX = useSharedValue(0);
  const fadeAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(0.8);
  const slideAnim = useSharedValue(50);
  const sliderScale = useSharedValue(1);
  const sliderRotation = useSharedValue(0);
  const progressOpacity = useSharedValue(0.8);
  const backgroundScale = useSharedValue(1);
  const particleOpacity = useSharedValue(0);
  const glowIntensity = useSharedValue(0);
  const MAX_SLIDE_DISTANCE = SLIDER_WIDTH - HANDLE_SIZE - 16;

  // Entrance animations
  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 1000 });
    scaleAnim.value = withSpring(1, { damping: 15, stiffness: 100 });
    slideAnim.value = withSpring(0, { damping: 15, stiffness: 100 });
  }, [fadeAnim, scaleAnim, slideAnim]);

  const pan = Gesture.Pan()
    .onBegin(() => {
      // Scale up and add rotation when starting to drag
      sliderScale.value = withSpring(1.1, { damping: 15, stiffness: 200 });
      sliderRotation.value = withSpring(5, { damping: 15, stiffness: 200 });
      progressOpacity.value = withTiming(1, { duration: 200 });

      // Background effects
      backgroundScale.value = withSpring(1.05, { damping: 15, stiffness: 200 });
      particleOpacity.value = withTiming(1, { duration: 300 });
      glowIntensity.value = withTiming(1, { duration: 200 });
    })
    .onUpdate((event) => {
      const newValue = Math.max(
        0,
        Math.min(event.translationX, MAX_SLIDE_DISTANCE)
      );
      translateX.value = newValue;

      // Dynamic rotation based on drag progress - fixed direction
      const progress = newValue / MAX_SLIDE_DISTANCE;
      sliderRotation.value = withSpring(-progress * 15, {
        damping: 15,
        stiffness: 200,
      });
    })
    .onEnd(() => {
      // Reset animations
      sliderScale.value = withSpring(1, { damping: 15, stiffness: 200 });
      sliderRotation.value = withSpring(0, { damping: 15, stiffness: 200 });
      progressOpacity.value = withTiming(0.8, { duration: 300 });

      // Reset background effects
      backgroundScale.value = withSpring(1, { damping: 15, stiffness: 200 });
      particleOpacity.value = withTiming(0, { duration: 300 });
      glowIntensity.value = withTiming(0, { duration: 300 });

      if (translateX.value >= MAX_SLIDE_DISTANCE * 0.8) {
        translateX.value = withSpring(MAX_SLIDE_DISTANCE, {
          damping: 15,
          stiffness: 100,
        });
        runOnJS(onComplete)();
      } else {
        translateX.value = withSpring(0, { damping: 15, stiffness: 100 });
      }
    });

  const sliderHandleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { scale: sliderScale.value },
        { rotate: `${sliderRotation.value}deg` },
      ],
    };
  });

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: translateX.value + HANDLE_SIZE,
      opacity: progressOpacity.value,
    };
  });

  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
    };
  });

  const scaleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleAnim.value }],
    };
  });

  const slideStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: slideAnim.value }],
    };
  });

  return {
    pan,
    sliderHandleStyle,
    progressStyle,
    fadeStyle,
    scaleStyle,
    slideStyle,
    SLIDER_WIDTH,
    HANDLE_SIZE,
  };
}
