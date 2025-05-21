
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dino = {
  x: 50,
  y: canvas.height - 90,
  width: 50,
  height: 50,
  vy: 0,
  jumping: false,
  color: "#8e44ad"
};

let gravity = 2;
let obstacles = [];
let frame = 0;
let score = 0;
let gameOver = false;
let startDelay = 120;

function drawBackground() {
  ctx.fillStyle = "#ff69b4"; // Rosa brillante
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawDino() {
  ctx.fillStyle = dino.color;
  ctx.beginPath();
  ctx.arc(dino.x + dino.width / 2, dino.y + dino.height / 2, dino.width / 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawObstacle(ob) {
  ctx.fillStyle = "#e74c3c";
  ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
}

function update() {
  frame++;
  drawBackground();

  if (dino.jumping) {
    dino.vy += gravity;
    dino.y += dino.vy;
    if (dino.y >= canvas.height - 90) {
      dino.y = canvas.height - 90;
      dino.jumping = false;
      dino.vy = 0;
    }
  }

  drawDino();

  if (frame > startDelay && frame % 60 === 0) {
    let height = 60 + Math.random() * 40;
    obstacles.push({
      x: canvas.width,
      y: canvas.height - height,
      width: 30,
      height: height
    });
  }

  for (let i = 0; i < obstacles.length; i++) {
    let ob = obstacles[i];
    ob.x -= 5;
    drawObstacle(ob);

    if (
      dino.x < ob.x + ob.width &&
      dino.x + dino.width > ob.x &&
      dino.y < ob.y + ob.height &&
      dino.y + dino.height > ob.y
    ) {
      gameOver = true;
    }

    if (ob.x + ob.width < 0) {
      obstacles.splice(i, 1);
      score++;
    }
  }

  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  if (!gameOver) {
    requestAnimationFrame(update);
  } else {
    setTimeout(() => {
      location.reload();
    }, 1500);
    ctx.fillText("Game Over!", canvas.width / 2 - 60, canvas.height / 2);
  }
}

function jump() {
  if (!dino.jumping && !gameOver) {
    dino.vy = -25;
    dino.jumping = true;
  }
}

document.addEventListener("keydown", jump);
document.addEventListener("touchstart", jump);
document.addEventListener("click", jump);

update();
