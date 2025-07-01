import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';

const AiButton = ({ onPress, onPressIn, onPressOut }) => {
  const [isPressed, setIsPressed] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(0.9)).current;

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
        tension: 150,
        friction: 4,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        tension: 150,
        friction: 4,
      }),
      Animated.timing(opacityValue, {
        toValue: 0.9,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPressIn={onPressIn || handlePressIn}
      onPressOut={onPressOut || handlePressOut}
      onPress={onPress}
      activeOpacity={1}
    >
      <Animated.View
        style={[
          styles.button,
          {
            transform: [{ scale: scaleValue }],
            opacity: opacityValue,
          },
        ]}
      >
        <Image
          source={require('../assets/ai-button.gif')} 
          style={styles.holographicBackground}
          resizeMode="cover"
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 15,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    outlineStyle: 'none'
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 0 20px 10px rgba(99, 140, 243, 0.52)',
  },
  holographicBackground: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 50,
  },
  gradientOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },

  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default AiButton;