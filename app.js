'use strict';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// returns a promise
const createImage = (filename) => new Promise((resolve) => {
  const image = new Image();
  image.src = filename;
  image.onload = () => resolve(image);
});

const initialState = {
  imgSpaceShip: undefined,
  mouse: {
    x: undefined,
    y: undefined
  }
};

const state = Object.assign({}, initialState);

const loadImages = () => {
  createImage('./space-ship.png')
    .then(image => state.imgSpaceShip = image);
};

const update = (time) => {

};

const draw = (time) => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (state.imgSpaceShip !== undefined) {
    const size = state.imgSpaceShip.height;
    const top = canvas.height - state.imgSpaceShip.height;
    // If the mouse position is not yet defined, we'll assume the position is the center of the screen
    const hasMousePosition =
      state.mouse.x !== undefined &&
      state.mouse.y !== undefined &&
      Number.isInteger(state.mouse.x) &&
      Number.isInteger(state.mouse.y);
    let xPos = (hasMousePosition ? state.mouse.x : (canvas.width / 2)) - (size / 2);
    if (xPos < 0) {
      xPos = 0;
    } else if (xPos > canvas.width - size) {
      xPos = canvas.width - size;
    }
    ctx.drawImage(state.imgSpaceShip,
      0, 0, size, size, // Source Image, Location and size: (0, 0) => (size, size)
      xPos, top, size, size // Destination Image on canvas, Location and size: (10, top) => (size, size)
    );
  }
};

const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
window.addEventListener('resize', resize);

const onMouseMove = (e) => {
  state.mouse.x = e.clientX;
  state.mouse.y = e.clientY;
};
window.addEventListener('mousemove', onMouseMove);

const loop = (currentTime) => {
  update(currentTime);
  draw(currentTime);
  requestAnimationFrame(loop);
};

const init = () => {
  resize();
  loadImages();
  requestAnimationFrame(loop);
}
init();
