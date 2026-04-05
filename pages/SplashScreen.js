import React, { useEffect, useRef, useState } from "react";
import {
	Animated,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ImageBackground,
	Image,
	TextInput,
} from "react-native";

const SplashScreen = ({ onHide }) => {
	const opacity = useRef(new Animated.Value(0)).current;
	const translateY = useRef(new Animated.Value(50)).current;

	const [userName, setUserName] = useState("");

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

	return (
		<ImageBackground
			source={require("../assets/Sky.png")} // SAME BACKGROUND AS GAME
			style={styles.container}
			resizeMode="cover">
			<Animated.View style={{ opacity, transform: [{ translateY }] }}>
				{/* Optional bird for visual match */}
				<Image source={require("../assets/bird.png")} style={styles.bird} />

				<View style={styles.textBox}>
					<Text style={styles.title}>Basket Shot Game</Text>
					<Text style={styles.subtitle}>Aim carefully and score points!</Text>
				</View>
				<View style={styles.textBox}>
					<Text style={styles.subtitle}>Input your name and start game</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter your name..."
						placeholderTextColor="#666"
						maxLength={20}
						value={userName}
						onChangeText={setUserName}
					/>
				</View>
				<View style={styles.textBox}>
					<Text style={styles.title}>Group Member</Text>
					<Text style={styles.subtitle}>Mary Eden Ciasico</Text>
					<Text style={styles.subtitle}>Haocheng Qiu</Text>
					<Text style={styles.subtitle}>Seoryung Chu</Text>
				</View>

				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						const finalName = userName.trim() === "" ? "Unknown User" : userName;
						onHide(finalName);
					}}>
					<Text style={styles.buttonText}>START GAME</Text>
				</TouchableOpacity>
			</Animated.View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	bird: {
		width: 80,
		height: 80,
		alignSelf: "center",
		marginBottom: 20,
	},
	title: {
		fontSize: 36,
		fontWeight: "bold",
		color: "#ffffff",
		textAlign: "center",
		marginBottom: 10,

		textShadowColor: "#000",
		textShadowOffset: { width: 2, height: 2 },
		textShadowRadius: 4,
	},

	subtitle: {
		fontSize: 18,
		color: "#ffffff",
		textAlign: "center",
		marginBottom: 30,

		textShadowColor: "#000",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 3,
	},
	button: {
		backgroundColor: "#FFD700", // bright yellow
		paddingVertical: 15,
		paddingHorizontal: 40,
		borderRadius: 10,
		borderWidth: 3,
		borderColor: "#000000", // black border
		alignItems: "center",
	},

	buttonText: {
		color: "#000000", // black text
		fontSize: 18,
		fontWeight: "bold",
	},
	textBox: {
		backgroundColor: "rgba(0,0,0,0.4)", // dark transparent
		padding: 15,
		borderRadius: 10,
		marginBottom: 20,
	},
	input: {
		backgroundColor: "#ffffff",
		paddingVertical: 12,
		paddingHorizontal: 15,
		borderRadius: 8,
		borderWidth: 2,
		borderColor: "#000000",
		fontSize: 18,
		color: "#000000",
		fontWeight: "bold",
		marginTop: -10,
		marginBottom: 10,
	},
});

export default SplashScreen;
