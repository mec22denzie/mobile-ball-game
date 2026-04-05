import React from "react";
import { View, Image } from "react-native";
import Matter from "matter-js";

const TOTAL_FRAMES = 4;

const BirdObstacle = ({ body, size, frame }) => {
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
        overflow: "hidden",
        transform: [{ rotate: `${angle}rad` }],
      }}
    >
      <Image
        source={require("../assets/bird.png")}
        style={{
          position: "absolute",
          width: size.width * TOTAL_FRAMES,
          height: size.height,
          left: -(frame || 0) * size.width,
        }}
        resizeMode="stretch"
      />
    </View>
  );
};

export default (world, pos, size, options = {}) => {
  const body = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    options
  );

  Matter.World.add(world, body);

  return {
    body,
    size,
    frame: 0,
    renderer: <BirdObstacle />,
  };
};