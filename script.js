
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Pantalla completa
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let groundY = canvas.height * 0.85;

let dino = {
  x: 50,
  y: groundY - 100,
  width: 80,
  height: 80,
  vy: 0,
  jumping: false,
  color: "#6c5ce7"
};

let gravity = 2;
let obstacles = [];
let frame = 0;
let score = 0;
let gameOver = false;
let startDelay = 120;

function drawBackground() {
  ctx.fillStyle = "#ff4db8"; // Rosa brillante saturado
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawGround() {
  ctx.fillStyle = "#ffb6e6";
  ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);
}

function drawDino() {
  ctx.fillStyle = dino.color;
  ctx.beginPath();
  ctx.arc(dino.x + dino.width / 2, dino.y + dino.height / 2, dino.width / 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawObstacle(ob) {
  ctx.fillStyle = ob.color;
  ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
}

function update() {
  frame++;
  drawBackground();
  drawGround();

  if (dino.jumping) {
    dino.vy += gravity;
    dino.y += dino.vy;
    if (dino.y >= groundY - dino.height) {
      dino.y = groundY - dino.height;
      dino.jumping = false;
      dino.vy = 0;
    }
  }

  drawDino();

  if (frame > startDelay && frame % 70 === 0) {
    let height = 40 + Math.random() * 100;
    obstacles.push({
      x: canvas.width,
      y: groundY - height,
      width: 40,
      height: height,
      color: "#d63031"
    });
  }

  for (let i = 0; i < obstacles.length; i++) {
    let ob = obstacles[i];
    ob.x -= 6;
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
  ctx.font = "bold 22px Arial";
  ctx.fillText("Score: " + score, 20, 40);

  if (!gameOver) {
    requestAnimationFrame(update);
  } else {
    ctx.font = "bold 28px Arial";
    ctx.fillText("Game Over!", canvas.width / 2 - 80, canvas.height / 2);
    setTimeout(() => {
      location.reload();
    }, 1500);
  }
}

function jump() {
  if (!dino.jumping && !gameOver) {
    dino.vy = -28;
    dino.jumping = true;
  }
}

document.addEventListener("keydown", jump);
document.addEventListener("touchstart", jump);
document.addEventListener("click", jump);

update();
