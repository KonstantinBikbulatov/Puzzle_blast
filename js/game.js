let drawUpdate = [];
let logicUpdate = [];

ctx.fillStyle = "white";

let step = 0;

menuState = false;

//Запускаем уровень записывая блоки отрисовки 
function startLevel() {
    
    drawUpdate = [];
    
    drawUpdate[0] = drawSprite;
    drawUpdate[1] = drawBlock;
    drawUpdate[2] = drawString;

    sumScore = 0;
    step = gameLevels[currentLevel].steps;
}

startLevel();

// Апдейтим игру, запуская функции записанные в массивы логики и отрисовки
function gameUpdate() {

    logicUpdate.forEach(element => {
        element();
    });

    drawUpdate.forEach(element => {
        element();
    });

}

// Отрисовка тайлов
function drawBlock() {
    for (let i = 0; i < arrayBlocks.length; i++) {
        for (let j = 0; j < arrayBlocks[i].length; j++) {
            arrayBlocks[i][j].draw();
        }
    }
}

// Отрисовка текста
function drawString() {

    bonusBombBack.drawString();
    bonusChangeBack.drawString();

    gameTexts.forEach(element => {
        element.drawString();
    });

    textTarget.drawString();
    textScore.drawString();
}

// Отрисовка спрайтов
function drawSprite() {

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    gameObjects.forEach(element => {
        element.draw();
    });
}

// Отрисовка меню
function drawUi() {
    uiArray.forEach(element => {
        element.draw();
    });
}

let interval = setInterval(gameUpdate, 10);
