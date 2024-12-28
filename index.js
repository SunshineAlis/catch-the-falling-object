// Game container
const gameCont = document.createElement("div");
document.getElementById("container").appendChild(gameCont);
gameCont.classList.add("gameCont");
gameCont.id = "gameCont";

// Start button
const start = document.createElement("button");
document.getElementById("gameCont").appendChild(start);
start.classList.add("startButton");
start.innerHTML = "Start";
start.addEventListener("click", gameStart);

// Basket
const basket = document.createElement("div");
basket.innerHTML = `<img src="basket.png" alt="Basket">`;
gameCont.appendChild(basket);
basket.classList.add("basket");

// Side bar
const sideBar = document.createElement("div");
sideBar.id = "sideBar";
sideBar.classList.add("sideBar");
document.getElementById("container").appendChild(sideBar);

// Score and lives
let score = 0;
let lives = 3;

// Score container
const scoreContainer = document.createElement("div");
scoreContainer.innerHTML = "score: " + score;
scoreContainer.classList.add("scoreContainer");
scoreContainer.id = "scoreContainer";

// Lives container
const livesCont = document.createElement("div");
livesCont.classList.add("liveCont");
livesCont.id = "liveCont";

// Append lives and score containers to side bar
sideBar.appendChild(scoreContainer);
sideBar.appendChild(livesCont);

// Lives icons
const liveIcon1 = document.createElement("div");
const liveIcon2 = document.createElement("div");
const liveIcon3 = document.createElement("div");
liveIcon1.classList.add("liveIcon");
liveIcon2.classList.add("liveIcon");
liveIcon3.classList.add("liveIcon");
livesCont.appendChild(liveIcon1);
livesCont.appendChild(liveIcon2);
livesCont.appendChild(liveIcon3);

// Audio objects
const scoreAudio = new Audio("./scoresound.wav");
const gameOverSound = new Audio("./gameoversound.wav");
// const backgroundMusic = new Audio("./background.mp3");
// backgroundMusic.loop = true;

// Default falling speed
let timeInt = 2000;

// Fruits
const fruitContainer = document.createElement("div");
fruitContainer.classList.add("fruitCont");
gameCont.appendChild(fruitContainer);

let apple = [],
  strawberry = [],
  cherry = [],
  banana = [],
  arr = [];

function gameStart() {
  basket.style.top = "930px";
  start.style.display = "none";
//   backgroundMusic.play();

  let position = { left: basket.offsetLeft };

  const containerWidth = gameCont.offsetWidth;
  const basketWidth = basket.offsetWidth;

  // Move basket with mouse
  function moveBasketWithMouse(event) {
    const mouseX = event.clientX - gameCont.offsetLeft;
    position.left = Math.min(
      Math.max(0, mouseX - basketWidth / 2),
      containerWidth - basketWidth
    );
    basket.style.left = position.left + "px";
  }
  gameCont.addEventListener("mousemove", moveBasketWithMouse);

  // Generate fruits
  const fruits = document.getElementsByClassName("fruit");
  let apple_c = 0,
    cherry_c = 0,
    strawberry_c = 0,
    banana_c = 0;

  for (let i = 0; i <= 400; i++) {
    let ri = Math.floor(Math.random() * 4);
    switch (ri) {
      case 0:
        apple[apple_c] = document.createElement("div");
        fruitContainer.appendChild(apple[apple_c]);
        apple[apple_c].classList.add("fruit", "apple");
        apple_c++;
        break;
      case 1:
        strawberry[strawberry_c] = document.createElement("div");
        fruitContainer.appendChild(strawberry[strawberry_c]);
        strawberry[strawberry_c].classList.add("fruit", "strawberry");
        strawberry_c++;
        break;
      case 2:
        banana[banana_c] = document.createElement("div");
        fruitContainer.appendChild(banana[banana_c]);
        banana[banana_c].classList.add("fruit", "banana");
        banana_c++;
        break;
      case 3:
        cherry[cherry_c] = document.createElement("div");
        fruitContainer.appendChild(cherry[cherry_c]);
        cherry[cherry_c].classList.add("fruit", "cherry");
        cherry_c++;
        break;
    }
  }

  let i = 0,
    j = 0,
    firstInt = setInterval(firstFunction, timeInt);

  function firstFunction() {
    if (isGameOver) return;
    let ran = Math.floor(Math.random() * 940);
    fruits[i].style.left = ran + "px";
    fruits[i].style.top = "-100px";
    fruits[i].classList.add("animate");
    i++;
    arr.push(ran);
  }

  setTimeout(() => {
    setInterval(secondFunction, timeInt);
  }, 2000);

  function secondFunction() {
    if (isGameOver) return;
    score_check(arr[j]);
    j++;
  }

  function score_check(ran) {
    let leftEdge = position.left - 30;
    let rightEdge = leftEdge + 150;
    if (leftEdge <= ran && rightEdge >= ran) {
      score += 1;
      scoreContainer.innerHTML = "score: " + score;
    } else {
      lives = updateLives(lives);
      scoreAudio.currentTime = 0;
      scoreAudio.play();
    }
  }

  function updateLives(lives) {
    lives -= 1;
    if (lives === 2) livesCont.removeChild(liveIcon2);
    else if (lives === 1) livesCont.removeChild(liveIcon3);
    else if (lives === 0) {
      livesCont.removeChild(liveIcon1);
      gameOver();
    }
    return lives;
  }
}

let isGameOver = false;

function gameOver() {
  isGameOver = true;
  gameCont.removeChild(basket);
  gameOverSound.play();

  const gameOverMessage = document.createElement("div");
  gameOverMessage.className = "gameOverMessage";
  gameOverMessage.innerHTML = `
    <h1>Game Over</h1>
    <p>Your score: ${score}</p>
  `;
  gameCont.appendChild(gameOverMessage);

  gameOverMessage.onclick = function () {
    window.location.reload();
  };
}

// Difficulty selector
const difficultySelector = document.createElement("div");
difficultySelector.classList.add("difficultySelector");
sideBar.appendChild(difficultySelector);
difficultySelector.innerHTML = `
<h3>Select Difficulty:</h3>
<select id="difficultyLevel">
  <option value="easy">Easy</option>
  <option value="medium">Medium</option>
  <option value="hard">Hard</option>
  <option value="diehard">So Hard</option>
</select>
`;

function adjustDifficulty() {
  const difficulty = document.getElementById("difficultyLevel").value;
  switch (difficulty) {
    case "easy":
      timeInt = 2000;
      break;
    case "medium":
      timeInt = 1500;
      break;
    case "hard":
      timeInt = 1000;
      break;
    case "diehard":
      timeInt = 500;
      break;
  }
}

document
  .getElementById("difficultyLevel")
  .addEventListener("change", adjustDifficulty);