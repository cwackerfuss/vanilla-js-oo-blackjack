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
