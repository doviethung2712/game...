function collides(obj1, obj2) {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
}
let check = false;
let checkwin = "";

function loop() {
  requestAnimationFrame(loop); // giup vong lap chay on dinh hon
  context.clearRect(0, 0, canvas.width, canvas.height);
  object();
  for (let i = grid; i < canvas.height - grid; i += grid * 2) {
    context.fillRect(canvas.width / 2 - grid / 2, i, grid, grid);
  }
  if (check == false) {
    paddle.paddleLeft.y += paddle.paddleLeft.dy;
    paddle.paddleRight.y += paddle.paddleRight.dy;
    if (paddle.paddleLeft.y < grid) {
      paddle.paddleLeft.y = grid;
    } else if (paddle.paddleLeft.y > maxPaddleY) {
      paddle.paddleLeft.y = maxPaddleY;
    }

    if (paddle.paddleRight.y < grid) {
      paddle.paddleRight.y = grid;
    } else if (paddle.paddleRight.y > maxPaddleY) {
      paddle.paddleRight.y = maxPaddleY;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y < grid) {
      ball.y = grid;
      ball.dy *= -1;
    } else if (ball.y + grid > canvas.height - grid) {
      ball.y = canvas.height - grid * 2;
      ball.dy *= -1;
    }

    if (ball.x < 0 && !ball.resetting) {
      document.getElementById("right").innerHTML = ++left;
      ball.resetting = true;
      setTimeout(() => {
        ball.resetting = false;
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
      }, 400);
    } else if (ball.x > canvas.width && !ball.resetting) {
      document.getElementById("left").innerHTML = ++right;
      ball.resetting = true;
      setTimeout(() => {
        ball.resetting = false;
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
      }, 400);
    }
  } else {
    // context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "60px Verdana";
    color = context.createLinearGradient(0, 0, canvas.width, 0);
    color.addColorStop("0.2", "magenta");
    color.addColorStop("0.5", "blue");
    color.addColorStop("0.8", "red");
    context.fillStyle = color;
    context.fillText(checkwin, canvas.width / 2 - 160, ball.y);
  }
  if (left == 2) {
    check = true;
    checkwin = "Left win";
  } else if (right == 2) {
    check = true;
    checkwin = "Right win";
  }
  // di chuy???n m??i ch??o b???ng v???n t???c c???a ch??ng.

  // ki???m tra b??ng c?? va ch???m v???i m??i ch??o , n???u ng?????i ch??i thay ?????i  v???n t???c.
  if (collides(ball, paddle.paddleLeft)) {
    ball.dx *= -1;

    // di chuy???n qu??? b??ng b??n c???nh m??i ch??o n???u kh??ng s??? s???y ra va ch???m l???n n???a
    // trong khung ti???p theo.
    ball.x = paddle.paddleLeft.x + paddle.paddleLeft.width;
  } else if (collides(ball, paddle.paddleRight)) {
    ball.dx *= -1;

    // di chuy???n qu??? b??ng b??n c???nh m??i ch??o n???u kh??ng s??? s???y ra va ch???m l???n n???a

    // trong khung ti???p theo.
    ball.x = paddle.paddleRight.x - ball.width;
  }
}
