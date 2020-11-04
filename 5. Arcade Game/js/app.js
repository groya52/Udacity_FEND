const modal = document.querySelector('.modal')
    , modalOverlay = document.querySelector('.modal-overlay')
    , arena = {
        minX: -16
        , maxX: 419
        , minY: -10.5
        , maxY: 404.5
        , stepX: 36.25
        , stepY: 20.75
    }
;

//-----------------classes-----------------------------------
//Properties: x, y, speed, order (enemy serial number), sprite (path to image)
class Enemy {
    constructor(order) {
        this.sprite = 'images/enemy-bug.png';
        this.order = order;
        this.reset();
    }

    //Update the enemy's position, required method for game Parameter: dt, a time delta between ticks
    update(dt) {
        this.x += this.speed * dt;

        if (this.x >= ctx.canvas.width) { //The enemy has gone from the screen
            this.reset();
            return;
        }

        if (getDistance(this.x, this.y, player.x, player.y) <= 83) {
            player.collision();
        }
    }

    //Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //Set new properties
    reset() {
        let multiplier = player.level * 0.3;
        let speed = 20 + getRandomInt(multiplier * 10, multiplier * 60);

        this.x = -32 - getRandomInt(multiplier * 10, multiplier * 60);
        this.y = 72.5 + this.order * 83;
        this.speed = speed > 200 ? 200 : speed;
    }
}

//Properties: x, y, lives, level, sprite (path to image)
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.level = 1;
        this.lives = 3;
        this.reset();
    }

    //Update the player's position
    update() {
        this.x = this.x < arena.minX ? arena.minX : (this.x > arena.maxX ? arena.maxX : this.x);
        this.y = this.y < arena.minY ? arena.minY : (this.y > arena.maxY ? arena.maxY : this.y);

        if (this.y === arena.minY) {
            this.level++;
            this.reset();
        }
    }

    //Draw the player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        ctx.fillText('Control keys: ? left, ? right, ? down, ? up', 70, 75);
        ctx.fillText('Level: ' + this.level + ', lives: ' + this.lives, 180, 575);
    }

    //Key handler, Parameter: direction - name of key
    handleInput(direction) {
        if (player.lives === 0)
            return;

        switch (direction) {
            case 'left': {
                this.x -= arena.stepX;
                break;
            }
            case 'right': {
                this.x += arena.stepX;
                break;
            }
            case 'up': {
                this.y -= arena.stepY;
                break;
            }
            case 'down': {
                this.y += arena.stepY;
                break;
            }
        }
    }

    //Set new properties, parameters: lives - count lives
    reset() {
        this.x = arena.maxX / 2 - 8;
        this.y = arena.maxY;
    }

    collision() {
        pause();
        this.lives = this.lives - 1;
        
        if (this.lives === 0) {
            gameOver();
        } else {
            this.reset();
        }
    }
}

//-----------------modal windows-----------------------------
function openModal() {
    modalOverlay.addEventListener('click', closeModal);

    let btnOk = modal.querySelector('#ok');
    btnOk.addEventListener('click', closeModal);

    modal.style.display = 'block';
    modalOverlay.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none'; // Hide the modal and overlay
    modalOverlay.style.display = 'none';

    start();
}

//-----------------other-------------------------------------
//Get random integer in the range (min, max)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Get distance between 2 points: (x1, y1) and (x2, y2)
function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

function pause() {
    let dt = new Date();
    let milliseconds = 300;
    while ((new Date()) - dt <= milliseconds) {}
}

function start() {
    for (let i = 0; i < 4; i++) {
        allEnemies.push(new Enemy(i));
    }
    player.lives = 3;
    player.level = 1;
    player.reset();
}

function gameOver() {
    pause();
    allEnemies.length = 0;
    openModal();
}

//-----------------instantiate-------------------------------
const allEnemies = [];
const player = new Player();

//-----------------listeners---------------------------------
//Listens for key presses and sends the keys to your Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

start();
//119, 190