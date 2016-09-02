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
