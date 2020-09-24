const { GRID_SIZE } = require('./constants');

module.exports = {
  createGameState,
  gameLoop,
  getUpdateVelocity
}

function createGameState() {
  return {
    player: {
      // position
      pos: {
        x: 3,
        y: 10,
      },
      // velocity
      vel: {
        x: 1,
        y: 0,
      },
      snake: [
        {x: 1, y: 10},
        {x: 2, y: 10},
        {x: 3, y: 10},
      ],
    },
    food: {
      x: 7,
      y: 7,
    },
    gridsize: GRID_SIZE,
  }
};

function gameLoop(state) {
  // console.log(state);
  if(!state) return;
  const playerOne = state.player;

  playerOne.pos.x += playerOne.vel.x;
  playerOne.pos.y += playerOne.vel.y;


  // 判断是否撞墙
  if(playerOne.pos.x < 0 || playerOne.pos.x > GRID_SIZE || playerOne.pos.y < 0 || playerOne.pos.y > GRID_SIZE) {
    console.log('撞墙');
    return 2;
  }

  // 判断是否吃到实物
  if(state.food.x === playerOne.pos.x && state.food.y === playerOne.pos.y) {
    playerOne.snake.push({ ...playerOne.pos });
    playerOne.pos.x += playerOne.vel.x;
    playerOne.pos.y += playerOne.vel.y;
    // randomFood(state);
  }

  if(playerOne.vel.x || playerOne.vel.y) {
    console.log('🐍', playerOne.snake);
    for (let cell of playerOne.snake) {
      console.log('x =', cell.x);
      console.log('y =', cell.y);
      if(cell.x === playerOne.pos.x && cell.y === playerOne.pos.y) {
        console.log('333');
        return 2;
      }
    }
    playerOne.snake.push({ ...playerOne.pos });
    playerOne.snake.shift();
  }

  return false;
}

// 递归
function randomFood(state) {
  // console.log(state);
  food = {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  }
  for (var cell of state.player.snake) {
    // eat food
    if(cell.x === food.x && cell.y === food.y) {
      return randomFood(state);
    }
  }
  state.food = food;
}

function getUpdateVelocity(keyCode) {
  switch (keyCode) {
    // left
    case 37: {
      return { x: -1, y: 0 };
    }
    // down
    case 38: {
      return { x: 0, y: -1 };
    }
    // right
    case 39: {
      return { x: 1, y: 0 };
    }
    // up
    case 40: {
      return { x: 0, y: 1 };
    }
  }
}
