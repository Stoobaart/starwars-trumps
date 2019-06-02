import { test } from 'qunit';
import moduleForAcceptance from 'star-wars-trumps/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | start');

test('visiting /start', function(assert) {
  visit('/start');

  andThen(function() {
    assert.equal(currentURL(), '/start');
  });
});

test('clicking start displays the start logo', function(assert) {
  visit('/start');

  andThen(function() {
    assert.equal(currentURL(), '/start');
    click('.start-button');
    andThen(() => assert.dom('.start-image').exists());
  });
});

test('clicking play transitions to play route', function(assert) {
  visit('/start');

  andThen(function() {
    assert.equal(currentURL(), '/start');
    click('.start-button');
    andThen(() => {
      click('.play-button');
      andThen(() => {
        assert.equal(currentURL(), '/play');
      });
    });
  });
});
