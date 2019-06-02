import { moduleFor, test } from 'ember-qunit';

moduleFor('route:play', 'Unit | Route | play', {
  needs: ['service:gamePlayer']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
