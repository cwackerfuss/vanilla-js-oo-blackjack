var gameboard = document.getElementById('blackjack'),
    dealerHand = document.getElementById('dealerHand'),
    playerHand = document.getElementById('playerHand'),
    startButton = document.getElementById('startGame'),
    playerName = document.getElementById('playerName'),
    actions = document.getElementById('playerActions'),
    hitButton = document.getElementById('hit'),
    standButton = document.getElementById('stand');

function showCard(receiver, card) {
  if (receiver instanceof Dealer) {
    if ( receiver.hasHoleCard(card) ) {
      dealerHand.innerHTML += "<div id='card' class='card hole-card'></div>";
    } else {
      dealerHand.innerHTML += "<div id='card' class='card " + card.suit + "'>" + card.name + "</div>";
    }
  } else if (receiver instanceof Player) {
    playerHand.innerHTML += "<div id='card' class='card " + card.suit + "'>" + card.name + "</div>";
  }
}

function showPlayerInfo(player) {
  playerName.innerHTML += player.name + "'s Hand";
}

startButton.onclick = function() {
  gameboard.setAttribute("class", "in-progress");
  showPlayerInfo(player);
  dealer.startGame();
  this.style.display = "none";
};

hitButton.onclick = function() {
  player.hit();
}

standButton.onclick = function() {
  player.stand();
}
