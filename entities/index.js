import { Dimensions } from "react-native";
import Boundary from "../components/Boundary";
import Matter from "matter-js";
import Constants from "../Constants";
import Ball from "../components/Ball";
import Cannon from "../components/Cannon";
import Basket from "../components/Basket";
import BirdObstacle from "../components/Bird";

// const screenHeight = Dimensions.get("window").height;
// const screenWidth = Dimensions.get("window").width;

export default gameWorld => {
	let engine = Matter.Engine.create({ enableSleeping: false });
	let world = engine.world;
	engine.gravity.y = 1;

	return {
		physics: { engine, world },
		//cannon
		Cannon: Cannon(
			world,
			{ x: Constants.WINDOW_WIDTH / 2, y: 70 },
			{ width: 120, height: 100 },
			{
				isStatic: true,
				label: "Enemy",
			},
		),
		//Ball
		Ball: Ball(world, { x: -1000, y: -1000 }, 30, { label: "Player" }),

		//Basket
		Basket: Basket(
			world,
			{ x: Constants.WINDOW_WIDTH / 2, y: 700 },
			{ width: 220, height: 100 },
			{
				label: "Basket",
				isStatic: false,
			},
		),
		Bird1: BirdObstacle(
			world,
			{ x: 300, y: 230 },
			{ width: 80, height: 60 },
			{
				label: "BirdObstacle",
				isStatic: false,
			},
		),
		Bird2: BirdObstacle(
			world,
			{ x: 100, y: 380 },
			{ width: 80, height: 60 },
			{
				label: "BirdObstacle",
				isStatic: false,
			},
		),
		Bird3: BirdObstacle(
			world,
			{ x: 250, y: 520 },
			{ width: 80, height: 60 },
			{
				label: "BirdObstacle",
				isStatic: false,
			},
		),
		//Boundary
		BoundaryTop: Boundary(
			world,
			"yellow",
			{ x: Constants.WINDOW_WIDTH / 2, y: 0 },
			{ height: 30, width: Constants.WINDOW_WIDTH },
		),

		BoundaryLeft: Boundary(
			world,
			"yellow",
			{ x: 0, y: Constants.WINDOW_HEIGHT / 2 },
			{ height: Constants.WINDOW_HEIGHT, width: 30 },
		),

		BoundaryRight: Boundary(
			world,
			"yellow",
			{ x: Constants.WINDOW_WIDTH, y: Constants.WINDOW_HEIGHT / 2 },
			{ height: Constants.WINDOW_HEIGHT, width: 30 },
		),

		// Ground underneath the basket
		Ground: Boundary(
			world,
			"transparent",
			{ x: Constants.WINDOW_WIDTH / 2, y: 760 }, // Sits just underneath the basket
			{ height: 40, width: Constants.WINDOW_WIDTH },
			"ground",
		),

		BoundaryBottom: Boundary(
			world,
			"yellow",
			{ x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT },
			{ height: 30, width: Constants.WINDOW_WIDTH },
		),
	};
};
