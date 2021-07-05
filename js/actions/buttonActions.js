//--------------------------------клик по кнопке проверить ход------------------------------------

//1) Проверяем, есть ли возможность сжечь тайлы
function stateMoves() {

    let a = checkMoves();

    if (a) {
        gameTexts.push(textPossibleYes);
        updateTextPossible(a);
    } else {
        gameTexts.push(textPossibleNo);
        updateTextPossible(a);
    }
    checkFind = true;
    gameObjects.splice(gameObjects.length - 1, 1);

    function checkMoves() {
        let count = 0;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                for (let i2 = 0; i2 < 4; i2++) {
                    if (i + findWay[i2][0] < 10 && j + findWay[i2][1] < 10 && i + findWay[i2][0] >= 0 && j + findWay[i2][1] >= 0) {
                        if (arrayBlocks[i][j].color == arrayBlocks[i + findWay[i2][0]][j + findWay[i2][1]].color) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
}
//2) Выводим сообщение да/нет
function updateTextPossible(a) {
    let count = 0;
    logicUpdate.push(textPossible);
    let a2 = a;

    function textPossible() {
        count++;
        if (count > 100) {

            gameTexts.splice(gameTexts.length - 1, 1);
            logicUpdate.splice(logicUpdate.length - 1, 1);
            gameObjects.push(btnCheckMove);
            checkFind = false;
            if (bonusChangeBack.sum == 0 && a2 == false) {
                reset();
            }
        }
    }
}

// 3) Если нет возможности перемешать и сжечь тайлы, перезапустим уовень
function reset() {

    if (gameTexts.length - 1 == 8) {
        gameTexts.splice(gameTexts.length - 1, 1);
    }

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            arrayBlocks[i][j].color = getRandomInt(0, 5);
        }
    }

    sumScore = 0;
    score = 0;
    step = gameLevels[currentLevel].steps;
    textLevelTarget.setPosition(gameLevels[currentLevel].score);
    textLevelStep.setPosition(step);
    textLevelScore.setPosition(0);
    bonusBombBack.sum = 1;
    bonusChangeBack.sum = 2;
    menuState = false;

    startLevel();
}
//--------------------------------------------------------------------------------------------------

// перезапуск всей игры
function restartGame() {

    textLevelGame.setPosition(1);
    currentLevel = 0;
    reset();
}

function continueLevel() {
    currentLevel++;
    textLevelGame.setPosition(currentLevel + 1);
    reset();
}