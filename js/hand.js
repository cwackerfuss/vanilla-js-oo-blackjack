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
