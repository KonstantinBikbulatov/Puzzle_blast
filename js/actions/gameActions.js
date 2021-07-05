let shards = [];
shard = { x: 0, y: 0, recX: 0, rexY: 0, velX: 0, velY: 0 };
let sizeShard = { sWidth: setScale(blocks[0].width), sHeight: setScale(blocks[0].height), width: setScale(53), height: setScale(55) };

let time = 0;
sx2 = 0;
sw2 = 0;
a2 = 0;
a = 0;

let click = false;

let blockWidth = setScale(53);
let blockHeight = setScale(55);

let stateGame = play;

let menuState = false;

let timeAnim = 0;
let frameX = 0,
    frameY = 0,
    countFrame = 0;

sumScore = 0;

let findWay = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
];

let blocksToFill = [];

for (let i = 0; i < arrayBlocks.length; i++) {
    blocksToFill[i] = 0;
}

let cX = 0,
    cY = 0;

let check = true;

let fillCheck = false;

let checkFind = false;

let bombActive = false;

let motionBlocks = [];

let arrayBlast = [];

let drawBombId = 0;
let updateBombId = 1;
let fillFieldId = 2;
let updateBlastId = 3;
let drawBlastId = 4;
let lineProgressId = 5;

document.addEventListener("mousedown", checkClick, false);

// Состояния для проверки клика-------

function play() {
    if (menuState == false) {
        if (checkFind == false) {
            if (checkBlock()) return;
            checkBonus();
            btnCheckMove.clickCheck();

        } else if (bombActive == true) {
            checkBlock();
        }
    }
}

function menu() {

    uiArray.forEach(element => {
        element.clickCheck();
    });
}

//----------------------------------Взаимодействие с тайлами----------------------------------

// 1) Получаем координаты клика--------------------------------------
function checkClick(e) {

    if (e.pageX || e.pageY) {
        cX = e.pageX;
        cY = e.pageY;
    } else {
        cX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        cY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    cX -= canvas.offsetLeft;
    cY -= canvas.offsetTop;

    stateGame();
}

// 2) Проверяем, что нажал пользователь------------------------------
function checkBonus() {
    if (bonusBombBack.checkClick() && bonusBombBack.checkSum()) {
        bombActive = true;
        checkFind = true;
    }

    if (bonusChangeBack.checkClick() && bonusChangeBack.checkSum()) {
        mixingArray();
    }
}

function checkBlock(i, j) {
    for (let i = 0; i < arrayBlocks.length; i++) {
        for (let j = 0; j < arrayBlocks[i].length; j++) {
            if (arrayBlocks[i][j].checkClick()) {

                if (bombActive == true) {
                    lineProgressId = logicUpdate.length;
                    logicUpdate[lineProgressId] = LineProgress;
                    bombBlast(i, j);
                    return true;
                }

                findBlock(i, j);

                if (fillCheck) {
                    findFillField();
                    step--;
                    textLevelScore.setPosition(score);
                    textLevelStep.setPosition(step);
                    lineProgressId = logicUpdate.length;
                    logicUpdate[lineProgressId] = LineProgress;
                    return true;
                }
            }
        }
    }
    return false;
}

// 3) Поиск клеток для сжигания--------------------------------------
function findBlock(i, j) {
    let shard = 0;

    for (let i2 = 0; i2 < 4; i2++) {
        if (i + findWay[i2][0] < 10 && j + findWay[i2][1] < 10 && i + findWay[i2][0] >= 0 && j + findWay[i2][1] >= 0) {
            if (arrayBlocks[i][j].color == arrayBlocks[i + findWay[i2][0]][j + findWay[i2][1]].color &&
                arrayBlocks[i + findWay[i2][0]][j + findWay[i2][1]].width != null) {
                arrayBlocks[i + findWay[i2][0]][j + findWay[i2][1]].width = null;

                //Считаем колличнство сожженых клеток в столбце
                blocksToFill[j + findWay[i2][1]] += 1;
                score++;
                fillCheck = true;

                shard++;

                sliceShards(arrayBlocks[i + findWay[i2][0]][j + findWay[i2][1]].x,
                    arrayBlocks[i + findWay[i2][0]][j + findWay[i2][1]].y,
                    arrayBlocks[i + findWay[i2][0]][j + findWay[i2][1]].color);

                findBlock(i + findWay[i2][0], j + findWay[i2][1]);
            }
        }
    }


}
// 3.1) Нарезание тайлов для анимации сжигания
function sliceShards(_x, _y, _color) {
    let sx = 0,
        sy = 0,
        sW = 0,
        sH = 0;

    let center = { x: _x + sizeShard.width / 2, y: _y + sizeShard.height / 2 }


    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            a = Normalize((_x + sx) - center.x, (_y + sy) - center.y);
            let rndVel = getRandomInt(2, 5);
            a.x *= rndVel;
            a.y *= rndVel;
            shards[shards.length] = ({
                x: _x + sx,
                y: _y + sy,
                recX: sizeShard.sWidth / 5,
                recY: sizeShard.sHeight / 5,
                sliceX: sW,
                sliceY: sH,
                velX: a.x / 100,
                velY: a.y / 100,
                color: _color
            });

            sx += sizeShard.width / 5;
            sW += sizeShard.sWidth / 5;
        }
        sx = 0;
        sW = 0;
        sy += sizeShard.height / 5;
        sH += sizeShard.sHeight / 5;
    }

    //Нормализация вектора
    function Normalize(_x, _y) {
        a = { x: _x, y: _y };
        let m = Math.sqrt(a.x * a.x + a.y * a.y)
        a.x /= m
        a.y /= m
        return a;
    }
}

