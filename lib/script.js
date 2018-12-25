// Add your code here

let suits = ['Copas', 'Paus', 'Espadas', 'Ouros'];

let values = ['Ás', 'Dois', 'Três', 'Quatro', 'Cinco', 'Seis', 'Sete', 'Oito', 'Nove', 'Dez'];

let textArea = document.getElementById('text-area');
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');


let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards=[],
    playerCards=[],
    dealerScore=0,
    playerScore=0,
    deck=[];



hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

newGameButton.addEventListener('click', function(){

gameStarted=true;
gameOver=false;
playerWon=false;

deck=createDeck();
shuffleDeck(deck);
dealerCards=[getNextCard(), getNextCard()];
playerCards=[getNextCard(), getNextCard()];




newGameButton.style.display = 'none';
hitButton.style.display = 'inline';
stayButton.style.display = 'inline';
showStatus();

});

hitButton.addEventListener('click', function(){
playerCards.push(getNextCard());
checkForEndOfGame();
showStatus();

});


stayButton.addEventListener('click', function(){
gameOver=true;
checkForEndOfGame();
showStatus();

});


function createDeck(){
let deck=[];
for(let i =0; i<suits.length;i++){
 for(let j =0; j<values.length;j++){
  let card={
    suit: suits[i],
    value: values[j]
    
  };
  deck.push(card);
} 
}
return deck;
}

function getCardString(card){
  return card.value+ ' de ' +card.suit;
}


function showStatus() {
  if (!gameStarted) {
    textArea.innerText = 'Bem vindo ao Blackjack!';
    return;
  }
  
  let dealerCardString = '';
  for (let i=0; i < dealerCards.length; i++) {
    dealerCardString += getCardString(dealerCards[i]) + '\n';
  }
  
  let playerCardString = '';
  for (let i=0; i < playerCards.length; i++) {
    playerCardString += getCardString(playerCards[i]) + '\n';
  }
  
  updateScores();
   
  textArea.innerText = 
    'Dealer tem:\n' +
    dealerCardString + 
    '(pontuação: '+ dealerScore  + ')\n\n' +
    
    'Jogador tem:\n' +
    playerCardString +
    '(pontuação: '+ playerScore  + ')\n\n';
  
  if (gameOver) {
    if (playerWon) {
      textArea.innerText += "VOCÊ GANHOU!";
    }
    else {
      textArea.innerText += "DEALER GANHOU";
    }
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
  }

}





function shuffleDeck(deck){
  for(let i=0;i<deck.length;i++){
    let swapIdx = Math.trunc(Math.random()*deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i]=tmp;
  }
}

function getNextCard(){
  return deck.shift();
}

function updateScores(){
  dealerScore= getScore(dealerCards);
  playerScore=getScore(playerCards);
}

function getScore(cardArray){
let score = 0;
let hasAce=false;

for(let i =0; i<cardArray.length ; i++){
let card = cardArray[i];
score += getCardNumericValue(card);
if(card.value == 'Ás'){
hasAce=true;
}
}

if(hasAce && score+10<=21){
return score+10;
}
return score;
}

function getCardNumericValue(card){
  switch(card.value){
    case'Ás':
    return 1;

    case'Dois':
    return 2;

    case'Três':
    return 3;

    case'Quatro':
    return 4;

    case'Cinco':
    return 5;

    case'Seis':
    return 6;

    case'Sete':
    return 7;
    
    case'Oito':
    return 8;

    case'Nove':
    return 9;

    default:
    return 10;

  }


}


function checkForEndOfGame(){
updateScores();

if(gameOver){
while(dealerScore<playerScore && playerScore<=21 && dealerScore<=21){
  dealerCards.push(getNextCard());
  updateScores();
}
}

if(playerScore>21){
  playerWon=false;
  gameOver=true;
}
else if(dealerScore>21){
playerWon = true;
gameOver=true;

}else if(gameOver){
if(playerScore>dealerScore){
  playerWon=true;
}else{
  playerWon=false;
}




}



}

function getScore(cardArray) {
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if (card.value === 'Ás') {
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}