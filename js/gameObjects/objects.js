background = new BaseSprite(linkBackground, -600, 0, 1200, 900);
panelProgress = new BaseSprite(linkPanelProgress, -490, 20, 980, 150);
barProgress = new BaseSprite(linkBarProgress, -200, 20, 400, 120);
lineProgress2 = new BaseSprite(linkLineProgress2, -170, 68, 340, 36);
field = new BaseSprite(linkfield, -485, 180, 570, 582);
panelScore = new BaseSprite(linkPanelScore, +100, 180, 400, 480);
circle = new BaseSprite(linkCircle, +190, 190, 220, 220);
rectangleScore = new BaseSprite(linkRectangleScore, +175, 430, 250, 80);
rectangleScore2 = new BaseSprite(linkRectangleScore, +175, 540, 250, 80);
bonusBomb = new BaseSprite(linkBomb, +200, 675, 70, 40);
bonusChange = new BaseSprite(linkChange, +335, 667, 60, 50);
level = new BaseSprite(linkLevel, +280, 68, 110, 50);

progeress = new SpriteProgress(linkLineProgress, -170, 70, 340, 30);

bonusBombBack = new Bonus(linkBonus, +170, 650, 130, 130, 1, +220, 750);
bonusChangeBack = new Bonus(linkBonus, +300, 650, 130, 130, 2, +350, 750);

textProgress = new GameText("ПРОГРЕСС", -600, 55, 30, 1200);
textLevel = new GameText("УРОВЕНЬ", +200, 55, 25, 260);
textScore = new GameText("СЧЕТ", +175, 425, 20, 250);
textTarget = new GameText("ЦЕЛЬ", +175, 535, 20, 250);
textVictory = new GameText("ПОБЕДА", -485, 300, 80, 570);

textPossibleYes = new GameText("ЕСТЬ ВОЗМОЖНОСТЬ СЖЕЧЬ ТАЙЛЫ", -600, 830, 50, 1200);
textPossibleNo = new GameText("НЕТ ВОЗМОЖНОСТИ СЖЕЧЬ ТАЙЛЫ", -600, 830, 50, 1200);

textLevelGame = new GameText(1, +280, 100, 30, 110);
textLevelScore = new GameText(score, +175, 480, 30, 250, 80);
textLevelTarget = new GameText(gameLevels[currentLevel].score, +175, 590, 30, 250, 80);

textLevelStep = new GameText(gameLevels[currentLevel].steps, +190, 320, 60, 220);

btnContinueGame = new Button(-485, 350, 300, 570, 100, "ПРОДОЛЖИТЬ", continueLevel);
btnRestartLevel = new Button(-485, 500, 300, 570, 100, "ПЕРЕИГРАТЬ", reset);
btnRestartGame = new Button(-485, 350, 300, 570, 100, "НАЧАТЬ СНАЧАЛА", restartGame);

btnCheckMove = new Button(-600, 780, 270, 1200, 70, "ПРОВЕРИТЬ ХОД", stateMoves);

let arrayBlocks = [];
let arrayBlocksSource = [];

let blockY = 0,
    blockX = 0;

//Создание тайлов
for (let i = 0; i < 10; i++) {

    arrayBlocks[i] = [];
    arrayBlocksSource[i] = [];

    for (let j = 0; j < 10; j++) {
        arrayBlocks[i][j] = new Block(-470 + blockX, 195 + blockY);
        arrayBlocksSource[i][j] = new Block(-470 + blockX, 195 + blockY);
        blockX += 54;
    }

    blockY += 55;
    blockX = 0;
}

let gameTexts = [textProgress, textLevelScore, textLevelTarget, textLevelStep, bonusBombBack, bonusChangeBack, textLevel, textLevelGame];

let gameObjects = [background, panelProgress, barProgress, lineProgress2, field, panelScore, level,
    rectangleScore, rectangleScore2, bonusBombBack, bonusChangeBack, bonusBomb, bonusChange, circle, progeress, btnCheckMove
];

let uiContinue = [btnContinueGame, btnRestartLevel];
let uiRestart = [btnRestartGame, btnRestartLevel];
let uiArray = [];
