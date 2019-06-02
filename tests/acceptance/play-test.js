import { test } from 'qunit';
import moduleForAcceptance from 'star-wars-trumps/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | play');

test('visiting /play', function(assert) {
  visit('/play');

  andThen(function() {
    assert.equal(currentURL(), '/play');
  });
});

test('play route displays two catagories to choose from', function(assert) {
  visit('/play');

  andThen(function() {
    assert.equal(currentURL(), '/play');
    assert.dom('.catagories-container').exists();
    const children = find('.catagories-container').children.length;
    assert.equal(children, 2);
  });
});

test('clicking deal deals cards', function(assert) {
  visit('/play');

  andThen(function() {
    assert.equal(currentURL(), '/play');
    click('.catagories-button');
    click('.deal-button');
    andThen(() => {
      assert.dom('.score-container').exists();
      assert.dom('.battle-cards-container').exists();
      assert.dom('.player-cards').exists();
      assert.dom('.player-deck').includesText('5');
    });
  });
});

test('playing a card displays a result', function(assert) {
  visit('/play');

  andThen(function() {
    assert.equal(currentURL(), '/play');
    click('.catagories-button');
    click('.deal-button');
    andThen(() => {
      click('.battle-button');
      andThen(() => {
        click('.battle-button_attack');
        andThen(() => {
          assert.dom('.round-result-container').exists();
          assert.dom('.player-deck').doesNotIncludeText('5');
        });
      });
    });
  });
});

test('on game over, displays end game page', function(assert) {
  visit('/play');

  andThen(function() {
    assert.equal(currentURL(), '/play');
    click('.catagories-button');
    click('.deal-button');
    andThen(() => {
      click('.battle-button');
      andThen(() => {
        click('.battle-button_attack');
        andThen(() => {
          assert.dom('.round-result-container').exists();
          assert.dom('.player-deck').doesNotIncludeText('5');
        });
      });
    });
  });
});


