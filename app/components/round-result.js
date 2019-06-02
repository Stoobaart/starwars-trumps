import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Component.extend({

  tagName: '',

  gamePlayer: service(),

  actions: {

    endRound() {
      get(this, 'gamePlayer').endRound();
    }
  }
});
