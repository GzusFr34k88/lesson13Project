const startModal = document.querySelector('.startModal');
const endModal = document.querySelector('.endModal');
const endModalBody = document.querySelector('.end-modal-body');
const tryAgainBtn = document.querySelector('.tryAgainBtn');
const startBtn = document.querySelector('.startBtn');
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
    //player and enemy collision detection
    if (this.y === player.y && (this.x > player.x - 53 && this.x < player.x + 53)) {
        player.reset();
        lossOfLife();
    }
};

//Reset enemy object position
Enemy.prototype.reset = function() {
    this.x = -100;
    //Presets the three rows to spawn enemy
    let enemySpawnY = [207, 124, 41];
    //Set's the row for the enemy to spawn
    this.y = enemySpawnY[Math.floor((Math.random() * 3))];
    //Changes the speed for the enemy spawn
    this.multiplier = Math.floor((Math.random() * 5) + 1);
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Assigns enemies to an array
let allEnemies = [];
let enemySpawn = [207, 124, 41];
//For loop to create multiple enemies
for (let i = 0; i < 4; i++) {
    //Spawns enemy off screen so the move into view
    let enemySpawnX = -100;
    //picks a row for the initial enemy to spawn
    let enemySpawnY = enemySpawn[Math.floor(Math.random() * 3)];
    //Create new enemy object
    const enemy = new Enemy(enemySpawnX, enemySpawnY);
    //Puts the created enemies in an array
    allEnemies.push(enemy);
}

//Start of player object
let Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

//Updates the players location
Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
    //Detects if player moved to the water
    if (this.y === -42) {
        lossOfLife();
        //Resets player position after losing a life
        this.reset();
    }
    //Detects if player is on a blue gem
    if (this.y === blueGem.y && this.x === blueGem.x){
        //Changes the blue gems location
        blueGem.reset();
        //Sets blue gems point value
        points += 25;
    }
    //Detects if player is on a green gem
    if (this.y === greenGem.y && this.x === greenGem.x) {
        //Changes the green gems location
        greenGem.reset();
        //Sets green gems point value
        points += 50;
    }
    //Detects if player is on orange/yellow gem
    if (this.y === orangeGem.y && this.x === orangeGem.x) {
        //Changes the gems location
        orangeGem.reset();
        //Set orange/yellow gem point value
        points += 100;
    }
    //Ends game when player has 0 lives
    if(lives === 0) {
        endGame();
    }
};

//Draws player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Puts player back at start position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 373;
};

//Moves player based on keyboard input
Player.prototype.handleInput = function(direction) {
    //Moves player up
    if (direction === 'up') {
        this.y = this.y - 83;
    }
    //Moves player down
    else if (direction === 'down' && this.y !== 373) {
        this.y = this.y + 83;
    }
    //moves player left
    else if (direction === 'left' && this.x !== 0) {
        this.x = this.x -100;
    }
    //moves player right
    else if (direction === 'right' && this.x !== 400) {
        this.x = this.x + 100;
    }
};

//Creates player object
let player = new Player(200, 373);

//Start of lives object
let Lives = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/smallHeart.png';
};

//Draws hearts
Lives.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Moves heart off screen for loss of life
Lives.prototype.loss = function() {
    this.x = -100;
    this.y = -100;
};

//resets the lives counter and changes the position of the hearts
Lives.prototype.reset = function(x, y) {
    lives = 5;
    this.x = x;
    this.y = y;
};

//Creates five hearts for lives indicator
let heart1 = new Lives(5, 35);
let heart2 = new Lives(55, 35);
let heart3 = new Lives(105, 35);
let heart4 = new Lives(155, 35);
let heart5 = new Lives(205, 35);

//function to handle the loss of life
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

//Start score object
let Score = function(x, y) {
    this.x = x;
    this.y = y;
};

//draws score
Score.prototype.render = function() {
    ctx.font = '30px Coda';
    ctx.fillStyle = 'white';
    ctx.fillText(`Score: ${points}`, this.x, this.y);
};

//updates the score
Score.prototype.update = function() {
    ctx.font = '30px Coda';
    ctx.fillStyle = 'white';
    ctx.fillText(`Score: ${points}`, this.x, this.y);
};

//resets the score value
Score.prototype.reset = function() {
    points = 0;
};

//creates score object
let score = new Score(325, 86);

//Start orange gem object
let OrangeGem = function(x, y) {
    this.sprite = 'images/Gem-Orange.png';
    this.x = x;
    this.y = y;
};

//draw orange gem
OrangeGem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//changes orange gems position
OrangeGem.prototype.reset = function () {
    this.x = orangeSpawnX[Math.floor(Math.random() * 5)];
    this.y = orangeSpawnY;
};

