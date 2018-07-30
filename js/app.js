let defaultPlayer = 'images/char-boy.png';

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
        this.reset();
    }
    if (this.y === blueGem.y && this.x === blueGem.x){
        blueGem.reset();
    }
    if (this.y === greenGem.y && this.x === greenGem.x) {
        greenGem.reset();
    }
    if (this.y === orangeGem.y && this.x === orangeGem.x) {
        orangeGem.reset();
    }
};

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
    console.log(`Player: x = ${this.x} y = ${this.y}`);
};
let player = new Player(200, 373);

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
    console.log(`BlueGem x: ${this.x} y: ${this.y}`);
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
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    e.preventDefault();
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
