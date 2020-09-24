const io = require('socket.io')();
const { createGameState, gameLoop, getUpdateVelocity} = require('./game');
const { FRAME_RATE } = require('./constants');

io.on('connection', client => {
  // client.emit('init', {data: 'hello'});
  const state = createGameState();

  client.on('keydown', handleKeydown);

  function handleKeydown(keyCode) {
    try {
      keyCode = parseInt(keyCode);
    } catch (e) {
      console.error(e);
      return;
    }

    const vel = getUpdateVelocity(keyCode);
    if(vel) {
      state.player.vel = vel;
    }
  }

  startGmaeInterval(client, state);
});

function startGmaeInterval(client, state) {
  const intervalId = setInterval(() => {
    const winner = gameLoop(state);
    if(!winner) {
      client.emit('gameState', JSON.stringify(state));
    }
    else {
      client.emit('gameOver');
      clearInterval(intervalId);
    }
  }, 1000 / FRAME_RATE);
}

io.listen(3000);
