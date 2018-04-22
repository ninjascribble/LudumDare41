import Gameplay from './Gameplay';
import Loading from './Loading';
import Menu from './Menu';
import Story from './Story';
import GameOver from './GameOver';

export default {
  loading: function loading (game) {
    changeState(game, Loading);
  },

  gameplay: function gameplay (game) {
    changeState(game, Gameplay);
  },

  menu: function menu (game) {
    changeState(game, Menu);
  },

  story: function story (game) {
    changeState(game, Story);
  },

  gameOver: function gameOver (game) {
    changeState(game, GameOver);
  }
};

function changeState (game, state) {
  if (game.checkState(state.name) != true) {
    game.add(state.name, new state());
  }
  game.start(state.name);
}
