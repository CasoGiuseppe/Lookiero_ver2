import { defineStore } from 'pinia';
import { BASE_HEROES_STORE } from '../partials/constants';

// actions
import {
  CHANGE_HEROES_LIST,
  CHANGE_HEROES_LINKS,
  CHANGE_HEROE_DETAIL,
} from './actions';

// getters
import getters from './getters';

export const useHeroesStore = defineStore({
  id: 'heroes',
  state: () => BASE_HEROES_STORE,

  actions: {
    [CHANGE_HEROES_LIST](list) {
      this.heroes = list;
    },
    [CHANGE_HEROES_LINKS](links) {
      this.links = links;
    },
    [CHANGE_HEROE_DETAIL]({ code, attach }) {
      let heroe = this.heroes.find((node) => node.name === code);
      heroe.content = attach;
    },
  },

  getters,
});
