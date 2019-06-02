import Service from '@ember/service';
import { get, set, setProperties } from '@ember/object';

export default Service.extend({

  battleAttribute: null,

  cards: [],

  hand1: [],

  hand2: [],

  score1: 0,

  score2: 0,

  showCard: false,

  resource: null,

  result: null,

  resultingPlayerCard: null,

  resultingOpponentCard: null,

  roundEnd: false,

  roundStarted: false,

  roundWinner: null,

  dealCards() {
    let { cards } = this;
    let hand1 = [];
    for(let i = 0; i < cards.length; i++) {
      const randomNumber = Math.floor(Math.random() * cards.length);
      const randomCard = cards[randomNumber];
      cards = cards.filter(cardInDeck => cardInDeck.name != randomCard.name);
      hand1.pushObject(randomCard);
      setProperties(this, {
        'cards': cards,
        'roundStarted': true,
      });
    }

    setProperties(this, {
      'hand1': hand1,
      'hand2': cards,
      'cards': [],
      'battleAttribute': null,
    });
  },

  playHand() {
    const { battleAttribute } = this;
    let hand1 = [...get(this, 'hand1')];
    let hand2 = [...get(this, 'hand2')];
    const playerCard = hand1[0];
    const opponentCard = hand2[0];

    if (+playerCard[battleAttribute] > +opponentCard[battleAttribute]) {
      hand1.removeObject(playerCard).addObject(opponentCard).addObject(playerCard);
      hand2.removeObject(opponentCard);
      set(this, 'score1', get(this, 'score1') +1);
      this.showResult('player', playerCard, opponentCard);
    } else {
      hand2.removeObject(opponentCard).addObject(playerCard).addObject(opponentCard);
      hand1.removeObject(playerCard);
      set(this, 'score2', get(this, 'score2') +1);
      this.showResult('opponent', playerCard, opponentCard);
    }

    setProperties(this, {
      'hand1': hand1,
      'hand2': hand2,
    });

    this.checkForWinner(hand1.length, hand2.length);
  },

  showResult(winner, playerCard, opponentCard) {
    setProperties(this, {
      'roundWinner': winner,
      'roundEnd': true,
      'showCard': true,
      'resultingPlayerCard': playerCard,
      'resultingOpponentCard': opponentCard,
    });
  },

  endRound() {
    setProperties(this, {
      'roundEnd': false,
      'showCard': false,
      'battleAttribute': null,
    });
  },

  checkForWinner(hand1Length, hand2Length) {
    if (hand1Length === 0) {
      return set(this, 'result', 'lose');
    } else if (hand2Length === 0) {
      return set(this, 'result', 'win');
    }
  },

});