// 3) Поиск клеток для сжигания после бомбы
function bombBlast(i, j) {

    if (i - 2 < 0) i = 2;
    else if (i + 2 > arrayBlocks.length - 1) i = arrayBlocks.length - 1 - 2;

    if (j - 2 < 0) j = 2;
    else if (j + 2 > arrayBlocks.length - 1) j = arrayBlocks.length - 1 - 2;

    for (let k = 0; k < 5; k++) {
        for (let t = 0; t < 5; t++) {
            blocksToFill[(j + t) - 2] += 1;
            arrayBlocks[(i + k) - 2][(j + t) - 2].width = null;
            arrayBlast.push({ x: arrayBlocks[(i + k) - 2][(j + t) - 2].x, y: arrayBlocks[(i + k) - 2][(j + t) - 2].y })
        }
    }

    score += gameLevels[currentLevel].bombScore;

    textLevelScore.setPosition(score);
    updateBombId = logicUpdate.length;
    logicUpdate[logicUpdate.length] = updateBomb;
    drawBombId = drawUpdate.length;
    drawUpdate[drawUpdate.length] = drawBomb;
    bombActive = false;
}

// 3) Перемешивание тайлов
function mixingArray() {

    let stI = 0;
    let stJ = 0;

    for (let i = 0; i < arrayBlocks.length; i++) {
        for (let j = 0; j < arrayBlocks[i].length; j++) {
            let stI = getRandomInt(0, 10);
            let stJ = getRandomInt(0, 10);
            st = arrayBlocks[i][j].color;
            arrayBlocks[i][j].color = arrayBlocks[stI][stJ].color;
            arrayBlocks[stI][stJ].color = st;
        }
    }
}

// 4) Расчет пути тайлов для заполнения поля, смена координат сожженых тайлов и генерация цвета
function findFillField() {

    let check = false;
    for (let i = 0; i < arrayBlocks.length; i++) {

        sum = 0;

        for (let j = arrayBlocks[i].length - 1; j > -1; j--) {

            if (arrayBlocks[j][i].width == null) {

                arrayBlocks[j][i].color = getRandomInt(0, 5);

                motionBlocks.push({ i: i, j: j, changeJ: sum, stepY: ((blocksToFill[i]) * blockHeight), color: arrayBlocks[j][i].color });

                arrayBlocks[j][i].width = 0;

                //расстояние по Y
                arrayBlocks[j][i].y = setScale(195) - (blocksToFill[i] - sum) * blockHeight;
                sum++;
                check = true;
            }
            if (arrayBlocks[j][i].width != null && check == true) {
                let count = 0;
                j--;
                for (; j > -1; j--) {
                    count++;
                    if (arrayBlocks[j][i].width != null && check == true) {
                        motionBlocks.push({
                            i: i,
                            j: j,
                            changeJ: j + sum,
                            stepY: sum * blockHeight,
                            color: arrayBlocks[j][i].color
                        });

                    } else {
                        j++;
                        check = false;
                        break;
                    }
                }
            }
        }
        blocksToFill[i] = 0;
        check = false;
    }

    motionBlocksSource = motionBlocks.slice();
    checkFind = true;
    logicUpdate[updateBlastId] = updateBlast;
    updateBlastId = logicUpdate.length - 1;
    drawUpdate.push(drawBlast);
    drawBlastId = drawUpdate.length - 1;
}

// 5) Логика и прорисовка взрыва тайлов-------------------------------

