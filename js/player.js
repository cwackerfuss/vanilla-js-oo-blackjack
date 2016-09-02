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
