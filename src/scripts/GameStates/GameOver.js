import DisplayObjects from '../DisplayObjects';
import GameStateFactory from './index';
import Sounds from '../Sounds';
import Enums from '../Enums';


export default class GameOver extends Phaser.State {
  create () {
    this.stage.backgroundColor = '#5FCDE4';
    DisplayObjects.gameover(game, game.width / 2, 96);
    Sounds.gameover(game);
  }

  update () {
    if (this.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
      GameStateFactory.gameplay(this.state);
    }
  }
}
