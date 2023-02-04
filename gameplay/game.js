// Iteration 1: Declare variables required for this game
const arena = document.getElementById('game-body');
const livesCount = document.getElementById('lives');
const zombieImages = [
  'zombie-1.png',
  'zombie-2.png',
  'zombie-3.png',
  'zombie-4.png',
  'zombie-5.png',
  'zombie-6.png',
];
let zombieNo = 0;
let seconds = document.getElementById('timer').innerHTML;

// Iteration 1.2: Add shotgun sound
const shotGun = new Audio('../assets/shotgun.wav');
shotGun.volume = 0.25;
arena.onclick = () => {
    shotGun.pause();
    shotGun.currentTime = 0;
    shotGun.play();
};

// Iteration 1.3: Add background sound
const bgm = new Audio('../assets/bgm.mp3');
function playBgm() {
    bgm.play();
    bgm.loop = true;
}
document.getElementById("body").addEventListener("mouseover", playBgm); 

// Iteration 1.4: Add lives
const totalLives = 4;
var lives = 4;

// Iteration 2: Write a function to make a zombie
function makeZombie() {
  randomImage = zombieImages[getRandomInteger(0, zombieImages.length)];
  arena.innerHTML += `<img src = "../assets/${randomImage}" class = "zombie-image" id = "zombies${zombieNo}">`;
  let zombie = document.getElementById('zombies' + zombieNo);
  zombie.style.transform = `translateX(${getRandomInteger(20, 80)}vw)`;
  zombie.style.animationDuration = `${getRandomInteger(2, 5)}s`;
  zombie.onclick = () => {
    destroyZombie(zombie);
  };
}

// Iteration 3: Write a function to check if the player missed a zombie
function checkMiss(zombie) {
  if (zombie.getBoundingClientRect().top <= 0) {
    lives--;
    return true;
  }
  return false;
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destroyZombie(zombie) {
  zombie.style.display = 'none';
  zombieNo++;
  makeZombie();
}

// Iteration 5: Creating timer
var timer = setInterval(() => {
  seconds--;
  document.getElementById('timer').innerHTML = seconds;
  let zombie = document.getElementById('zombies' + zombieNo);
  if (checkMiss(zombie) == true) {
    destroyZombie(zombie);
    lives--;
    if (lives == 0) {
      clearInterval(timer);
      location.href = './game-over.html';
    }
  }
  if (seconds == 0) {
    clearInterval(timer);
    location.href = './win.html';
  }
}, 1000);

// Iteration 6: Write a code to start the game by calling the first zombie
makeZombie(zombieNo);

// Iteration 7: Write the helper function to get random integer
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
