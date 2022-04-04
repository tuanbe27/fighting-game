//Music
const music = document.getElementById('music');
const source = document.querySelector('source');

const musicSrc = [
  './music/CoEmDay-NhuViet-7126614.mp3',
  './music/DeVuong-DinhDungACV-7121634.mp3',
  './music/TrenTinhBanDuoiTinhYeu-MIN-6802163.mp3',
  './music/YeuDuongKhoQuaThiChayVeKhocVoiAnh-ERIK-7128950.mp3',
];
music.addEventListener('ended', () => {
  music.pause();
  music.src = musicSrc[Math.floor(Math.random() * musicSrc.length)];
  music.load();
  music.play();
});

music.src = musicSrc[Math.floor(Math.random() * musicSrc.length)];
music.load();
music.play();

//Game player
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 1;

class Sprite {
  constructor({ position, velocity, color }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.lastKey;
    this.color = color;
    this.attackBox = {
      position: this.position,
      width: 100,
      height: 50,
    };
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    //Attack Box
    c.fillStyle = 'green';
    c.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height
    );
  }

  update() {
    this.draw();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.velocity.y + this.height >= canvas.height) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;
    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.x + this.velocity.x + this.width >= canvas.width) {
      this.position.x = canvas.width - 50;
    }
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: 'red',
});

const enemy = new Sprite({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: 'blue',
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  //Player movement
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5;
  }

  if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5;
  }

  //Enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5;
  }

  if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5;
  }

  //detect for collision
  if (
    player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
    player.attackBox.position.x <= enemy.position.x + enemy.width &&
    player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
    player.attackBox.position.y <= enemy.position.y + enemy.height &&
    player.isAttacking
  ) {
    console.log('collision');
  }
}

animate();

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = true;
      player.lastKey = 'd';
      break;
    case 'a':
      keys.a.pressed = true;
      player.lastKey = 'a';
      break;
    case 'w':
      if (player.position.y >= 420) {
        player.velocity.y = -25;
      }
      break;

    //Enemy Key
    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      enemy.lastKey = 'ArrowRight';
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = 'ArrowLeft';
      break;
    case 'ArrowUp':
      if (enemy.position.y >= 426) {
        enemy.velocity.y = -25;
      }
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    //Player Key
    case 'd':
      keys.d.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case 'w':
      keys.w.pressed = false;
      break;

    //Enemy Key
    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;
    case 'ArrowUp':
      keys.ArrowUp.pressed = false;
      break;
  }
});
