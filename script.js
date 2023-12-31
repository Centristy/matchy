const gameContainer = document.getElementById("game");

let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

document.querySelector(".score").textContent = score;


 fetch("./cards.json")
  .then((res) => res.json())
  .then((data)=> {
    cards = [...data,...data];
    shuffle();
    generateCards();

  });
  



function shuffle() {
  let counter = cards.length;

  while (counter > 0) {
   
    let index = Math.floor(Math.random() * counter);

 
    counter--;

   
    let temp = cards[counter];
    cards[counter] = cards[index];
    cards[index] = temp;
  }

  return cards;
}

let shuffledCards = shuffle(cards);


function generateCards(){
  for(let card of cards){

    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `<div class="front"> <img class="front-image" src=${card.image}/></div>
    <div class = "back"></div>`;

    gameContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);

  }


}

function flipCard(){

  if (lockBoard) return;
  if (this === firstCard) return;
  
  this.classList.add("flipped");

  if(!firstCard){
    firstCard = this;
    return;

  }
  secondCard = this;
  
  lockBoard = true;
  checkForMatch();
}

function checkForMatch(){

  let ismatch = firstCard.dataset.name === secondCard.dataset.name;

  ismatch ? disableCard() : unflipCards();
}



function disableCard() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  score++;
  document.querySelector(".score").textContent = score;
  resetBoard();

}



function unflipCards(){

  setTimeout(() => {

    firstCard.classList.remove("flipped")
    secondCard.classList.remove("flipped")
    resetBoard();
  },1200);
}

function resetBoard(){
  firstCard = null;
  secondCard = null;
  lockBoard = false;

}

function restart(){
  resetBoard();
  shuffle();
  score = 0;
  document.querySelector(".score").textContent = score;
  gameContainer.innerHTML = "";
  generateCards();
}




// // this function loops over the array of colors
// // it creates a new div and gives it a class with the value of the color
// // it also adds an event listener for a click for each card
// function createDivsForColors(colorArray) {
//   for (let color of colorArray) {
//     // create a new div
//     const newDiv = document.createElement("div");

//     // give it a class attribute for the value we are looping over
//     newDiv.classList.add(color);

//     // call a function handleCardClick when a div is clicked on
//     newDiv.addEventListener("click", handleCardClick);

//     // append the div to the element with an id of game
//     gameContainer.append(newDiv);
//   }
// }

// // TODO: Implement this function!
// function handleCardClick(event) {
//   // you can use event.target to see which element was clicked
//   console.log("you just clicked", event.target);
// }

// // when the DOM loads
// createDivsForColors(shuffledColors);
