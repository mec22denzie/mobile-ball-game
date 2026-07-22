import Matter, { Sleeping } from "matter-js";
import Boundary from "./components/Boundary";
import Constants from "./Constants";

let birdTimer = 0;
let birdFloatTime = 0;

const Physics = (entities, { touches, dispatch, events, time }) => {
	let engine = entities.physics.engine;
	engine.world.gravity.y = 1;

	const resetBall = () => {
		if (entities.Ball) {
			Matter.Sleeping.set(entities.Ball.body, true); // Freeze it
			Matter.Body.setPosition(entities.Ball.body, { x: -1000, y: -1000 }); // Move off-screen
			Matter.Body.setVelocity(entities.Ball.body, { x: 0, y: 0 });

			dispatch({ type: "ball_reset" });
		}
	};

	/*************TOUCH CONTROLS WITH ARROW KEY ****************/
	if (events.length) {
		for (let i = 0; i < events.length; i++) {
			if (events[i].type === "move-left") {
				Matter.Body.setVelocity(entities.Basket.body, { x: -10, y: 0 });
			}
			if (events[i].type === "move-right") {
				Matter.Body.setVelocity(entities.Basket.body, { x: 10, y: 0 });
			}
			if (events[i].type === "shot-ball") {
				// Only shoot if ball is offscreen (prevents multiple balls in the air)
				if (
					entities.Ball.body.position.y < 0 ||
					entities.Ball.body.position.y > Constants.WINDOW_HEIGHT
				) {
					let cannonAngle = entities.Cannon.body.angle;

					// Wake the ball up and place it at the Cannon's current position
					Matter.Sleeping.set(entities.Ball.body, false);
					Matter.Body.setPosition(entities.Ball.body, {
						x: entities.Cannon.body.position.x,
						y: entities.Cannon.body.position.y + 50,
					});

					// Calculate trajectory based on Cannon's angle
					let speed = 18;
					Matter.Body.setVelocity(entities.Ball.body, {
						x: -speed * Math.sin(cannonAngle),
						y: speed * Math.cos(cannonAngle),
					});
				}
			}
		}
	}

	if (entities.Basket) {
		Matter.Body.setPosition(entities.Basket.body, {
			x: entities.Basket.body.position.x,
			y: 500, // Lock strictly to the ground level so it doesn't fall
		});
		Matter.Body.setVelocity(entities.Basket.body, {
			x: entities.Basket.body.velocity.x * 0.85, // Friction slows it down when button is released
			y: 0,
		});
	}

	if (entities.Cannon) {
		// Math.sin combined with time gives a perfect smooth loop
		let angle = Math.sin(time.current / 600) * (Math.PI / 6); // Loops between -30 and +30 degrees
		Matter.Body.setAngle(entities.Cannon.body, angle);
	}
	/************* BIRD FLYING ANIMATION + MOVEMENT ****************/
	birdTimer += time.delta;
	birdFloatTime += time.delta;

	const birdHeights = {
		Bird1: 230,
		Bird2: 380,
		Bird3: 520,
	};

	["Bird1", "Bird2", "Bird3"].forEach((birdKey, index) => {
		if (entities[birdKey]) {
			if (birdTimer > 100) {
				entities[birdKey].frame = (entities[birdKey].frame + 1) % 4;
			}

			let phase = index * (Math.PI / 1.5);
			let speed = 1500 + index * 300;
			let xOffset = Math.sin(birdFloatTime / speed + phase) * (Constants.WINDOW_WIDTH / 2 - 40);

			// Lock birds Y position strictly to the fixed heights!
			Matter.Body.setPosition(entities[birdKey].body, {
				x: Constants.WINDOW_WIDTH / 2 + xOffset,
				y: birdHeights[birdKey],
			});

			// Failsafe: Reset any downward velocity gravity tries to apply
			Matter.Body.setVelocity(entities[birdKey].body, { x: 0, y: 0 });
		}
	});

	if (birdTimer > 100) {
		birdTimer = 0;
	}

	/************COLLISIONS************/

	// clear the duplicate collision
	Matter.Events.off(engine, "collisionStart");

	Matter.Events.on(engine, "collisionStart", event => {
		event.pairs.forEach(pair => {
			let labelA = pair.bodyA.label;
			let labelB = pair.bodyB.label;

			const isMatch = (l1, l2) =>
				(labelA === l1 && labelB === l2) || (labelA === l2 && labelB === l1);

			// If Ball hits Basket -> User wins 10 points!
			if (isMatch("Player", "Basket")) {
				dispatch({ type: "getScore" });
				resetBall();
			}

			// If Ball hits Bird -> Disappear
			if (isMatch("Player", "BirdObstacle")) {
				resetBall();
			}

			// If Ball hits the Ground -> Disappear
			if (isMatch("Player", "ground")) {
				resetBall();
			}

			// Failsafe: if it hits the bottom boundary (missed the basket entirely)
			if (isMatch("Player", "Boundary")) {
				let ballBody = labelA === "Player" ? pair.bodyA : pair.bodyB;
				if (ballBody.position.y > Constants.WINDOW_HEIGHT - 60) {
					resetBall();
				}
			}
		});
	});

	/* set the enemy2's gravity */
	if (entities.Enemy2Square) {
		Matter.Body.applyForce(entities.Enemy2Square.body, entities.Enemy2Square.body.position, {
			x: 0,
			y: 0.00001,
		});
	}

	Matter.Engine.update(engine, time.delta);
	return entities;
};

export default Physics;
