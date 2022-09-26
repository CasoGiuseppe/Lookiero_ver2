export const GET_HEROES_LIST = 'getHeroesList';
export const GET_HEROES_LINKS = 'getHeroesLinks';
export const GET_HEROE_CONTENT = 'getHeroeContent';
export default {
  [GET_HEROES_LIST]: (state) => state.heroes,
  [GET_HEROES_LINKS]: (state) => {
    return ({ type }) => {
      return encodeURI(state.links[type]) || undefined;
    };
  },
  [GET_HEROE_CONTENT]() {
    return ({ code }) => {
      const heroe = this[GET_HEROES_LIST].find((node) => node.name === code);
      return heroe.content || undefined;
    };
  },
};
