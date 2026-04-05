import React from "react";
import { View, Image } from "react-native";
import Matter from "matter-js";

const BasketRenderer = ({ body, size }) => {
  const x = body.position.x - size.width / 2;
  const y = body.position.y - size.height / 2;

  return (
    <View
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size.width,
        height: size.height,
      }}
    >
      <Image
        source={require("../assets/basket.png")}
        style={{
          width: size.width,
          height: size.height,
          resizeMode: "contain",
        }}
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
    {
      label: options.label || "Basket",
      isStatic: options.isStatic || false,
    }
  );

  Matter.World.add(world, body);

  return {
    body,
    pos,
    size,
    options,
    renderer: <BasketRenderer />,
  };
};