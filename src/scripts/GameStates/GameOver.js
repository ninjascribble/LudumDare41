import DisplayObjects from '../DisplayObjects';
import GameStateFactory from './index';
import Enums from '../Enums';


export default class GameOver extends Phaser.State {
  create () {
    this.stage.backgroundColor = '#5FCDE4';

    DisplayObjects.titleCard(game, game.width / 2, 45);


    game.add.existing(this.gameOverText());
    game.add.existing(this.restartText());

  }

  gameOverText () {
    let text = DisplayObjects.displayFont(game, game.width / 2, game.height / 2, 'center', Enums.GAMEOVER);
    return text;
  }
  
  restartText () {
    let text = DisplayObjects.bodyFont(game, game.width / 2, game.height * 3 / 4, 'center', Enums.RESTART);
    return text;
  }

  update () {
    if (this.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
      GameStateFactory.gameplay(this.state);
    }
  }
}