function updateBlast() {

    time++;

    if (time > 50 && check) {
        for (let i = 0; i < shards.length; i++) {
            shards[i].velX *= 40;
            shards[i].velY *= 40;
        }

        check = false;
        sx2 = 40;
        sw2 = 2;
    }

    if (time < 70) {
        for (let i = 0; i < shards.length; i++) {
            shards[i].x += shards[i].velX;
            shards[i].y += shards[i].velY;
        }
        sizeShard.width -= sw2;
        sizeShard.height -= sw2;

    } else {
        time = 0;
        sizeShard.width = setScale(53);
        sizeShard.height = setScale(55);
        sx2 = 0;
        sw2 = 0;
        logicUpdate.splice(updateBlastId, 1);
        drawUpdate.splice(drawBlastId, 1);
        logicUpdate.push(fillField);

        shards = [];
        check = true;
    }

    ctx.globalAlpha = 1;
}

function drawBlast() {
    for (let i = 0; i < shards.length; i++) {
        ctx.drawImage(blocks[shards[i].color], shards[i].sliceX, shards[i].sliceY, shards[i].recX,
            shards[i].recY, shards[i].x, shards[i].y, sizeShard.width / 5, sizeShard.height / 5);

        ctx.drawImage(blocks[shards[i].color], shards[i].x, shards[i].y, sizeShard.width / 5, sizeShard.height / 5, );
    }
}

// 5) Логика и прорисовка взрыва бомбы

function drawBomb() {
    for (let i = 0; i < arrayBlast.length; i++) {
        ctx.drawImage(animBomb, 128 * frameX, 128 * frameY, 128, 128, arrayBlast[i].x, arrayBlast[i].y, setScale(53), setScale(55));
    }
}

function updateBomb() {

    timeAnim++;

    if (timeAnim > 5) {
        timeAnim = 0;

        if (frameX + 1 == 4) {
            frameX = 0;
            frameY++;

        } else frameX++;

        countFrame++;

        if (countFrame > 12) {
            frameX = 0;
            frameY = 0;
            fillCheck == true
            checkFind == false;
            countFrame = 0;

            logicUpdate.splice(updateBombId, 1);
            drawUpdate.splice(drawBombId, 1);
            arrayBlast = [];
            logicUpdate[fillFieldId] = fillField;
            fillFieldId = logicUpdate.length - 1;
            bombActive = false;
            findFillField();
        }
    }

}

// 6) Заполнение поля тайлами-------------------------------------------
function fillField() {

    for (let i = 0; i < motionBlocks.length; i++) {

        arrayBlocks[motionBlocks[i].j][motionBlocks[i].i].y += 4;
        motionBlocks[i].stepY -= 4;

        if (arrayBlocks[motionBlocks[i].j][motionBlocks[i].i].y > setScale(150)) {
            arrayBlocks[motionBlocks[i].j][motionBlocks[i].i].width = blockWidth;
        }

        if (motionBlocks[i].stepY == 0) {

            let st = arrayBlocks[motionBlocks[i].changeJ][motionBlocks[i].i].changeJ;
            motionBlocks.splice(i, 1);

        } else if (motionBlocks[i].stepY < 0) {

            arrayBlocks[motionBlocks[i].j][motionBlocks[i].i].y--;

            let st = arrayBlocks[motionBlocks[i].changeJ][motionBlocks[i].i].changeJ;

            motionBlocks.splice(i, 1);
        }
    }

    if (motionBlocks.length == 0) {

        for (let i = 0; i < motionBlocksSource.length; i++) {
            arrayBlocks[motionBlocksSource[i].changeJ][motionBlocksSource[i].i].color = motionBlocksSource[i].color;
            arrayBlocks[motionBlocksSource[i].changeJ][motionBlocksSource[i].i].y = arrayBlocksSource[motionBlocksSource[i].changeJ][motionBlocksSource[i].i].y;
        }

        logicUpdate = [];
        checkFind = false;
        fillCheck = false;
        shards = [];
        checkLevel();
    }

}

// 7) Проверка состояния уровня
function checkLevel() {

    if (score >= gameLevels[currentLevel].score) {
        if (currentLevel != gameLevels.length - 1) {
            ui();
            uiArray = uiContinue;
        } else {
            ui();
            uiArray = uiRestart;
            gameTexts.push(textVictory);
        }

    } else if (step < 1 && score < gameLevels[currentLevel].score) {
        ui();
        uiArray = uiRestart;
        if (currentLevel == 0) {
            uiArray = uiArray.slice(1, 2);
        }
    }

    function ui() {
        drawUpdate.splice(1, 1);
        logicUpdate.splice(fillFieldId, 1);
        drawUpdate.push(drawUi);
        menuState = true;
        click = false;
        stateGame = menu;
    }
}

//------------------------------------------------------------------------------------------------

// Заполнение линии прогресса
function LineProgress() {

    if (sumScore < score) {
        sumScore += 0.1;
    }
}