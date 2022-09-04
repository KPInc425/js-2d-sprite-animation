let playerState = 'sit';
const dropDown = document.getElementById('animations');
dropDown.addEventListener('change', (e) => {
    console.log(e.target.value);
    playerState = e.target.value;
    if (playerState === 'demon') {
        staggerFrames = 50;
    } else {
        staggerFrames = 5;
    }
})

const inputStaggerFrames = document.getElementById('staggerFrames');
inputStaggerFrames.addEventListener('change', (e) => {
    staggerFrames = e.target.value;
})

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
console.log(ctx);

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();

playerImage.src = 'shadow_dogNDemon.png';
const spriteWidth = 575;
const spriteHeight = 523;
let gameFrame = 0;
let staggerFrames = 5;

const spriteAnimations = [];

const animationStates = [
    {
        name: "idle",
        frames: 7,
    },
    {
        name: "jump",
        frames: 7,
    },
    {
        name: "fall",
        frames: 7,
    },
    {
        name: "run",
        frames: 9,
    },
    {
        name: "dizzy",
        frames: 11,
    },
    {
        name: "sit",
        frames: 5,
    },
    {
        name: "roll",
        frames: 7,
    },
    {
        name: "bite",
        frames: 7,
    },
    {
        name: "ko",
        frames: 12,
    },
    {
        name: "gethit",
        frames: 4,
    },
    {
        name: "demon",
        frames: 2,
    }
]

animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight; 
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
})

console.log(spriteAnimations);

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    gameFrame++;
    requestAnimationFrame(animate);

}

animate();
