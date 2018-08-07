const defaultPlayer = 'images/char-boy.png';
const endModal = document.querySelector('.endModal');
const endModalBody = document.querySelector('.end-modal-body');
const tryAgainBtn = document.querySelector('.tryAgainBtn');
let points = 0;
let lives = 5;


// Enemies our player must avoid
let Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.multiplier = Math.floor((Math.random() * 5) + 1);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + 100 * dt * this.multiplier;
    if (this.x > 505) {
        this.reset();
    }
    if (this.y === player.y && (this.x > player.x - 53 && this.x < player.x + 53)) {
        player.reset();
        lossOfLife();
    }
};

Enemy.prototype.reset = function() {
    this.x = -100;
    let enemySpawnY = [207, 124, 41];
    this.y = enemySpawnY[Math.floor((Math.random() * 3))];
    this.multiplier = Math.floor((Math.random() * 5) + 1);
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let enemySpawn = [207, 124, 41];
for (let i = 0; i < 4; i++) {
    let enemySpawnX = -100;
    let enemySpawnY = enemySpawn[Math.floor(Math.random() * 3)];
    const enemy = new Enemy(enemySpawnX, enemySpawnY);
    allEnemies.push(enemy);
}

let Player = function(x, y) {
    this.sprite = defaultPlayer;
    this.x = x;
    this.y = y;
};

Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
    if (this.y === -42) {
        lossOfLife();
        this.reset();
    }
    if (this.y === blueGem.y && this.x === blueGem.x){
        blueGem.reset();
        points += 25;
    }
    if (this.y === greenGem.y && this.x === greenGem.x) {
        greenGem.reset();
        points += 50;
    }
    if (this.y === orangeGem.y && this.x === orangeGem.x) {
        orangeGem.reset();
        points += 100;
    }
    if(lives === 0) {
        endGame();
    }
};

//Implement score system

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 373;
};

Player.prototype.handleInput = function(direction) {
    if (direction === 'up' && this.y !== -42) {
        this.y = this.y - 83;
    }
    else if (direction === 'down' && this.y !== 373) {
        this.y = this.y + 83;
    }
    else if (direction === 'left' && this.x !== 0) {
        this.x = this.x -100;
    }
    else if (direction === 'right' && this.x !== 400) {
        this.x = this.x + 100;
    }
};
let player = new Player(200, 373);

let Lives = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/smallHeart.png';
};

Lives.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Lives.prototype.loss = function() {
    this.x = -100;
    this.y = -100;
};

Lives.prototype.reset = function(x, y) {
    lives = 5;
    this.x = x;
    this.y = y;
};

let heart1 = new Lives(5, 35);
let heart2 = new Lives(55, 35);
let heart3 = new Lives(105, 35);
let heart4 = new Lives(155, 35);
let heart5 = new Lives(205, 35);

function lossOfLife() {
    lives -= 1;
    points -= 100;
    if (lives === 4) {
        heart5.loss();
    }
    if (lives === 3) {
        heart4.loss();
    }
    if (lives === 2) {
        heart3.loss();
    }
    if (lives === 1) {
        heart2.loss();
    }
    if (lives === 0) {
        heart1.loss();
    }
}

let Score = function(x, y) {
    this.x = x;
    this.y = y;
};

Score.prototype.render = function() {
    ctx.font = '30px Coda';
    ctx.fillStyle = 'white';
    ctx.fillText(`Score: ${points}`, this.x, this.y);
};

Score.prototype.update = function() {
    ctx.font = '30px Coda';
    ctx.fillStyle = 'white';
    ctx.fillText(`Score: ${points}`, this.x, this.y);
};

Score.prototype.reset = function() {
    points = 0;
};

let score = new Score(325, 86);

let OrangeGem = function(x, y) {
    this.sprite = 'images/Gem-Orange.png';
    this.x = x;
    this.y = y;
};

OrangeGem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

OrangeGem.prototype.reset = function () {
    this.x = orangeSpawnX[Math.floor(Math.random() * 5)];
    this.y = orangeSpawnY;
};

