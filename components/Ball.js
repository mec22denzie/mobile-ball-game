import React from "react";
import { View, Image } from "react-native";
import Matter from "matter-js";

const Ball = (props) => {
  const width = props.size;
  const height = props.size;
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  return (
    <View
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height
      }}
    >
      <Image
        source={require("../assets/ball.png")}
        style={{ width: width, height: height }}
      />
    </View>
  );
};

export default (world, pos, size, options) => {
  const ball = Matter.Bodies.circle(pos.x, pos.y, size / 2, options);

  Matter.World.add(world, ball);

  return {
    body: ball,
    size,
    renderer: Ball
  };
};