const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let dino = { x: 50, y: 150, width: 40, height: 40, vy: 0, jumping: false };
let gravity = 2;
let obstacles = [];
let frame = 0;
let score = 0;

function drawDino() {
  ctx.fillStyle = "#8e44ad";
  ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawObstacle(ob) {
  ctx.fillStyle = "#e74c3c";
  ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
}

function update() {
  frame++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (dino.jumping) {
    dino.vy += gravity;
    dino.y += dino.vy;
    if (dino.y >= 150) {
      dino.y = 150;
      dino.jumping = false;
      dino.vy = 0;
    }
  }

  drawDino();

  if (frame % 60 === 0) {
    obstacles.push({ x: canvas.width, y: 160, width: 20, height: 40 });
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
      alert("Game Over! Score: " + score);
      document.location.reload();
    }

    if (ob.x + ob.width < 0) {
      obstacles.splice(i, 1);
      score++;
    }
  }

  requestAnimationFrame(update);
}

function jump() {
  if (!dino.jumping) {
    dino.vy = -20;
    dino.jumping = true;
  }
}

// Detecta salto con teclado
document.addEventListener("keydown", jump);

// Detecta salto con toque en móvil
document.addEventListener("touchstart", jump);

update();
