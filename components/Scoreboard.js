import React, { useRef, useEffect } from "react";
import { FlatList, Animated, View, Text, StyleSheet } from "react-native";
import ControlButton from "./ControlButton";
import Constants from "../Constants";

const AnimatedScoreItem = ({ item, index }) => {
	const fadeAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 500,
			delay: index * 100,
			useNativeDriver: true,
		}).start();
	}, [fadeAnim, index]);

	return (
		<Animated.View
			style={[
				styles.item,
				{
					opacity: fadeAnim,
					transform: [
						{
							translateY: fadeAnim.interpolate({
								inputRange: [0, 1],
								outputRange: [50, 0],
							}),
						},
					],
				},
			]}>
			<Text style={styles.playerName}>{item.name}</Text>
			<Text style={styles.scoreText}>Score: {item.score}</Text>
		</Animated.View>
	);
};

const Scoreboard = ({ scores, startGame }) => {
	const renderItem = ({ item, index }) => <AnimatedScoreItem item={item} index={index} />;

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Game Over!</Text>
			<Text style={styles.header}>Scoreboard</Text>

			<FlatList
				data={scores}
				renderItem={renderItem}
				keyExtractor={item => item.id}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.listContent}
			/>
			<View style={styles.controlBtnContainer}>
				<ControlButton title="Start Game" onPress={startGame} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		backgroundColor: "#6ec6ff",
	},
	header: {
		fontSize: 28,
		fontWeight: "bold",
		textAlign: "center",
		marginVertical: 15,
		color: "#fff",
		textShadowColor: "#000",
		textShadowOffset: { width: 2, height: 2 },
		textShadowRadius: 3,
	},
	listContent: {
		padding: 10,
	},
	item: {
		backgroundColor: "#FFD700",
		padding: 20,
		marginVertical: 8,
		borderRadius: 12,
		borderWidth: 3,
		borderColor: "#000",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	playerName: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#222",
	},
	scoreText: {
		fontSize: 18,
		color: "#444",
		marginTop: 5,
	},
	controlBtnContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: Constants.SCREEN_WIDTH,
	},
});

export default Scoreboard;