let GreenGem = function(x, y) {
    this.sprite = 'images/Gem-Green.png';
    this.x = x;
    this.y = y;
};

GreenGem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

GreenGem.prototype.reset = function () {
    this.x = greenSpawnX[Math.floor(Math.random() * 5)];
    this.y = greenSpawnY;
};

let BlueGem = function(x, y) {
    this.sprite = 'images/Gem-Blue.png';
    this.x = x;
    this.y = y;
};

BlueGem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y,);
};

BlueGem.prototype.reset = function() {
    this.x = blueSpawnX[Math.floor(Math.random() * 5)];
    this.y = blueSpawnY;
};

const orangeSpawnX = [0, 100, 200, 300, 400];
const orangeSpawnY = 41;
const greenSpawnX = [0, 100, 200, 300, 400];
const greenSpawnY = 124;
const blueSpawnX = [0, 100, 200, 300, 400];
const blueSpawnY = 207;
let orangeGem = new OrangeGem(orangeSpawnX[Math.floor(Math.random() * 5)], orangeSpawnY);
let greenGem = new GreenGem(greenSpawnX[Math.floor(Math.random() * 5)], greenSpawnY);
let blueGem = new BlueGem(blueSpawnX[Math.floor(Math.random() * 5)], blueSpawnY);

function endGame() {
    endOfGame = true;
    lives = 5;
    endModal.style.display = "block";
    const temp = document.createDocumentFragment();
    const modalScore = document.createElement('p');
    modalScore.className = 'modalScore';
    modalScore.textContent = `You scored: ${points} points`;
    temp.appendChild(modalScore);
    endModalBody.appendChild(temp);
    tryAgainBtn.addEventListener('click', function() {
        endOfGame = false;
        endModal.style.display = "none";
        orangeGem.reset();
        greenGem.reset();
        blueGem.reset();
        heart1.reset(5, 35);
        heart2.reset(55, 35);
        heart3.reset(105, 35);
        heart4.reset(155, 35);
        heart5.reset(205, 35);
        score.reset();
        while (endModalBody.firstChild) {
            endModalBody.removeChild(endModalBody.firstChild);
        }
    });
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
let endOfGame = false;
document.addEventListener('keyup', function(e) {
    e.preventDefault();
    if (!endOfGame) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };
    }
    else {
        allowedKeys = {
            37: 'none',
            38: 'none',
            39: 'none',
            40: 'none'
        };
    }

    player.handleInput(allowedKeys[e.keyCode]);
});

//Swipe detection provided by escapenetscape https://stackoverflow.com/users/2689455/escapenetscape
function detectswipe(func) {
    swipe_det = new Object();
    swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
    var min_x = 30;  //min x swipe for horizontal swipe
    var max_x = 30;  //max x difference for vertical swipe
    var min_y = 50;  //min y swipe for vertical swipe
    var max_y = 60;  //max y difference for horizontal swipe
    var direc = "";
    ele = document;
    ele.addEventListener('touchstart', function (e) {
        var t = e.touches[0];
        swipe_det.sX = t.screenX;
        swipe_det.sY = t.screenY;
    }, false);
    ele.addEventListener('touchmove', function (e) {
        var t = e.touches[0];
        swipe_det.eX = t.screenX;
        swipe_det.eY = t.screenY;
    }, false);
    ele.addEventListener('touchend', function (e) {
        //horizontal detection
        if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y) && (swipe_det.eX > 0)))) {
            if (swipe_det.eX > swipe_det.sX) direc = "right";
            else direc = "left";
        }
        //vertical detection
        else if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x) && (swipe_det.eY > 0)))) {
            if (swipe_det.eY > swipe_det.sY) direc = "down";
            else direc = "up";
        }

        if (direc !== "") {
            if (typeof func === 'function') func(direc);
        }
        direc = "";
        swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
    }, false);
}

function directionalControl(d) {
    player.handleInput(d);
}

detectswipe(directionalControl);
/* Create swipe for mobile play
Add instructions to modal
Add "choose character" feature*/