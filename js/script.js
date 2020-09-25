const cards = document.querySelectorAll('.memory-card');

let hasFlipped = false;
let lockBoard = false;
let firstCard, secondCard;
let cardsMatched = 0;
let [startClock, movesCounter] = [true, 1];

// @description game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
function startTimer(){
    setInterval(function(){
        timer.innerHTML = ` ${minute} mins ${second} secs`;
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

// @description flip cards on click
function flipCard() {
    
    if(startClock){ startTimer(); startClock = false;}
    document.querySelector('.step-counter').innerHTML = `${movesCounter} steps`;
    if (lockBoard || (this === firstCard)) return;
    this.classList.add('flip');
    if (!hasFlipped) {
        // first click
        hasFlipped = true;
        firstCard = this;
        movesCounter++;
        return;
    }
    // second click
    secondCard = this;
    //do cards match?
    checkForMatch();
    if (cardsMatched == 6) {
        winGame();
    }
    movesCounter++;
}

// @description Check whether both the cards matched or not
function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

// @description if the cards matched, remove click event from them
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    cardsMatched ++;
    resetBoard();
}

// @description if the cards do not match Unflip cards
function unflipCards() {
    lockBoard = true;
    setTimeout( ()=> {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

// @description Reset board(Variables on match or unmatch)
function resetBoard() {
    [hasFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// @description shuffle all the cards before starting the game
(function shuffle() {
    cards.forEach( card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

// @description won the Game
function winGame() {
    finalTime = timer.innerHTML;
    console.log(`WIN !! STEPS: ${movesCounter} TIME : ${finalTime} `);
}

// @description add event listener to each cards
cards.forEach(card => card.addEventListener('click', flipCard));