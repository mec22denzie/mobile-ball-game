import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, StyleSheet, Text, View, Alert, ImageBackground } from "react-native";
import { Audio } from "expo-av";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities/index";
import React, { useEffect, useRef, useState } from "react";
import Physics from "./Physics";
import SplashScreen from "./pages/SplashScreen";
import SoundButton from "./components/SoundButton";
import Constants from "./Constants";
import ControlButton from "./components/ControlButton";
import Scoreboard from "./components/Scoreboard";
export default function App() {
	const [gameEngine, setGameEngine] = useState(null);
	const [running, setRunning] = useState(false);
	const [gameOver, setGameOver] = useState(false);
	const [score, setScore] = useState(0);
	const [sound, setSound] = useState(null);
	const [isSoundOn, setIsSoundOn] = useState(false);
	const [rankBoard, setRankBoard] = useState([]);
	const [ballQuantity, setBallQuantity] = useState(Constants.BALL_QUANTITY);
	const ballQuantityRef = useRef(Constants.BALL_QUANTITY);
	const playerNameRef = useRef("");
	const scoreRef = useRef(0);
	const startGame = enteredName => {
		playerNameRef.current = enteredName;
		setRunning(true);
		setGameOver(false);
		setScore(0);
		scoreRef.current = 0;
		ballQuantityRef.current = Constants.BALL_QUANTITY;
		setBallQuantity(Constants.BALL_QUANTITY);
		gameEngine.swap(entities());
		gameEngine.start();
	};

	const startGameFromGameOver = () => {
		setRunning(false);
		setGameOver(false);
		setScore(0);
		scoreRef.current = 0;
		ballQuantityRef.current = Constants.BALL_QUANTITY;
		setBallQuantity(Constants.BALL_QUANTITY);
		gameEngine.swap(entities());
		gameEngine.start();
	};

	const updateRankBoard = () => {
		setRankBoard(prevList => {
			const newList = [
				...prevList,
				{ id: new Date().toISOString(), name: playerNameRef.current, score: scoreRef.current },
			];
			// Sort highest to lowest
			newList.sort((a, b) => b.score - a.score);
			// Keep only top 5
			return newList.slice(0, 5);
		});
	};

	async function playSound() {
		try {
			if (sound) {
				const status = await sound.getStatusAsync();

				if (status.isLoaded) {
					await sound.playAsync();
					setIsSoundOn(true);
					return;
				}
			}

			const { sound: newSound } = await Audio.Sound.createAsync(
				require("./assets/audio/music.mp3"),
				{
					shouldPlay: true,
					isLooping: true,
					volume: 1.0,
				},
			);

			setSound(newSound);
			setIsSoundOn(true);
		} catch (error) {
			console.log("Error playing sound:", error);
		}
	}

	async function stopSound() {
		try {
			if (sound) {
				const status = await sound.getStatusAsync();
				if (status.isLoaded) {
					await sound.pauseAsync();
				}
			}
			setIsSoundOn(false);
		} catch (error) {
			console.log("Error stopping sound:", error);
		}
	}

	async function toggleSound() {
		if (isSoundOn) {
			await stopSound();
		} else {
			await playSound();
		}
	}

	useEffect(() => {
		return () => {
			if (sound) {
				sound.unloadAsync();
			}
		};
	}, [sound]);

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require("./assets/Sky.png")}
				style={styles.gameBackground}
				resizeMode="cover">
				<GameEngine
					ref={ref => {
						setGameEngine(ref);
					}}
					systems={[Physics]}
					entities={entities()}
					running={running}
					onEvent={e => {
						switch (e.type) {
							case "game_over":
								setRunning(false);
								setGameOver(true);
								gameEngine.stop();
								updateRankBoard();
								break;
							case "getScore":
								scoreRef.current += 10;
								setScore(scoreRef.current);
								break;
							case "ball_reset":
								if (ballQuantityRef.current <= 0) {
									setRunning(false);
									setGameOver(true);
									gameEngine.stop();
									updateRankBoard();
								}
								break;
						}
					}}
					style={styles.gameContainer}>
					<StatusBar style="auto" hidden={true} />
				</GameEngine>

				{/*Splash Screen shows game info and group member and start btn */}
				{!running && <SplashScreen onHide={startGame} />}
				{/* the toggle sound btn */}
				<View style={styles.soundBtn}>
					<SoundButton isSoundOn={isSoundOn} onPress={toggleSound} />
				</View>
				{/* the balls counter */}
				{running && (
					<View style={styles.ballCountContainer}>
						<Text style={styles.ballCountText}>
							🏀 {ballQuantity} / {Constants.BALL_QUANTITY}
						</Text>
					</View>
				)}
			</ImageBackground>

			{running && (
				<View style={styles.controls}>
					<View style={styles.controlRow}>
						<ControlButton
							title="Left"
							onPress={() => {
								gameEngine.dispatch({ type: "move-left" });
							}}
						/>

						<ControlButton
							title="Shoot"
							onPress={() => {
								if (ballQuantityRef.current > 0) {
									ballQuantityRef.current -= 1;
									setBallQuantity(ballQuantityRef.current); // Update UI
									gameEngine.dispatch({ type: "shot-ball" });
								}
							}}
						/>

						<ControlButton
							title="Right"
							onPress={() => {
								gameEngine.dispatch({ type: "move-right" });
							}}
						/>
					</View>
				</View>
			)}
			<View style={styles.scoreContainer}>
				<Text style={styles.scoreText}>Score: </Text>
				<Text style={[styles.scoreText, { fontWeight: 600 }]}>{score}</Text>
			</View>

			{/* game over shows the ranking board */}

			{gameOver && (
				<Scoreboard
					startGame={startGameFromGameOver}
					scores={rankBoard && rankBoard.length > 0 ? rankBoard : []}
				/>
			)}
		</View>
	);
}

// Styles here
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	gameContainer: {
		position: "absolute",
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
	},

	watermark: {
		fontSize: 22,
		top: -20,
	},

	controls: {
		flex: 1,
		top: Constants.SCREEN_HEIGHT - 120,
		alignItem: "center",
		gap: 4,
	},

	controlRow: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 4,
	},

	centerText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
		alignSelf: "center",
	},
	startGameContainer: {
		top: 250,
		backgroundColor: "black",
	},
	startGameText: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		color: "white",
		fontSize: 20,
		fontWeight: 800,
	},
	scoreContainer: {
		flexDirection: "row",
		top: -30,
	},
	scoreText: {
		fontSize: 18,
		color: "white",
	},
	winningText: {
		fontSize: 20,
		fontWeight: 800,
		color: "pink",
		backgroundColor: "gray",
		padding: 20,
		top: -640,
	},
	gameOverContainer: {
		top: -460,
		fontSize: 20,
		fontWeight: 800,
		color: "pink",
		backgroundColor: "black",
		padding: 20,
	},
	gameOverText: {
		fontSize: 20,
		fontWeight: 800,
		color: "pink",
	},
	gameBackground: {
		position: "absolute",
		top: 0,
		width: "100%",
		height: "100%", // top half of the screen
	},
	soundBtn: {
		position: "absolute",
		top: 40,
		right: 20,
		zIndex: 100,
		elevation: 10,
	},
	ballCountContainer: {
		position: "absolute",
		top: 40,
		right: Constants.WINDOW_WIDTH / 2 + 70,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "white",
	},
	ballCountText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
});
