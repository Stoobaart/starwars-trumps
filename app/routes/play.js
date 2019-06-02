import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get, set, setProperties } from '@ember/object';
import $ from 'jquery';
import Ember from 'ember';

const { testing } = Ember;

export default Route.extend({

  gamePlayer: service(),

  async model() {
    const starships = await $.getJSON('https://swapi.co/api/starships/');
    const people = await $.getJSON('https://swapi.co/api/people/');

    return {
      starships: starships.results,
      people: people.results,
      gamePlayer: get(this, 'gamePlayer'),
      roundStarted: false,
    };
  },

  afterModel(model) {
    setProperties(get(this, 'gamePlayer'), {
      'resource': null,
      'cards': model.people,
      'roundWinner': null,
      'roundEnd': false,
      'result': null,
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
      if (!testing) {
        $("#theme")[0].pause();
        $("#march")[0].play();
      }
    },

    dealCards() {
      if (!testing) {
        $("#flyby")[0].play();
      }
      get(this, 'gamePlayer').dealCards();
      set(this, 'currentModel.roundStarted', true);
    },

    playHand() {
      if (!testing) {
        $("#fire")[0].play();
      }
      get(this, 'gamePlayer').playHand();
    },

    resetGame() {
      set(this, 'currentModel.roundStarted', false);
      this.refresh();
    },

  }



});
