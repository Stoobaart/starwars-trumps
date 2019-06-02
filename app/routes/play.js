import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get, set, setProperties } from '@ember/object';
import $ from 'jquery';

export default Route.extend({

  gamePlayer: service(),

  async model() {
    const starships = await $.getJSON('https://swapi.co/api/starships/');
    const people = await $.getJSON('https://swapi.co/api/people/');

    // const starships = {results: [{ name: 'ting' },{ name: 'ming' }]};
    // const people = {results: [{ name: 'ting' },{ name: 'ming' }]};

    return {
      starships: starships.results,
      people: people.results,
      gamePlayer: get(this, 'gamePlayer'),
      roundStarted: false,
    };
  },

  afterModel(model) {
    setProperties(get(this, 'gamePlayer'), {
      'cards': model.people,
      'roundWinner': null,
      'roundEnd': false,
      'result': null,
      'resource': null,
      'resultingPlayerCard': null,
      'resultingOpponentCard': null,
      'score1': 0,
      'score2': 0,
      'showCard': false,
    });
  },

  actions: {

    didTransition() {
      this._super(...arguments);
      $("#theme")[0].pause();
      $("#march")[0].play();
    },

    dealCards() {
      $("#flyby")[0].play();
      get(this, 'gamePlayer').dealCards();
      set(this, 'currentModel.roundStarted', true);
    },

    playHand() {
      $("#fire")[0].play();
      get(this, 'gamePlayer').playHand();
    },

    resetGame() {
      set(this, 'currentModel.roundStarted', false);
      this.refresh();
    },

  }



});
