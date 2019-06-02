import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { setProperties } from '@ember/object';

moduleForComponent('round-result', 'Integration | Component | round result', {
  integration: true
});

test('it renders', function(assert) {
  const roundWinner = 'player';
  const resultingPlayerCard = {
    name: 'stuballs',
  };
  const resultingOpponentCard = {
    name: 'darthballs',
  };
  const chosenAttribute = 'speed';

  setProperties(this, {
    roundWinner,
    resultingPlayerCard,
    resultingOpponentCard,
    chosenAttribute,
  });

  this.render(hbs`{{
    round-result roundWinner=roundWinner
      playerCard=resultingPlayerCard
      opponentCard=resultingOpponentCard
      chosenAttribute=battleAttribute
    }}`);

  assert.equal(this.$('.round-result').text().trim(), 'You\'ve won with stuballs versus your opponent\'s darthballs');
});
