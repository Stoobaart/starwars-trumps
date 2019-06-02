import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { setProperties } from '@ember/object';

moduleForComponent('display-card', 'Integration | Component | display card', {
  integration: true
});

test('it renders', function(assert) {
  const card = {
    name: 'stuballs',
  };
  const resource = 'people';

  setProperties(this, {
    card,
    resource,
  });

  this.render(hbs`{{display-card card=card resource=resource}}`);

  assert.equal(this.$('.card-name').text().trim(), 'stuballs');
});
