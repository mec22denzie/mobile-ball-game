import Boundary from "../components/Boundary";
import Matter from "matter-js";
import Constants from "../Constants";
import Ball from "../components/Ball";
import Cannon from "../components/Cannon";
import Basket from "../components/Basket";
import BirdObstacle from "../components/Bird";

export default (
  windowWidth = Constants.WINDOW_WIDTH,
  windowHeight = Constants.WINDOW_HEIGHT
) => {
  const engine = Matter.Engine.create({
    enableSleeping: false,
  });

  const world = engine.world;
  engine.gravity.y = 1;

  return {
    physics: {
      engine,
      world,
    },

    // Store the current browser dimensions for Physics.js
    screen: {
      width: windowWidth,
      height: windowHeight,
      renderer: null,
    },

    Cannon: Cannon(
      world,
      {
        x: windowWidth / 2,
        y: 70,
      },
      {
        width: 120,
        height: 100,
      },
      {
        isStatic: true,
        label: "Enemy",
      }
    ),

    Ball: Ball(
      world,
      {
        x: -1000,
        y: -1000,
      },
      30,
      {
        label: "Player",
      }
    ),

    Basket: Basket(
      world,
      {
        x: windowWidth / 2,
        y: windowHeight - 140,
      },
      {
        width: 220,
        height: 100,
      },
      {
        label: "Basket",
        isStatic: false,
      }
    ),

    Bird1: BirdObstacle(
      world,
      {
        x: windowWidth * 0.75,
        y: windowHeight * 0.27,
      },
      {
        width: 80,
        height: 60,
      },
      {
        label: "BirdObstacle",
        isStatic: false,
      }
    ),

    Bird2: BirdObstacle(
      world,
      {
        x: windowWidth * 0.8,
        y: windowHeight * 0.45,
      },
      {
        width: 80,
        height: 60,
      },
      {
        label: "BirdObstacle",
        isStatic: false,
      }
    ),

    Bird3: BirdObstacle(
      world,
      {
        x: windowWidth * 0.7,
        y: windowHeight * 0.62,
      },
      {
        width: 80,
        height: 60,
      },
      {
        label: "BirdObstacle",
        isStatic: false,
      }
    ),

    BoundaryTop: Boundary(
      world,
      "yellow",
      {
        x: windowWidth / 2,
        y: 0,
      },
      {
        height: 30,
        width: windowWidth,
      }
    ),

    BoundaryLeft: Boundary(
      world,
      "yellow",
      {
        x: 0,
        y: windowHeight / 2,
      },
      {
        height: windowHeight,
        width: 30,
      }
    ),

    BoundaryRight: Boundary(
      world,
      "yellow",
      {
        x: windowWidth,
        y: windowHeight / 2,
      },
      {
        height: windowHeight,
        width: 30,
      }
    ),

    Ground: Boundary(
      world,
      "transparent",
      {
        x: windowWidth / 2,
        y: windowHeight - 60,
      },
      {
        height: 40,
        width: windowWidth,
      },
      "ground"
    ),

    BoundaryBottom: Boundary(
      world,
      "yellow",
      {
        x: windowWidth / 2,
        y: windowHeight,
      },
      {
        height: 30,
        width: windowWidth,
      }
    ),
  };
};