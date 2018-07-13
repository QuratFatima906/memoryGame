
let moves = 0;   //Handle Moves
let openCards =[];   //list to hold opened cards


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
starsPanel.innerHTML = starItem + starItem + starItem;
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
            card.classList.remove('open', 'show');
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
    return true;
  }
  else{
    return false;
  }
}

//Refresh Game
const restart = document.querySelector('.restart');
restart.addEventListener('click', function restart(){
  setGame();
  checkCards();
  clearMoves();
});

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

setGame();  
checkCards();//function call 

