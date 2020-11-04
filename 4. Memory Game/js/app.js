const icons = ['diamond', 'paper-plane-o', 'anchor', 'star', 'cube', 'leaf', 'bicycle', 'bomb']
    , elemDeck = document.getElementById('deckId')
    , elemMoves = document.getElementById('movesId')
    , elemRestart = document.getElementById('restartId')
    , elemTimer = document.getElementById('timerId')
    , elemTotalMoves = document.getElementById('totalMovesId')
    , elemTotalStars = document.getElementById('totalStarsId')
    , elemTotalTime = document.getElementById('totalTimeId')
    , elemModal = document.getElementById('modalId')
    , elemPlayAgain = document.getElementById('btnPlayAgain')
    , elemClose = document.getElementsByClassName('close')[0]
    , star3 = icons.length * 4
    , star2 = icons.length * 5
    , star1 = icons.length * 6
    , cardUndefined = { element: '', icon: '' }
;

let cards = arrayX2(icons)
    , openCards = []
    , prevCard = cardUndefined
    , cntFrames = 0
    , cntMoves = 0
    , timer = 0
    , minutes = 0
    , seconds = 0
;

elemRestart.addEventListener('click', restart, true); 
elemClose.addEventListener('click', closeModalWindow);
elemPlayAgain.addEventListener('click', playAgain);


function closeModalWindow() {
    elemModal.style.display = 'none';
}


function playAgain() {
    closeModalWindow();
    restart();
}


function arrayX2(array) {
    return newArray = array.concat(array);
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function getTime() {
    return minutes + 'm ' + seconds + 's ';
}


function startTimer() {
    timer = setInterval(function () {
        elemTimer.textContent = getTime();
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
    }, 1000);
}


function setRating(i, add) {

    let elem = document.getElementById('starId' + i);
    elem.className = 'fa fa-star' + add;
}


function isMatch(p1, p2) {
    let match;

    if (openCards.length % 2 === 1) { //second card
        match = p1 === p2 ? true : false;
    }

    return match;
}

//stop game and show congratulates/modal window
function onWin() {

    clearInterval(timer);

    let totalTime = getTime();

    elemTimer.textContent = totalTime; //timer must be = totalTime
    elemTotalMoves.textContent = cntMoves;
    elemTotalTime.textContent = totalTime;
    elemTotalStars.textContent = cntMoves < star3 ? 3 :
            cntMoves < star2 ? 2 :
            cntMoves < star1 ? 1 : 0
    ;
    elemModal.style.display = 'block';
}

//if match - change color last 2 cards
function onMatch(length) {

    for (let i = length - 1; i >= (length - 2) ; i--) {
        let elem = openCards[i].element;
        elem.className = 'card match';
    }

    if (openCards.length === cards.length) {
        onWin();
    }
}

//if unmatch - close last 2 cards
function onFail(length) {

    for (let i = length - 1; i >= (length - 2) ; i--) {
        let elem = openCards[i].element;
        elem.className = 'card';
    }

    openCards.splice(length - 2, 2);
}

//compare 2 last cards and start animation
function openCard(elem) {

    let icon = elem.firstChild.className;
    let match = isMatch(icon, prevCard.icon);
    let card = { element: elem, icon: icon };

    openCards.push(card);

    let deg = 0;
    let length = openCards.length;
    let id = setInterval(frame, 0);

    if (match === false) {
        prevCard.element.className = 'card open show fail';
        elem.className = 'card open show fail';
    } else {
        elem.className = 'card open show';
    }
    
    prevCard = length % 2 === 1 ? card : cardUndefined;
    cntFrames++;

    function frame() { //animation

        if (deg === 360) {

            if (match === true) {
                onMatch(length);
            }
            else if (match === false) {
                onFail(length);
            }

            clearInterval(id);
            cntFrames--;

        } else {
            deg = deg + 2; //high scope:deg + 2; low scope: deg++
            elem.style.transform = 'rotateY(' + deg + 'deg)';
        }
    }
}


//on click on cards
function onClick() {
    
    if (cntFrames === 2) { //overflow, waiting for the animation to end in 2 cards
        event.preventDefault();
    }
    else {
        cntMoves++;
        elemMoves.textContent = cntMoves;

        if (cntMoves === star3) {
            setRating(3, '-o');
        } else if (cntMoves === star2) {
            setRating(2, '-o');
        } else if (cntMoves === star1) {
            setRating(1, '-o');
        }

        openCard(this);
    }
}

//append card-elements
function generateCards(array) {

    let fragment = document.createDocumentFragment();
    let length = cards.length;

    while (elemDeck.firstChild) {
        elemDeck.removeChild(elemDeck.firstChild);
    }

    for (let i = 0; i < length; i++) {

        let newElement = document.createElement('li');
        newElement.className = 'card';
        newElement.id = i;
        newElement.addEventListener('click', onClick);

        let newIcon = document.createElement('i');
        newIcon.className = 'fa fa-' + array[i] + ' fa-2x';
        newElement.appendChild(newIcon);

        fragment.appendChild(newElement);

    }

    elemDeck.appendChild(fragment);
    startTimer();
}


function restart() {

    openCards = [];
    prevCard = cardUndefined;
    cntFrames = 0;
    cntMoves = 0;
    minutes = 0;
    seconds = 0;

    for (let i = 1; i <= 3; i++) {
        setRating(i, '');
    }
    
    elemMoves.textContent = cntMoves;
    cards = shuffle(cards);
    generateCards(cards);
}


restart(); //215, 256