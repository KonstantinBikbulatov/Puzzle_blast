let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

canvas.width = screen.width;
canvas.height = screen.height;

let centerCanvas = ctx.canvas.width / 2;

let score = 0;

//Настройки уовней
let gameLevels = [
    { score: 25, steps: 10, bombScore: 5 },
    { score: 30, steps: 9, bombScore: 10 },
    { score: 35, steps: 8, bombScore: 15 }
];



let currentLevel = 0;

// Преобразование координат и размеров элементов для получения нужного масштаба игры
function setScale(a) {
    return (a / 100) * 80;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}