//start green gem object
let GreenGem = function(x, y) {
    this.sprite = 'images/Gem-Green.png';
    this.x = x;
    this.y = y;
};

//draws green gem
GreenGem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//changes green gems position
GreenGem.prototype.reset = function () {
    this.x = greenSpawnX[Math.floor(Math.random() * 5)];
    this.y = greenSpawnY;
};

//start blue gem object
let BlueGem = function(x, y) {
    this.sprite = 'images/Gem-Blue.png';
    this.x = x;
    this.y = y;
};

//draw blue gem
BlueGem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y,);
};

//change blue gems location
BlueGem.prototype.reset = function() {
    this.x = blueSpawnX[Math.floor(Math.random() * 5)];
    this.y = blueSpawnY;
};

//Makes orange gem spawn in 1 of 5 columns
const orangeSpawnX = [0, 100, 200, 300, 400];
//makes orange gem spawn in top row
const orangeSpawnY = 41;
//Makes green gem spawn in 1 of 5 columns
const greenSpawnX = [0, 100, 200, 300, 400];
//makes green gem spawn in middle row
const greenSpawnY = 124;
//Makes blue gem spawn in 1 of 5 columns
const blueSpawnX = [0, 100, 200, 300, 400];
//makes blue gem spawn in bottom row
const blueSpawnY = 207;
//Creates orange gem with random column
let orangeGem = new OrangeGem(orangeSpawnX[Math.floor(Math.random() * 5)], orangeSpawnY);
//Creates green gem with random column
let greenGem = new GreenGem(greenSpawnX[Math.floor(Math.random() * 5)], greenSpawnY);
//Creates blue gem with random column
let blueGem = new BlueGem(blueSpawnX[Math.floor(Math.random() * 5)], blueSpawnY);

//function to handle the end of the game
function endGame() {
    //prevents keyboard and swipe input at end of game
    endStartOfGame = true;
    //resets lives count to 5
    lives = 5;
    //opens the ending modal
    endModal.style.display = "block";
    //create temporary document
    const temp = document.createDocumentFragment();
    //sets an element for temporary document
    const modalScore = document.createElement('p');
    //sets an element for temporary document
    const modalMsg = document.createElement('p');
    //sets the class of the created element
    modalScore.className = 'modalScore';
    //set the text of the created element
    modalScore.textContent = `You scored: ${points} points`;
    //set the text of the created element
    modalMsg.textContent = "Try and beat your score!";
    //adds element to the temporary document
    temp.appendChild(modalMsg);
    //adds element to the temporary document
    temp.appendChild(modalScore);
    //adds the temporary document to the modal
    endModalBody.appendChild(temp);
    //create event listener for the try again button
    tryAgainBtn.addEventListener('click', function() {
        //enables keyboard and swipe input for controls
        endStartOfGame = false;
        //hides the end of game modal
        endModal.style.display = "none";
        //changes the gems locations
        orangeGem.reset();
        greenGem.reset();
        blueGem.reset();
        //resets the hearts location
        heart1.reset(5, 35);
        heart2.reset(55, 35);
        heart3.reset(105, 35);
        heart4.reset(155, 35);
        heart5.reset(205, 35);
        score.reset();
        //removes the previous element that displays the score on the modal
        while (endModalBody.firstChild) {
            endModalBody.removeChild(endModalBody.firstChild);
        }
    });
}

//adds event listener for start button on the starting modal
startBtn.addEventListener('click', function() {
    //hides the starting modal
    startModal.style.display = "none";
    //enables keyboard and swipe input
    endStartOfGame = false;
    //starts the swipe event listener
    /* Disabled for potential plagiarism
    detectswipe(directionalControl); */

    //possibly add character selection
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

//disables keyboard and swipe input at start of game
let endStartOfGame = true;
document.addEventListener('keyup', function(e) {
    //if not at start or end of game, allows keyboard control
    if (!endStartOfGame) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };
    }
    //if at start or end of game, disables keyboard controll
    else {
        allowedKeys = {
            37: 'none',
            38: 'none',
            39: 'none',
            40: 'none'
        };
    }
    //passes input to player object
    player.handleInput(allowedKeys[e.keyCode]);
});

//Swipe detection provided by escapenetscape https://stackoverflow.com/users/2689455/escapenetscape
/* Functionality disabled to avoid potential plagiarism
function detectswipe(func) {
    //if not at start or end of game, allows swipe input
    if (!endStartOfGame) {
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
}

//passes the swipe input to the player object
function directionalControl(d) {
    player.handleInput(d);
} */