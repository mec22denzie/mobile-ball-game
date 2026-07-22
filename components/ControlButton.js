import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ControlButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.controlButton} onPress={onPress}>
      <Text style={styles.controlButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  controlButton: {
    backgroundColor: "#f5d313",
    borderWidth: 2,
    borderColor: "#222",
    borderRadius: 10,
    paddingVertical: 14,
    width: 110,
    alignItems: "center",
  },

  controlButtonText: {
    fontWeight: "800",
    color: "#222",
  },
});
