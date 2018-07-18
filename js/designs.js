
let moves = 0;   //Handle Moves
let openCards =[];   //list to hold opened cards
let timePanel = document.querySelector(".timer");
timePanel.innerHTML = `00m:00s`; // default value of the timer
let timeCounter = 0; // Store the time counter in a variable
let timerId; // timer identifier to cancel the execution
let firstClick = true; // start timer after first  click
let matchCards =[]; //array for adding matched cards. To show Game win message
let popUp = document.querySelector(".popup"); 
const cards =['fa-diamond', 'fa-diamond',
'fa-paper-plane-o','fa-paper-plane-o',
'fa-anchor','fa-anchor',
'fa-bolt','fa-bolt',
'fa-cube','fa-cube',
'fa-leaf','fa-leaf',
'fa-bicycle','fa-bicycle',
'fa-bomb','fa-bomb'
];//array for all card icons

let starsPanel = document.querySelector('.stars');
let starItem = `<li><i class="fa fa-star"></i></li>`;
function generateStars(){
  starsPanel.innerHTML = starItem + starItem + starItem;
}
generateStars();
//Generate cards dynamically
function generateCard(card){
  return `<li class="card" data-card= "${card}"><i class="fa ${card}"></i></li>`;
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
//add shuffled cards into deck
function setGame(){
  const deck = document.querySelector('.deck');
  const cardHTML = shuffle(cards).map(function(card){
    return generateCard(card);
  });
  deck.innerHTML = cardHTML.join('');
}

function checkCards(){
  const allCards = document.querySelectorAll('.card');
  // Flip/show two cards for one second
  allCards.forEach(function(card){
    card.addEventListener('click' , function(e){
    if(firstClick){ //Start Timer
      beginTimer();
      firstClick = false;
    }
    //same card is not clicked twice
    if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
      openCards.push(card);
      card.classList.add('open','show');
      // select 2 cards 
      if(openCards.length == 2){
        //check if cards match
        if(matchingCard()){
          openCards=[];
        }
        else{
        //if no match, hide
        setTimeout( function(){
          openCards.forEach(function(card){
            card.classList.remove('open', 'show','notMatch');
          });
        //remove cards from selected queue
        openCards=[];
      }, 1000);
      }
      incrementMoves(); 
    }
  }
});
  });//End of card flipping and matching
}

function incrementMoves(){
  moves +=1;
  const span = document.querySelector('.moves');
  span.innerText = moves;
  showRating();
}

function clearMoves(){
  moves = 0;
  const span = document.querySelector('.moves');
  span.innerText = moves;
}

function matchingCard(){
  if(openCards[0].dataset.card == openCards[1].dataset.card){
    openCards[0].classList.add('match');
    openCards[0].classList.add('open');
    openCards[0].classList.add('show');
    openCards[1].classList.add('match');
    openCards[1].classList.add('open');
    openCards[1].classList.add('show');
    matchCards.push(openCards[0]);
    matchCards.push(openCards[1]);
    youWin();
    return true;
  }
  else{
   openCards[0].classList.add('notMatch');
   openCards[0].classList.add('open');
   openCards[0].classList.add('show');
   openCards[1].classList.add('notMatch');
   openCards[1].classList.add('open');
   openCards[1].classList.add('show');

   return false;
 }
}

// Start the timer
function beginTimer() {
    timerId = setInterval(countTime, 1000);
}

// Increment the time counter
function countTime() {
    // Increase the time counter by 1
    timeCounter += 1;
    // Divide the timer into mm:ss format
    let min = Math.trunc(timeCounter/60);
    let sec = (timeCounter-(min*60));
    // If the minutes and seconds have 1 digit, add a 0 in front of it
    min < 10 ? min = `0${min}m` : min = `${min}m`;
    sec < 10 ? sec = `0${sec}s` : sec = `${sec}s`;
    // Update the timer HTML on the page
    timePanel.innerHTML = `${min}:${sec}`;
}

// Stop the timer when the game is over or the player resets the game
function endTimer() {
    clearTimeout(timerId);
    timeCounter=0;
    firstClick=true;
    // timePanel.innerHTML = `00m:00s`;

}
//Completely reset the game
function restart(){
  endTimer();
  setGame();
  checkCards();
  clearMoves();
  generateStars();
}
//Refresh Game
const refresh = document.querySelector('.restart');
refresh.addEventListener('click', restart );

//Dispaly star rating
function showRating() {
  switch(moves) {
        // If number of moves >= 10, it changes to a 2 star rating
        case 10:
        starsPanel.innerHTML = starItem + starItem ;
        break;
        // If number of moves >= 20, it changes to a 1 star rating
        case 20:
        starsPanel.innerHTML = starItem;
      }
    }

//Check if user wins
function youWin(){
  if(matchCards.length === 16){
    endTimer();
    setTimeout(function(){
      showPopup();
    }, 100);
  }

}

//Congratulation popup
function showPopup() {
    popUp.classList.add("visible");
    popUp.innerHTML = `<div class="modal"><h3>Congratulations! You won!</h3>
    <p>With ${moves} Moves in ${timePanel.innerHTML} and ${starsPanel.innerHTML} Stars.<br></p>
    <button class="button" onclick='playAgain();'>Play again!</button></div>`;
}
//Called at "play again" button
function playAgain() {
    popUp.classList.remove("visible");
   restart();
}
   
    setGame();  
checkCards();//function call 

