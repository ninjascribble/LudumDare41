import Gameplay from './Gameplay';
import Loading from './Loading';

export default {
  loading: function loading (game) {
    changeState(game, Loading);
  },

  gameplay: function gameplay (game) {
    changeState(game, Gameplay);
  }
};

function changeState (game, state) {
  if (game.checkState(state.name) != true) {
    game.add(state.name, new state());
  }
  game.start(state.name);
}
