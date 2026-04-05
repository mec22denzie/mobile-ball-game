import React, { useEffect, useRef } from "react";
import { Animated, View, Text, StyleSheet, TouchableOpacity } from "react-native";

const SplashScreen = ({ onHide }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleStart = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -300,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide && onHide();
    });
  };

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        <Text style={styles.title}>Welcome to Basket Shot Game</Text>
        <Text style={styles.subtitle}>Aim carefully and score points!</Text>
        <Text style={styles.instructions}>
          Tap Start to begin the challenge.
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleStart}
          onPressIn={() => {
            Animated.spring(buttonScale, {
              toValue: 0.95,
              useNativeDriver: true,
            }).start();
          }}
          onPressOut={() => {
            Animated.spring(buttonScale, {
              toValue: 1,
              useNativeDriver: true,
            }).start();
          }}
        >
          <Animated.View style={[styles.button, { transform: [{ scale: buttonScale }] }]}>
            <Text style={styles.buttonText}>Tap to Start</Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87CEEB",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 20,
    color: "#fefefe",
    textAlign: "center",
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    color: "#f0f0f0",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#ff9800",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default SplashScreen;