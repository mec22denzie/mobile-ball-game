import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function SoundButton({ isSoundOn, onPress }) {
  return (
    <TouchableOpacity style={styles.soundButton} onPress={onPress}>
      <Text style={styles.soundButtonText}>{isSoundOn ? "🔊" : "🔇"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  soundButton: {
    backgroundColor: "#f5d313",
    borderWidth: 2,
    borderColor: "#222",
    borderRadius: 10,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },

  soundButtonText: {
    fontSize: 20,
  },
});
