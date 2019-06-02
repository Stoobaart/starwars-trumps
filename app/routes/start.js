import Route from '@ember/routing/route';
import { set } from '@ember/object';
import $ from 'jquery';
import { later } from '@ember/runloop';

export default Route.extend({

  model() {
    return {
      gameStarted: false,
    };
  },

  actions: {

    didTransition() {
      this._super(...arguments);
      $("#march")[0].pause();
    },

    startGame() {
      set(this, 'currentModel.gameStarted', true);
      $("#theme")[0].play();

      later(() => {
        $('.start-subtitle').fadeIn(2000);
        $('.play-button').fadeIn(3000);
      }, 1000);

    },
  }
});
