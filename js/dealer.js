// dealer logic
/////////////////

function Dealer(name, deck, player) {

  this.name =     name;
  this.hand =     new Hand();
  this.deck =     deck;
  this.player =   player;

}

Dealer.prototype.drawCard = function() {
  return this.deck.cards.pop();
}

Dealer.prototype.dealCard = function(receiver) {

  var dealtCard = this.drawCard();

  if (receiver == this && receiver.hand.cards.length == 1) {
    dealtCard.holeCard = true;
  };

  receiver.hand.cards.push(dealtCard);
  console.log(dealtCard.title + ' dealt to ' + receiver.name);
  showCard(receiver, dealtCard);
  return dealtCard;

}


Dealer.prototype.hasHoleCard = function(card) {
  return card.holeCard;
}

Dealer.prototype.playerHit = function(player) {
  this.dealCard(player);
  var handValue = player.hand.getValue();
  console.log("Value of Player's Hand = " + handValue);
  if (player.hand.getValue() > 21) {
    gameOver();
  }
}

Dealer.prototype.playerStand = function(player) {
  turnHoleCard();
  dealerTurn();
}

function dealerTurn() {

  if ( !over(16, dealer) ) {
    console.log(dealer.hand.getValue());
    console.log("Dealer under 17, dealing another card");
    dealer.dealCard(dealer);
    dealerTurn();
  } else {
    judgeGame();
  }

}

function judgeGame() {
  var dealerValue = dealer.hand.getValue();
  var playerValue = player.hand.getValue();
  console.log("Dealer Value: " + dealerValue);
  console.log("Player Value: " + playerValue);
  if (over(21, dealer)) {
    console.log("Player Wins! :)");
    return;
  }
  var results = dealerValue > playerValue ? "Player Loses! :(" : "Player Wins! :)";
  console.log(results);
}

function turnHoleCard() {
  var holeCard = dealer.hand.cards[1];
  var holeCardNode = document.getElementsByClassName("hole-card")[0];
  holeCardNode.className = "card " + holeCard.suit;
  holeCardNode.innerHTML = holeCard.name;
}

function over(num, user) {
  var isOver = user.hand.getValue() > num ? true : false;
  return isOver;
}

Dealer.prototype.startGame = (function() {

  var executed = false;

  return function () {
    if (!executed) {
      executed = true;
      this.deck.shuffle();

      this.dealCard(this.player);
      this.dealCard(this);
      this.dealCard(this.player);
      this.dealCard(this);
    }
  };

})();
