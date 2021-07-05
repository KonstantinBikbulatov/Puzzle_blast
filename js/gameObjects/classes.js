class BaseObject {
    constructor(x, y, width, height) {
        this.width = setScale(width);
        this.height = setScale(height);
        this.x = centerCanvas + setScale(x);
        this.y = setScale(y);
    }
}

class BaseSprite extends BaseObject {

    constructor(link, x, y, width, height) {
        super(x, y, width, height);
        this.sprite = new Image();
        this.sprite.src = link;
    }

    draw() {
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }
}

class Sprite extends BaseSprite {

    constructor(link, x, y, width, height) {
        super(link, x, y, width, height)
    }

    checkClick() {
        if (this.x < cX && this.x + this.width > cX &&
            this.y < cY && this.y + this.height > cY) {
            return true;
        }
    }
}

class Bonus extends Sprite {

    size = setScale(25)

    constructor(link, x, y, width, height, sum, sumX, sumY) {
        super(link, x, y, width, height);
        this.sum = sum;
        this.sumX = centerCanvas + setScale(sumX);
        this.sumY = setScale(sumY);
    }

    checkSum() {
        console.log("SUM");
        if (this.sum != 0) {
            console.log("CONSOLE");
            this.sum--;
            return true;
        }
        return false;
    }

    drawString() {
        ctx.font = `${this.size}px Marvin`;
        ctx.fillText(this.sum, this.sumX, this.sumY);
    }

}

class Block {

    width = setScale(53);
    height = setScale(55);

    constructor(x, y) {
        this.x = centerCanvas + setScale(x);
        this.y = setScale(y);
        this.color = getRandomInt(0, 5);
    }

    draw() {
        ctx.drawImage(blocks[this.color], this.x, this.y, this.width, this.height);
    }

    checkClick() {
        if (this.x < cX && this.x + this.width > cX &&
            this.y < cY && this.y + this.height > cY) {
            return true;
        }
    }
}

class SpriteProgress extends BaseSprite {
    constructor(link, x, y, width, height) {
        super(link, x, y, width, height)
    }

    draw() {
        ctx.drawImage(this.sprite, 0, 0, (this.sprite.width / gameLevels[currentLevel].score) * sumScore,
            this.sprite.height, this.x, this.y, (this.width / gameLevels[currentLevel].score) * sumScore, this.height);
    }
}

class GameText {

    constructor(gameText, x, y, size, width) {
        this.x2 = centerCanvas + setScale(x) + (setScale(width) / 2);
        this.baseX = this.x2;
        this.y2 = setScale(y);
        this.size = setScale(size);
        this.gameText = gameText;
        this.setPosition(gameText);
    }

    setPosition(gameText) {
        ctx.font = `${this.size}px Marvin`;
        this.gameText = gameText;
        let widthString = ctx.measureText(gameText);
        this.x2 = this.baseX - (widthString.width / 2);
    }

    drawString() {
        ctx.font = `${this.size}px Marvin`;
        ctx.fillText(this.gameText, this.x2, this.y2);
    }
}

class Button extends GameText {

    constructor(x, y, width, relativeWidth, height, text, actionBtn) {
        super(text, x, y + (height / 2), 25, relativeWidth);
        this.x = centerCanvas + setScale(x) + (setScale(relativeWidth) / 2) - (setScale(width) / 2);
        this.text = text;
        this.y = setScale(y);
        this.width = setScale(width);
        this.height = setScale(height);
        this.actionBtn = actionBtn;
    }

    draw() {

        ctx.drawImage(texButton, this.x, this.y, this.width, this.height);
        this.drawString();

    }

    clickCheck() {
        if (this.x < cX && this.x + this.width > cX &&
            this.y < cY && this.y + this.height > cY) {

            menuState = false;
            this.actionBtn();
            stateGame = play;
        }
    }
}