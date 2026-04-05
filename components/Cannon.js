import React from "react";
import { View, Image } from "react-native";
import Matter from "matter-js";

const CannonRenderer = ({ body, size }) => {
	const x = body.position.x - size.width / 2;
	const y = body.position.y - size.height / 2;

	const angle = body.angle;
	return (
		<View
			style={{
				position: "absolute",
				left: x,
				top: y,
				width: size.width,
				height: size.height,
				transform: [{ rotate: `${angle}rad` }],
				justifyContent: "center",
				alignItems: "center",
			}}>
			<Image
				source={require("../assets/cannon.png")}
				style={{
					width: size.width,
					height: size.height,
					resizeMode: "contain",
					transform: [{ rotate: "240deg" }],
				}}
			/>
		</View>
	);
};

export default (world, pos, size, options = {}) => {
	const body = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
		label: options.label || "Cannon",
		isStatic: options.isStatic || false,
		frictionAir: 0,
		angularVelocity: 0,
		restitution: 1,
		friction: 0,
		frictionStatic: 0,
	});

	Matter.World.add(world, body);

	return {
		body,
		pos,
		size,
		options,
		renderer: <CannonRenderer />,
	};
};
