var deck = new Deck(2);

var player = new Player('Chase');

var dealer = new Dealer('the Dealer', deck, player);

function gameOver() {
  alert("Game Over!");
}
