var deck = new Deck(2);

var player = new Player('Chase');

var dealer = new Dealer('the Dealer', deck, player);

function gameOver() {
  alert("Game Over!");
}

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

// card logic
/////////////////

function Card(value, name, suit, title) {
  this.value = value;
  this.name = name;
  this.suit = suit;
  this.title = title;
};

function Deck(num) {
  this.names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  this.titles = ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace'];
  this.values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
  this.suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
  this.cards = [];

  for (var i = 0; i < num; i++) {
    for (var s = 0; s < this.suits.length; s++) {
      for (var n = 0; n < this.names.length; n++) {

        var cardTitle = this.titles[n] + " of " + this.suits[s];

        this.cards.push( new Card( this.values[n], this.names[n], this.suits[s], cardTitle ) );

      }
    }
  }

  console.log(num + " decks are in play.");

};

Deck.prototype.shuffle = function() {

  var cards = this.cards;

  for(var j, x, i = cards.length; i; j = Math.floor(Math.random() * i), x = cards[--i], cards[i] = cards[j], cards[j] = x);
  return cards;

};

Deck.prototype.getCount = function() {

  cardCount = this.cards.length;

  console.log(cardCount + " cards left in the deck.")
  return cardCount;

};

// credits logic
/////////////////
var credits = document.getElementById('credits-total'),
    creditsDefault = document.getElementById('credits-default'),
    bet = document.getElementById('current-bet');

function Credits(credits, defaultBet) {
  this.credits = credits;
  this.defaultBet = defaultBet;
  this.bet = 0;
}

// Default Bet
Credits.prototype.increaseDefaultBet = function(val) {
  this.defaultBet += val;
  return this.defaultBet;
}

Credits.prototype.decreaseDefaultBet = function(val) {
  this.defaultBet -= val;
  return this.defaultBet;
}

// Credit Functions for Placing Bets / Winning
Credits.prototype.addCredits = function(val) {
  this.credits += val;
  return this.credits;
}

Credits.prototype.subtractCredits = function(val) {
  this.credits -= val;
  return this.credits;
}

Credits.prototype.placeBet = function(val) {
  this.credits -= val;
  this.updateCreditsNode();
  return this.val;
}


// UI

function updateCredits(player) {
  creditsTotal.innerHTML = player.credits.updateCreditsNode();
  creditsDefault.innerHTML = player.credits.updateDefaultBetNode();
}

function updateBet() {
  currentBet.innerHTML = "$" + player.credits.defaultBet;
}

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

function Hand() {
  this.cards = [];
}

Hand.prototype.getValue = function() {

  value = 0;

  for (card in this.cards) {
    value += this.cards[card].value;
  }
  return value;

}

// Player logic
/////////////////

var lastId = 0;

function Player(name) {
  this.id = lastId++;
  this.name = name;
  this.credits = new Credits(1000, 10);
  this.hand = new Hand();
}

Player.prototype.hit = function() {
  dealer.playerHit(this);
}

Player.prototype.stand = function() {
  dealer.playerStand(this);
}
