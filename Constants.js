import { Dimensions } from "react-native";

const Constants = {
	SCREEN_WIDTH: Dimensions.get("screen").width,
	SCREEN_HEIGHT: Dimensions.get("screen").height,
	WINDOW_WIDTH: Dimensions.get("window").width,
	WINDOW_HEIGHT: Dimensions.get("window").height,
	BALL_QUANTITY: 10,
};

export default Constants;
